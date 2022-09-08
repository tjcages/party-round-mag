import styles from "../../styles/drops.module.scss";

import Button from "../Button";

const Drops = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <div className={styles.columns}>
              <div
                className={`${styles.leftImage} ${styles.inner} ${styles.outer}`}
              />
              <div className={styles.info}>
                <div className={styles.text}>
                  <h4 className={styles.ascii}>
                  ██████╗ ██████╗  ██████╗ ██████╗ ███████╗
                  ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
                  ██║  ██║██████╔╝██║   ██║██████╔╝███████╗
                  ██║  ██║██╔══██╗██║   ██║██╔═══╝ ╚════██║
                  ██████╔╝██║  ██║╚██████╔╝██║     ███████║
                  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝
                  </h4>
                  <p>
                    This should be a super long senetence that hopefully gets
                    wrapped around this way and that will
                  </p>
                </div>
                <div className={styles.horizontal}>
                  <Button text="F*** Off" large />
                  <Button text="mmmm ok" large />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drops;
