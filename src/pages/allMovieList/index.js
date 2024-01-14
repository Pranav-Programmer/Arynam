import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import Profile from '../profile';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'gray',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const containerStyle = "container mx-auto px-4 py-8 max-w-screen-md flex-grow";
const tableStyle = "w-full bg-black mt-24 border border-white-200 shadow-md text-white";
const thTdStyle = "py-3 px-6 border-b border-white-200";
const thStyle = "bg-blue-500 text-white";
const tbodyStyle = "max-h-96 overflow-y-auto";
const tbodyTrStyle = "text-center hover:bg-white-50";
const theadStyle = "sticky top-0 bg-white";
const theadThStyle = "py-3 px-6";

const AllMovieList = () => {
  const { data: session } = useSession();
  const [editMovie, setEditMovie] = useState({
    _id: "",
    name: "",
    downloadLink: "",
  });
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = (_id, name, downloadLink) => {
    setEditMovie({ _id, name, downloadLink });
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);
  const allowedAdminEmails = ["beatsbreakers@gmail.com", "pranavdharme10@gmail.com"];
  const isAdmin = session && allowedAdminEmails.includes(session.user.email);

  const updateMovie = () => {
    fetch("http://localhost:5000/movieUpdate", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id: editMovie._id,
        downloadLink: editMovie.downloadLink,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleEditClose();
      })
      .catch((error) => console.error("Error updating movie:", error));
  };

  const [deleteThisMovie, setdeleteThisMovie] = useState("");
  const [deleteThisMovieName, setdeleteThisMovieName] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (_id, name) => {
    setdeleteThisMovie(_id);
    setdeleteThisMovieName(name);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const [imgPid, setImgPid] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/allMovieData?order=desc")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const deleteMovie = (_id) => {
    fetch("http://localhost:5000/deleteMovie", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        movie_id: _id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        deleteImage(imgPid);
        setData((prevData) => prevData.filter((movie) => movie._id !== _id));
      });
  };

  const deleteImage = async (imgPid) => {
    try {
      const response = await axios.post('http://localhost:5000/delete-image', {
        public_id: imgPid
      });
    } catch (error) {
      console.error('Error occurred while deleting the image', error);
    }
  };

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  let count = 1;

  if (!isAdmin) {
    return <Profile/>;
  }

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
      <Stack className="absolute w-full bg-neutral-900 p-4 mt-12">
        <Chip
          label={<h6 className="text-white h-10 text-2.2rem font-bold flex-wrap pl-2">Movies</h6>}
          variant="outlined"
          className="flex-1 h-12 rounded-5rem m-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
        />
        
          <input
            placeholder="Search"
            onChange={handleInputChange}
            style={{
                textDecoration:'none',
                height: '1.6rem',
                borderRadius: '5rem',
                margin: '.4rem 0 0',
                padding: '1rem 1rem',
                backgroundImage: 'white',
                position: 'absolute',
                border: '1px solid',
                borderColor: 'black',
                width: 'calc(100% - 3.3rem)',
                left: '1.6rem',
                color:'black'
              }}
          />
        
      </Stack>
      <div className={containerStyle}>
        <table className={tableStyle}>
          <thead className={theadStyle}>
            <tr>
              <th className={`${thStyle} ${theadThStyle}`}>Name</th>
              <th className={`${thStyle} ${theadThStyle}`}>Upload Date</th>
              <th className={`${thStyle} ${theadThStyle}`}>Edit Link</th>
              <th className={`${thStyle} ${theadThStyle}`}>Delete</th>
            </tr>
          </thead>
          <tbody className={tbodyStyle}>
            {data
              .filter((notes) => {
                if (notes.name?.toLowerCase().includes(query.toLowerCase())) {
                  return notes;
                }
                return false;
              })
              .map((movie) => (
                <tr key={movie._id} className={`${tbodyTrStyle} ${thTdStyle}`}>
                  <td className="py-1 px-2 text-left">{count++ + ". "}{query === "" ? (movie.name) : (
                    movie.name.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="px-0.1">{word} </span>
                    ))
                  )}</td>
                  <td className="text-center">{query === "" ? (movie.formattedDate) : (
                    movie.formattedDate.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="px-0.1">{word} </span>
                    ))
                  )}</td>
                  <td className="text-center">
                    <div className="flex justify-center items-center">
                      <Button className="mt-1 mb-1" onClick={() => handleEditOpen(movie._id, movie.name, movie.downloadLink)} variant="outlined">Edit</Button>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center items-center">
                      <DeleteIcon
                        onClick={() => {
                          setImgPid(movie.Pid);
                          handleOpen(movie._id, movie.name);
                        }}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-gray-900" sx={style}>
          <Typography className="text-white" id="modal-modal-title" variant="h6" component="h2">
          Delete Web Series / Movie / Anime
          </Typography>
          <Typography className="text-white" id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure! you want to delete {deleteThisMovieName}.
          </Typography>
          <Stack spacing={2} direction="row" className="flex mt-4">
              <button
                onClick={() => {
                  deleteMovie(deleteThisMovie);
                  handleClose();
                }}
                variant="contained"
                className="flex-1 py-2 rounded-md bg-red-500 text-white"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                variant="contained"
                className="flex-1 rounded-md bg-green-500 text-white ml-2"
              >
                Cancel
              </button>
            </Stack>
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
  <Box className="bg-gray-900" sx={style}>
    <Typography className="text-white" id="modal-edit-title" variant="h6" component="h2">
      Edit Movie Details
    </Typography>
    <div className="mt-4">
      <label className="text-white block mb-1">Download Link:</label>
      <input
        type="text"
        value={editMovie.downloadLink}
        onChange={(e) => setEditMovie({ ...editMovie, downloadLink: e.target.value })}
        className="w-full px-3 py-2 border border-gray-500 rounded text-black"
      />
    </div>
    <Stack spacing={2} direction="row" className="flex mt-4">
      <button
        onClick={updateMovie}
        variant="contained"
        className="flex-1 py-2 rounded-md bg-blue-500 text-white"
      >
        Save Changes
      </button>
      <button
        onClick={handleEditClose}
        variant="contained"
        className="flex-1 rounded-md bg-gray-500 text-white ml-2"
      >
        Cancel
      </button>
    </Stack>
  </Box>
</Modal>
      <div className="mt-auto">
          <Footer/>
      </div>
    </div>
  );
};

export default AllMovieList;
