import Image from "next/image";
import styles from "../../styles/logo.module.scss";

const Logo = (props) => {
  const width = 400;
  const height = width * 0.41;

  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <Image
          src={"/img/logo.png"}
          alt="default icon"
          width={width}
          height={height}
        />

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

export default Logo;
