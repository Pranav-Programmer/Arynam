import React, { useState, useEffect, Suspense} from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import Modal from './Modal';
import MovieLoader from "@/components/MovieLoader";
import Footer from "./Footer";

const MovieDetails = ({ movie, user }) => {
  const [userid, setuserid] = useState("");
  const [movieid, setmovieid] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [favMovieList, setFavMovieList] = useState(false);
  const [favMovieListAdd, setFavMovieListAdd] = useState(false);
  const [btntext, setBtntext] = useState("To Watchlist")
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setmovieid(movie?._id);
    setuserid(user?.email);
  }, [movie?._id, user?.email]);

  const handleFavourateClick = async (e) => {
    setBtntext("Adding...")
    e.preventDefault();
   
      try {
        const response = await fetch("http://localhost:5000/favourate-movie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid,
            movieid,
          }),
        });
  
        const data = await response.json();
  
        if (data.status === "ok") {
          setFavMovieListAdd(true);
          setBtntext("In Watchlist")
        } else {
          setFavMovieList(true);
          setBtntext("To Watchlist")
        }
      } catch (error) {
        console.error("Error adding movie:", error);
      }
  };

  const handleDownloadClick = () => {
    setOpenDialog(true);
  };

  const handleGoToSite = () => {
    window.open(movie?.downloadLink, '_blank');
  };  

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFavMovieList(false);
    setFavMovieListAdd(false);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
        setDataLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className='flex flex-col justify-between h-screen'>
          <div className="flex justify-center items-center h-100 w-100 mt-40 mb-40">
            {dataLoading ? (
              <MovieLoader />
            ) : (
              <p className="text-2xl text-gray-500">No movie to display here</p>
            )}
          </div>
          <Footer />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 h-[100vh] justify-center lg:pb-12">
          {/* Conditionally render loading skeleton */}
            <>
              {/* Image */}
              <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
                <Image
                  fill
                  src={movie?.image}
                  className="object-cover"
                  alt="movie poster"
                />
              </div>

              {/* Movie Details */}
              <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ml-6">
                {movie?.name.split(' ').slice(0, 40).join(' ')}
              </h1>
              <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ml-6">
                {movie?.information.split(' ').slice(0, 60).join(' ')}
              </p>
              <p className="max-w-xs font-bold text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ml-6">
                {movie?.language}
              </p>
              {user &&
              (<p className="absolute bottom-2 right-0 mr-4 max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-l lg:text-l ml-6">
                {movie?.formattedDate}
              </p>)}

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row ml-6">
                <div className="flex space-x-3">
                  <button
                    className="bannerButton bg-white text-black"
                    onClick={() => setShowPlayer(true)}
                  >
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                    Play
                  </button>

                  <button
                    className="bannerButton bg-[green]/50"
                    onClick={handleDownloadClick}
                  >
                    <DownloadForOfflineIcon className="h-5 w-5 md:h-8 md:w-8" />
                    Download
                  </button>
                </div>

                {user && (
                  <button
                    className={`mt-4 md:ml-3 w-60 md:w-50 md:mt-0 bannerButton bg-[blue]/40`}
                    onClick={handleFavourateClick}
                  >
                    <BookmarkAddTwoToneIcon className="h-5 w-5 md:h-8 md:w-8 justify-centre text-centre item-centre" />
                    {btntext}
                  </button>
                )}
                
              </div>
            </>

          {/* Player */}
          {showPlayer && (
            <div className="absolute top-14 md:top-10 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 mt-12">
              <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-1">
                <span className="font-semibold">Play Trailer</span>
                <div
                  className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F] z-50"
                  onClick={() => setShowPlayer(false)}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="relative pt-[56.25%]">
                <ReactPlayer
                  url={movie?.trailerLink}
                  width="100%"
                  height="97%"
                  style={{ position: "absolute", top: "0", left: "0" }}
                  controls={true}
                  playing={showPlayer}
                />
              </div>
            </div>
          )}

          {/* Modals */}
          <Modal
            open={favMovieList}
            onClose={handleCloseDialog}
            title="Alert 🔔"
            contentText="Already in Watchlist"
            buttonText="Ok"
          />

          <Modal
            open={favMovieListAdd}
            onClose={handleCloseDialog}
            title="Alert 🔔"
            contentText="Added to your Watchlist"
            buttonText="Ok"
          />

          {/* External Link Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">External Link Warning</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This link is taking you to a site outside of Arynam.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Back to Arynam</Button>
              <Button onClick={handleGoToSite}>Go to Site</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
