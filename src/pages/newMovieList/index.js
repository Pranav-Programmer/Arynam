import React, { useState } from 'react';
import NewMovieListPage from '@/components/NewMovieListPage';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

const NewMoviesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  return (
    <div className="flex flex-col min-h-screen">
    <div className="space-y-16 md:space-y-16 mb-4">
      <Navbar />
      <SearchBar setSearchQuery={setSearchQuery} setFilteredMovies={setFilteredMovies}/>
      <NewMovieListPage filteredMoviesList={filteredMovies} searchQuery={searchQuery} />
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
    </div>
  );
};

export default NewMoviesList;
