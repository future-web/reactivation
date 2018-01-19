import * as React from "react";

import styles from "./style.css";

type Props = {
  icon?: string,
  title: string,
  description: string
};

const Feature = ({ icon, title, description }: Props) => (
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
