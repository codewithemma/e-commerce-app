import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.ball} one`}></div>
      <div className={`${styles.ball} two`}></div>
      <div className={`${styles.ball} three`}></div>
    </div>
  );
};

export default Loader;
