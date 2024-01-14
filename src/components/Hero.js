import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";

const Hero = ({movie, setMovie}) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/movieData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });

        const data = await response.json();

        if (data.status === "ok" && data.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.data.length);
          const randomMovie = data.data[randomIndex];

          setMovies(data.data);
          setMovie(randomMovie);
        } else {
          console.error("Error fetching movie data:", data.data);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [setMovie]);

  return (
    <div>
        <MovieDetails
          movie={movie}
          trailerURL={trailer}
        />
    </div>
  );
};

export default Hero;
