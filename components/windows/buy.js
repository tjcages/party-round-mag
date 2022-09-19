import Image from "next/image";
import styles from "../../styles/buy.module.scss";
import useStore from "../../store";

import Button from "../Button";

const Buy = (props) => {
  const openWindow = useStore((state) => state.openWindow);
  const available = useStore((state) => state.available);
  const soldout = useStore((state) => state.soldout);

  function handleBuyClicked(e) {
    e.stopPropagation();
    openWindow(5); // Terminal
  }

  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <h1>
          <span className={styles.highlight}>Limited Edition Magazine</span>{" "}
          filled with alpha, editorial, and exclusive mini-drops
        </h1>
        <div className={styles.buyContainer}>
          <div className={styles.graphic}>
            <div className={styles.sensitive}>
              <Image
                id="f1"
                src={"/img/pages/money.jpg"}
                alt="default icon"
                layout="fill"
                priority={true}
              />
              <Image
                id="f2"
                src={"/img/pages/bg.jpg"}
                alt="default icon"
                layout="fill"
              />
              <Image
                id="f3"
                src={"/img/pages/ads.jpg"}
                alt="default icon"
                layout="fill"
              />
              <Image
                id="f4"
                src={"/img/pages/drops.jpg"}
                alt="default icon"
                layout="fill"
              />
            </div>
            <div
              className={`${styles.exclusive} ${soldout && styles.soldout} ${
                !available && styles.available
              }`}
            >
              <Image
                src={!available ? "/img/soon.png" : "/img/soldout.png"}
                alt="exclusive icon"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.header}>
              <h3>VOL.001</h3>
              <h3>NEW!</h3>
              <div className={styles.sticker}>
                <Image
                  src={
                    available
                      ? soldout
                        ? "/img/sticker2.png"
                        : "/img/sticker.png"
                      : "/img/sticker3.png"
                  }
                  alt="new !! icon"
                  layout="fill"
                />
              </div>
            </div>
            <h3>GET YOUR</h3>
            <h3>
              <span className={styles.highlight}>PARTY ROUND MAG</span>
            </h3>
            <br />
            <h3>JUST PAY SHIPPING</h3>
            <h2>$0.99</h2>
            <br />
          </div>
          <Button
            text={
              available
                ? soldout
                  ? "SOLD OUT"
                  : "BUY NOW"
                : "AVAILABLE" + "\n" + "9/20 at 9:30a PT"
            }
            large
            onClick={(e) => handleBuyClicked(e)}
            disabled={soldout || !available}
          />
        </div>
      </div>
    </div>
  );
};

export default Buy;
