import React, { useEffect, useState } from "react";
import styles from "../../styles/mag.module.scss";

const Mag = (props) => {
  const [showFrame, setShowFrame] = useState(false);
  useEffect(() => {
    setShowFrame(true);
  }, [showFrame, setShowFrame]);

  return (
    <div className={styles.content}>
      <div className={styles.bezel}>
        <div className={styles.header}>
          <h1>A DROP BY PARTY ROUND</h1>
        </div>

        <div className={styles.magContainer}>
          {showFrame && (
            <iframe
              src="https://my.spline.design/partyroundmag-f24c1e039695f32f69b45ddd1315f990/"
              width="100%"
              height="100%"
              style={{ pointerEvents: "none" }}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mag;
