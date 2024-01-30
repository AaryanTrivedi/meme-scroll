import styles from "../styles.module.css"

const ScrollToTop = ({ scrollToTop }) => {
  return (
    <div className={styles.scrollToTop} onClick={scrollToTop}>
      ↑
    </div>
  );
};

export default ScrollToTop;
