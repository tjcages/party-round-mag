import useStore from "../../store";

import styles from "../../styles/recycle.module.scss";
import Button from "../Button";
import DefaultIcon from "../DefaultIcon";

const Page = (props) => {
  const windows = useStore((state) => state.windows);
  const openWindow = useStore((state) => state.openWindow);

  function handleOpenProgram(windowObject) {
    if (windowObject.href) {
      window.open(windowObject.href, "_blank");
    } else {
      openWindow(windowObject.id);
    }
  }

  return (
    <div className={styles.outer}>
      <div className={styles.menu}>
        <div className={styles.text}>
          <span className={styles.underline}>F</span>ile
        </div>
        <div className={styles.text}>
          <span className={styles.underline}>E</span>dit
        </div>
        <div className={styles.text}>
          <span className={styles.underline}>V</span>iew
        </div>
        <div className={styles.text}>
          <span className={styles.underline}>H</span>elp
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.bezel}>
          <div className={styles.grid}>
            <Button text="Name" />
            <Button text="Last Location" />
            <Button text="Date Deleted" />
            <Button text="Type" />
          </div>
          <div className={styles.bezel}>
            <div className={styles.inner}>
              <ul>
                {windows
                  .filter((window) => window.deleted) // DELETED
                  .map((window) => (
                    <li
                      className={styles.grid}
                      key={window.id}
                      onClick={() => handleOpenProgram(window)}
                    >
                      <div className={styles.name}>
                        <DefaultIcon
                          icon={window.icon}
                          small
                        />
                        <div className={styles.text}>{window.title}</div>
                      </div>
                      <div className={styles.text}>{window.location}</div>
                      <div className={styles.text}>{window.date}</div>
                      <div className={styles.text}>{window.type}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
