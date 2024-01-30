import { useState, useEffect } from 'react';
import styles from "../styles.module.css";
import Image from 'next/image';

const Modal = ({ selectedImage, closeImage, posts, currentIndex, setCurrentIndex }) => {
  const [prevButtonVisible, setPrevButtonVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  useEffect(() => {
    setPrevButtonVisible(currentIndex > 0);
    setNextButtonVisible(currentIndex < posts.length - 1);
  }, [currentIndex, posts]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className={styles.modal} onClick={closeImage}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {prevButtonVisible && (
          <button className={styles.navButton} onClick={goToPrevious}>
            Previous
          </button>
        )}
        <button className={styles.close} onClick={closeImage}>
          X
        </button>
        {nextButtonVisible && (
          <button className={styles.navButton} onClick={goToNext}>
            Next
          </button>
        )}
        <div className="max-h-96 max-w-96 overflow-auto">
          <Image
            src={selectedImage}
            alt="Selected"
            layout="responsive"
            width={800}
            height={600}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
