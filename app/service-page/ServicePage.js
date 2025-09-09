import React from "react";
import Image from "next/image";
import styles from "./ServicePage.module.css";

const Services = ({ title, circles, inverted }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      {!inverted ? (
        <div className={styles.triangle}>
          <div className={styles.topRow}>
            {circles.slice(0, 2).map((c, i) => (
              <div key={i} className={styles.circleWrapper}>
                <Image
                  src={c.icon}
                  alt={c.description}
                  width={80}
                  height={80}
                />
                <p className={styles.circleText}>{c.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.circleWrapper}>
              <Image
                src={circles[2].icon}
                alt={circles[2].description}
                width={80}
                height={80}
              />
              <p className={styles.circleText}>{circles[2].description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.triangle}>
          <div className={styles.topRowSingle}>
            <div className={styles.circleWrapper}>
              <Image
                src={circles[0].icon}
                alt={circles[0].description}
                width={80}
                height={80}
              />
              <p className={styles.circleText}>{circles[0].description}</p>
            </div>
          </div>
          <div className={styles.bottomRow}>
            {circles.slice(1).map((c, i) => (
              <div key={i} className={styles.circleWrapper}>
                <Image
                  src={c.icon}
                  alt={c.description}
                  width={80}
                  height={80}
                />
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
