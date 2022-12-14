import useStore from "../../store";
import styles from "../../styles/iframe.module.scss";

const Page = (props) => {
  const windows = useStore((state) => state.windows);

  return windows[props.window.id].open ? (
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
  ) : null;
};

export default Page;
