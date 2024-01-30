import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ImageGrid from './components/ImageGrid';
import ScrollToTop from './components/ScrollToTop';
import Modal from './components/Modal';
import LoadingIndicator from './components/LoadingIndicator';
import styles from "./styles.module.css";

const Home = ({ initialPosts, initialAfter }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [after, setAfter] = useState(initialAfter || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const isPostValid = (post) => {
    return (
      (!post.over_18 || post.over_18 === false) &&
      (!post.spoiler || post.spoiler === false) &&
      (post.post_hint === 'image' || post.post_hint === 'rich:video')
    );
  };

  const loadMore = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      const imagesPerLoad = 100;

      const response = await axios.get(
        `https://www.reddit.com/r/memes.json?limit=${imagesPerLoad}&after=${after}`
      );
      const newData = response.data.data.children
        .map((child) => child.data)
        .filter((post) => !posts.some((p) => p.url === post.url) && isPostValid(post));

      setPosts((prevPosts) => [...prevPosts, ...newData]);
      setAfter(response.data.data.after);
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [after]);

  const handleScroll = () => {
    const threshold = 100;
    const distanceFromBottom =
      document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop);

    if (distanceFromBottom <= threshold) {
      loadMore();
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.bgC}>
        <div className="mx-auto max-w-5xl px-10 py-20 sm:px-10 sm:py-21 lg:max-w-7xl lg:px-8">
          <ImageGrid posts={posts} isPostValid={isPostValid} openImage={openImage} />
          <ScrollToTop scrollToTop={scrollToTop} />
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={selectedImage}
          closeImage={closeImage}
          posts={posts}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      <LoadingIndicator loadingMore={loadingMore} />
    </Fragment>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://www.reddit.com/r/memes.json?limit=100');
    const data = response.data;

    const initialPosts = data.data.children.map((child, index) => ({
      ...child.data,
      key: `post-${index + 1}`,
    }));
    const initialAfter = data.data.after;

    return {
      props: { initialPosts, initialAfter },
    };
  } catch (error) {
    console.error('Error fetching Reddit data:', error);
    return {
      props: { initialPosts: [], initialAfter: null },
    };
  }
}

export default Home;
