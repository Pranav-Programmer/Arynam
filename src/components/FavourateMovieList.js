import React, { useEffect, useState } from 'react';
import Thumbnail from './Thumbnail';
import MovieLoader from '@/components/MovieLoader';

const useMoviesPerPage = () => {
  const [moviesPerPage, setMoviesPerPage] = useState(20);

  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth >= 1024) {
        setMoviesPerPage(20);
      } else if (window.innerWidth >= 768) {
        setMoviesPerPage(14);
      } else {
        setMoviesPerPage(8);
      }
    };

    updateMoviesPerPage();

    window.addEventListener('resize', updateMoviesPerPage);
    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  }, []);

  return moviesPerPage;
};

const FavourateMovieList = ({ filteredMoviesList, searchQuery, user }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = useMoviesPerPage(); // Use the custom hook here
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/allFavoritesMovie?order=desc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({userid: user.email})
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
  }, [user.email]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  },);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  if (currentMovies.length === 0 && filteredMoviesList.length === 0) {
    return (
      <div className="flex justify-center items-center h-80">
        {
          loading?
          (<div><MovieLoader/></div>) :
        (<p className="text-2xl text-gray-500">No Web Series/Movies/Anime added</p>)
        }
        </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((filteredMoviesList.length > 0 ? filteredMoviesList : movies).length / moviesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='flex flex-col justify-between'>
      {filteredMoviesList.length <= 0 ? (
        <p style={{ marginTop: '-3rem' }} className="px-12 absolute">
          Web Series/Movies/Anime <br></br>Not found
        </p>
      ) : (
        ''
      )}
      <div className="px-4 md:px-8">
        <div className="group relative md:ml-2" style={{ marginTop: '-3rem' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(searchQuery.length <= 0 ? currentMovies : filteredMoviesList).map((movie) => (
              <Thumbnail key={movie._id} user={user} movie={movie}/>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`h-8 w-8 border rounded-full border-gray-300 focus:outline-none mt-6 ${
                  pageNumber === currentPage ? 'bg-gray-300 text-white' : ''
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavourateMovieList;
