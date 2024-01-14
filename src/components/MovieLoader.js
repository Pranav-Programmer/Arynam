import React from 'react';
import styles from '@/style/Home.module.css';
import Image from 'next/image';

const MovieLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.avatar}>
          <div className={styles.imageContainer}>
            <Image
              src='/movie-load.gif'
              width={120}
              height={120}
              className='items-center'
              alt="movie poster"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieLoader;
