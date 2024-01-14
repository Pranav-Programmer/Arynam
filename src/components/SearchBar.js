import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { BiSearch } from "react-icons/bi";

const SearchBar = ({setFilteredMovies, setSearchQuery}) => {
    const [searchItem, setSearchItem] = useState('');
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

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    
        const filteredItems = movies.filter((movies) =>
        movies.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredMovies(filteredItems);
        setSearchQuery(searchTerm)
      }

    return (
        <div className="flex items-center space-x-2 px-4 md:px-8">
            <Chip
              variant="outlined"
              style={{flex:'10', height: '3rem', borderRadius:'5rem', margin:'.5rem .5rem 0 .5rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)', width:'98%'}}
            />
            <Chip
              avatar={<BiSearch alt="Natacha" style={{width:'2.3rem', height:'2.3rem',  margin:'.5rem -.7rem  0 -4.5rem', color:'white'}}/>}
              
            />
            <input
              type="text"
              value={searchItem}
              onChange={handleInputChange}
              placeholder='Web Series / Movies / Anime'
              style={{
                  textDecoration:'none',
                  height: '1.6rem',
                  borderRadius: '5rem',
                  margin: '.65rem -2.3rem .2rem',
                  padding: '1rem 1rem',
                  backgroundImage: 'white',
                  position: 'absolute',
                  border: '1px solid',
                  borderColor: 'black',
                  width: 'calc(100% - 9rem)',
                  left: '5.3rem',
                  color:'black'
                }}
            />
        </div>
    );
};

export default SearchBar;
