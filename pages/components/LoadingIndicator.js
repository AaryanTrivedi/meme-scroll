import styles from '../styles.module.css';

const LoadingIndicator = ({ loading, loadingMore }) => {
  return (
    (loading || loadingMore) && (
      <div className={styles.loadingIndicator}>
        <div className={styles.spinner}></div>
      </div>
    )
  );
};

export default LoadingIndicator;
