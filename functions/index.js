const functions = require("firebase-functions");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const cors = require("cors")({ origin: true });

var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "",
});
var base = new Airtable.base(""); // removed for security

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createStripeCustomer = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { email, name } = req.query;

    const number = req.query.card;
    const exp_month = req.query.month;
    const exp_year = req.query.year;
    const cvc = req.query.csv;

    // create the stripe customer object
    return stripe.customers
      .create({
        email: email,
        name: name,
      })
      .then((customer) => {
        const id = customer.id;

        // create a stripe token for the card
        return stripe.tokens
          .create({
            card: {
              name,
              number,
              exp_month,
              exp_year,
              cvc,
            },
          })
          .then((token) => {
            // add token card to source
            return stripe.customers
              .createSource(id, {
                source: token.id,
              })
              .then((source) => {
                // charge customer's default source
                return stripe.charges
                  .create({
                    amount: 99,
                    currency: "usd",
                    customer: id,
                    source: source.id,
                    statement_descriptor_suffix: "Party Round Mag",
                    description: "Just pay shipping for Party Round Mag",
                  })
                  .then((charge) => {
                    // successful charge
                    return res
                      .status(200)
                      .json({ customer: id, status: "success" });
                  });
              })
              .catch((err) => {
                console.error(err);
                return res
                  .status(500)
                  .json({ status: "error", error: err.toString() });
              });
          })
          .catch((err) => {
            console.error(err);
            return res
              .status(500)
              .json({ status: "error", error: err.toString() });
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ status: "error", error: err.toString() });
      });
  });
});

// Listens for new orders added to /orders/:documentId and
// creates a corresponding order in Airtable
exports.monitorOrders = functions.firestore
  .document("/orders/{documentId}")
  .onCreate(async (snap, context) => {
    // Grab the current value of what was written to Firestore.
    const data = snap.data();
    const fields = {
      fields: {
        Name: data.name,
        Address: data.address,
        Email: data.email,
        ID: snap.id,
      },
    };

    base("Orders").create([fields], function (err, records) {
      if (err) {
        functions.logger.log("Error creating new user", err);
        return;
      }
      records.forEach(function (record) {
        return record;
      });
    });
  });
