import React, { useEffect, useState } from 'react';
import "./Cards.css";
import Link from 'next/link';
import Image from 'next/image';
import MovieLoader from '@/components/MovieLoader';

const Cards = () => {
  const [movies, setMovies] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/topFavoritesMovie?order=desc', {
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
  },[]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (Object.keys(movies).length === 0) {
    return (
      <div className='flex flex-col md:flex-row justify-center items-center'>
      <div className="flex justify-center items-center ">
            {loading ? (
              " "
            ) : (
              <p className="text-xl text-gray-500">There are no</p>
            )}
      </div>
      {loading ? (
              " "
            ) : (<div className='flex flex-row justify-center items-center'>
      <h1 className='text-3xl font-extrabold px-1'> Most</h1>
      <h1 className='text-3xl font-extrabold px-1 text-red-500'>Watched </h1>
      </div>)}
          <div className="flex justify-center items-center ">
            {loading ? (
              <MovieLoader/>
            ) : (
              <p className="text-xl text-gray-500">movies yet</p>
            )}
          </div>
      </div>
    );
  }

  return (
    <div className="Cards">
      <div className='flex flex-row md:flex-col gap-6 justify-center items-center'>
      <h1 className='text-3xl font-extrabold'>Most</h1>
      <h1 className='text-3xl font-extrabold text-red-500'>Watched</h1>
      </div>
      {movies.map((movie) => (
              <div key={movie._id} className="relative flex flex-col text-white no-underline rounded-xl bg-gray-800 overflow-hidden p-2">
              <Link href={`/movieData/${movie._id}`} passHref>
                <div className="w-full h-40 min-w-[180px] md:min-w-[260px] relative overflow-hidden">
                  <Image
                    src={movie.image}
                    className="w-full h-full object-cover rounded-sm"
                    fill
                    alt="movie poster"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="h-4 overflow-hidden mt-2">
                   <p className="text-sm ml-3 text-center w-60 truncate">{movie.name}</p>
                </div>
              </Link>
              </div>
            ))}
    </div>
  );
};

export default Cards;
