import Image from "next/image";
import useStore from "../../store";
import styles from "../../styles/iframe.module.scss";

const Page = (props) => {
  const windows = useStore((state) => state.windows);

  return windows[props.window.id].open ? (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <Image src={props.window.src} alt={props.window.title} layout="fill" />
      </div>
    </div>
  ) : null;
};

export default Page;
