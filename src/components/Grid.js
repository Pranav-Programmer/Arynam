import React, { useEffect, useState, useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Thumbnail from '@/components/Thumbnail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieLoader from './MovieLoader';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Grid = ({movieCategory, categoryName}) => {
  const rowRefs = useRef({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const response = await fetch('http://localhost:5000/webSeriesByCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: movieCategory }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
          const genreMovies = {};
          data.data.forEach((movie) => {
            movie.genre.split(',').forEach((genre) => {
              if (!genreMovies[genre]) {
                genreMovies[genre] = [];
              }
              genreMovies[genre].push(movie);
            });
          });

          Object.keys(genreMovies).forEach((genre) => {
            genreMovies[genre] = shuffleArray(genreMovies[genre]);
          });

          setMovies(genreMovies);
        } else {
          console.error('Error fetching movie data:', data.data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [movieCategory]);

  const handleClick = (direction, genre) => {
    const rowRef = rowRefs.current[genre];

    if (rowRef) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef;

      const scrollStep = clientWidth * 0.8;

      const scrollTo =
        direction === 'left'
          ? Math.max(0, scrollLeft - scrollStep)
          : Math.min(scrollWidth - clientWidth, scrollLeft + scrollStep);

      rowRef.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const moviesByGenre = {};
  Object.keys(movies).forEach((genre) => {
    moviesByGenre[genre] = shuffleArray(movies[genre]);
  });

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (Object.keys(moviesByGenre).length === 0) {
    return (
      <>
        <Navbar />
        <div className='flex flex-col justify-between h-screen'>
          <div className="flex justify-center items-center h-100 w-100 mt-40 mb-40">
            {loading ? (
              <MovieLoader />
            ) : (
              <p className="text-2xl text-gray-500">There is no {categoryName} uploaded</p>
            )}
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const allGenres = Object.keys(moviesByGenre);

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-between'>
        <div className='mt-20 '>
          {allGenres.map((genre) => (
            <div key={genre} className="space-y-0.5 md:space-y-2">
              <h2 className="w-56 ml-6 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {genre}
              </h2>

              <div className="group relative md:ml-2">
                <BiChevronLeft
                  className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                  onClick={() => handleClick('left', genre)}
                />

                <div
                  ref={(el) => (rowRefs.current[genre] = el)}
                  className="flex items-center space-x-0.2 scrollbar-hide overflow-x-scroll space-x-1.5 md:space-x-3.5 p-2"
                >
                  {moviesByGenre[genre].map((movie) => (
                    <Thumbnail key={movie._id} movie={movie} />
                  ))}
                </div>

                <BiChevronRight
                  className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                  onClick={() => handleClick('right', genre)}
                />
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Grid;
