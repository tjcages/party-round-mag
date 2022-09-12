import Image from "next/image";
import styles from "../../styles/buy.module.scss";
import useStore from "../../store";

import Button from "../Button";

const Buy = (props) => {
  const openWindow = useStore((state) => state.openWindow);

  function handleBuyClicked(e) {
    e.stopPropagation();
    openWindow(5) // Terminal
  }

  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <h1><span className={styles.highlight}>Limited Edition Magazine</span> filled with alpha, editorial, and exclusive mini-drops</h1>
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
            <div className={styles.exclusive}>
              <Image
                src={"/img/exclusive.png"}
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
                  src={"/img/sticker.png"}
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
            <Button text="BUY NOW" large onClick={(e) => handleBuyClicked(e)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
