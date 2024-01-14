import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Updates.css";
// import { UpdatesData } from "../../../Data/Data";
import Image from "next/image";
import { format } from 'date-fns';
import MovieLoader from "@/components/MovieLoader";

const Updates = () => {
  const [Pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/upload-upcoming-movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pid,
          name,
          image,
          formattedDate,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
          
      } else {
        console.error("Error uploading movie:", data.data);
      }
    } catch (error) {
      console.error("Error uploading movie:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
          setPid("");
          setName("");
          setImage(null);
          setFormattedDate(format(new Date(), 'MMM dd, yyyy'));
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'ml_default');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dwdkxrsrw/image/upload',
        formData
      );

      setImage(res.data.secure_url);
      setPid(res.data.secure_url.substring(res.data.secure_url.lastIndexOf('/') + 1, res.data.secure_url.lastIndexOf('.')))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setFormattedDate(format(new Date(), 'MMM dd, yyyy'));
  }, []);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/upcomingMovieData?order=desc', {
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

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setDataLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

   if (Object.keys(movies).length === 0) {
    return (
      <>
          <div className="flex justify-center items-center ">
            {dataLoading ? (
              <MovieLoader/>
            ) : (
              <p className="text-xl text-gray-500">No upcoming movie added</p>
            )}
          </div>
      </>
    );
  }
  
  return (
    <div className="Updates">
      {movies.map((update) => {
        return (
          <div key={update._id} className="update">
            {update.image?(<Image src={update.image} alt="profile" width={100} height={100}/>):("")}
            <div className="noti">
              <div  style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span>
              </div>
                <span>{update.formattedDate}</span>
            </div>
          </div>
        );
      })}
      <div className="update">
        <div className="noti">
      <form onSubmit={handleSubmit}>
        <div>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              required
            />
          </div>
          <div className="flex justify-center">
          <button type="submit" className="border-solid border-2 border-sky-300 px-2 mt-2 text-sky-300" disabled={loading} variant="outlined">
              {loading ? 'Updating...' : 'Update'}
          </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Updates;
