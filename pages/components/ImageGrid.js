import { Fragment } from 'react';
import styles from "../styles.module.css"
import Image from 'next/image';

const ImageGrid = ({ posts, isPostValid, openImage }) => {
  if (!Array.isArray(posts)) {
    return null; // Add some fallback or handle the case where posts is not an array
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
      {posts.map((post) => (
        <Fragment key={post.key}>
          {isPostValid(post) && (
            <a className={styles.group}>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  height={100}
                  width={100}
                  loading="lazy"
                  key={post.key}
                  src={post.thumbnail}
                  alt={post.title}
                  onClick={() => openImage(post.url)}
                  style={{ cursor: 'pointer' }}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
            </a>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ImageGrid;
