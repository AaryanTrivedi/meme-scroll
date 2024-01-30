import styles from "../styles.module.css"


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span>Le scroll</span>
      <a href="https://www.reddit.com/r/memes" target="_blank" rel="noopener noreferrer">
        <button className={styles.redditButton}>Visit r/memes</button>
      </a>
    </div>
  );
};

export default Navbar;
