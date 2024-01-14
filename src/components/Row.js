import React, { useEffect, useState, useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Thumbnail from './Thumbnail';
import Footer from './Footer';

const Row = ({movie}) => {
  const rowRefs = useRef({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/movieData?order=desc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.status === 'ok') {
          setMovies(data.data);
        } else {
          console.error('Error fetching movie data:', data.data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, []);

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

  let allGenres = [...new Set(movies.flatMap(movie => movie.genre.split(',')))];

  // Shuffle the order of genres
  allGenres = shuffleArray(allGenres);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      {allGenres.map((genre) => (
        <div key={genre} className="space-y-0.5 md:space-y-2">
          <h2 className="w-56 mt-6 px-4 mb-[-10px] cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
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
              {movies
                .filter(movie => movie.genre.split(',').includes(genre))
                .map((movie) => (
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
      {movie?(<Footer />):("")}
    </>
  );
};

export default Row;
