import styles from "../../styles/iframe.module.scss";

const Page = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <iframe
          src={props.src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "133%",
            height: "133%",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
