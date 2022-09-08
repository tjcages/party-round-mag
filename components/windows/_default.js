import styles from "../../styles/default.module.scss";

const Page = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <h1>Hello, fucker!</h1>

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

export default Page;
