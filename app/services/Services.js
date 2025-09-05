import React from "react";
import styles from "./Services.module.css";

const Services = ({ title, circles, inverted }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      {!inverted ? (
        <div className={styles.triangle}>
          <div className={styles.topRow}>
            {circles.slice(0, 2).map((c, i) => (
              <div key={i} className={styles.circleWrapper}>
                <div className={styles.circle}>{c.label}</div>
                <p className={styles.circleText}>{c.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.circleWrapper}>
              <div className={styles.circle}>{circles[2].label}</div>
              <p className={styles.circleText}>{circles[2].description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.triangle}>
          <div className={styles.topRowSingle}>
            <div className={styles.circleWrapper}>
              <div className={styles.circle}>{circles[0].label}</div>
              <p className={styles.circleText}>{circles[0].description}</p>
            </div>
          </div>
          <div className={styles.bottomRow}>
            {circles.slice(1).map((c, i) => (
              <div key={i} className={styles.circleWrapper}>
                <div className={styles.circle}>{c.label}</div>
                <p className={styles.circleText}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
