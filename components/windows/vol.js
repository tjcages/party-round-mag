import styles from "../../styles/vol.module.scss";

const Vol = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <div className={styles.headerImage} />

            <div className={styles.quad}>
              <div className={styles.item}>
                <span>Infinite Ads</span>
                <span className={styles.highlight}>[access locked]</span>
              </div>
              <div />
              <div className={styles.item}>
                <span>Gold Bar NFT</span>
                <span className={styles.highlight}>[access locked]</span>
              </div>
              <div />
              <div />
              <div />
              <div className={styles.item}>
                <span>Touch Grass Kits</span>
                <span className={styles.highlight}>[access locked]</span>
              </div>
              <div />
              <div className={styles.item}>
                <span>Bear Goggles</span>
                <span className={styles.highlight}>[access locked]</span>
              </div>
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
      </div>
    </div>
  );
};

export default Vol;
