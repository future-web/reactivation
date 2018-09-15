import React from "react";

import styles from "./style.css";

type PropsType = {
  icon?: string,
  title: string,
  description: string
};

const Feature = ({ icon, title, description }: PropsType) => (
  <div className={styles.host}>
    {icon && (
      <img className={styles.icon} src={icon} alt={`Icon for ${title}`} />
    )}
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
);

Feature.defaultProps = {
  icon: null
};

export default Feature;
