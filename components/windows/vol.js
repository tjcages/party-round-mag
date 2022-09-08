import styles from "../../styles/vol.module.scss";

import Button from "../Button";

const Vol = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <div className={styles.headerImage} />

        <div className={styles.quad}>
          <div className={styles.item}>Infinite Ads</div>
          <div />
          <div className={styles.item}>Gold Bar NFT</div>
          <div />
          <div />
          <div />
          <div className={styles.item}>Touch Grass Kits</div>
          <div />
          <div className={styles.item}>Bear Goggles</div>
        </div>

        <div className={styles.extraBezel}>
          <div className={styles.corner} />
          <div className={styles.lines} />
          <div className={styles.corner} />
          <div className={styles.verticalLines} />
          <div />
          <div className={styles.verticalLines} />
          <div className={styles.corner} />
          <div className={styles.lines} />
          <div className={styles.corner} />
        </div>
      </div>
    </div>
  );
};

export default Vol;
