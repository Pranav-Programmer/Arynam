import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import FavourateMovieList from '@/components/FavourateMovieList';
import Navbar from '@/components/Navbar';
import { signOut } from "next-auth/react";
import Login from "@/components/Login";

const Profile = () => {
  const { data: session } = useSession();
  const [movieCount, setMovieCount] = useState(0);
  const [webSeriesCount, setWebSeriesCount] = useState(0);
  const [animeCount, setAnimeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        if (session && session.user) {
          const response = await fetch('http://localhost:5000/categoryCounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: session.user.email}),
          });

          const data = await response.json();

          if (data.status === 'ok') {
            setMovieCount(data.data.movies);
            setWebSeriesCount(data.data.webSeries);
            setAnimeCount(data.data.anime);
          } else {
            console.error('Error fetching counts:', data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    if (session) {
      fetchCounts();
    }
  }, [session]);

  if (!session) {
    return <Login />;
  }

  const { user } = session;

  return (
    <div className='mb-4'>
      <Navbar />
      <div className="bg-black-100 p-8 md:p-20 mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="md:col-span-1 grid grid-cols-2 gap-4">
            <div className="relative rounded-full overflow-hidden h-36 w-36">
              <Image
                src={user.image}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl md:text-2xl font-semibold mb-4">{user.name}</div>
              <button onClick={() => signOut()} className="text-sm font-semibold text-gray-700 py-2 px-4 border border-gray-300 rounded self-start">
                Sign Out
              </button>
            </div>
          </div>
          <div className="md:col-span-1 mt-4 mb-8 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex flex-col items-center">
                  <span className="py-4 font-semibold text-5xl mr-2">{movieCount}</span>
                  <span className="text-gray-600 text-2xl">Movies</span>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <span className="py-4 font-semibold text-5xl mr-2">{webSeriesCount}</span>
                  <span className="text-gray-600 text-2xl">Web Series</span>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <span className="py-4 font-semibold text-5xl mr-2">{animeCount}</span>
                  <span className="text-gray-600 text-2xl">Anime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FavourateMovieList user={user} filteredMoviesList={filteredMovies} searchQuery={searchQuery} />
    </div>
  );
};

export default Profile;
