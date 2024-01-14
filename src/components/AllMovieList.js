import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import MovieLoader from "./MovieLoader";

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
  backgroundColor: "#282c34",
};

const containerStyle = "container mx-auto py-8 w-full flex-grow";
const tableStyle = "w-full bg-black border border-white-200 shadow-md text-white";
const thTdStyle = "py-3 px-6 border-b border-white-200";
const thStyle = "bg-blue-500 text-white";
const tbodyStyle = "h-100 overflow-y-auto";
const tbodyTrStyle = "text-center hover:bg-white-50";
const theadStyle = "sticky top-16";
const theadThStyle = "md:px-4";

const AllMovieList = () => {
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
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/allMovieData?order=desc&query=${query}`);
        const data = await response.json();

        if (isMounted) {
          setData(data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (query.trim() === "") {
      fetchData();
    } else {
      const debounceTimeout = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

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

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  let count = 1;

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
        setDataLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (Object.keys(data).length === 0) {
    return (
      <>
          <div className="flex pt-40 pb-10 justify-center items-center ">
            {dataLoading ? (
              <MovieLoader />
            ) : (
              <p className="text-xl  text-gray-500">There is no Movie here</p>
            )}
          </div>
      </>
    );
  }

  return (
    <div style={{background:'#313336'}}>
      <Stack className="relative sticky top-0 w-full bg-neutral-900 p-3">
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
      <div className={containerStyle} style={{marginTop:"-2.4rem", background:'#313336'}}>
        <table className={tableStyle} style={{background:'#313336'}}>
          <thead style={{background:'#313336'}} className={theadStyle}>
            <tr>
              <th className={`${thStyle} ${theadThStyle}`}>Name</th>
              <th className={`${thStyle} ${theadThStyle}`}>Upload Date</th>
              <th className={`${thStyle} ${theadThStyle}`}>Link</th>
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
                <tr key={movie._id} style={{background:'#313336'}} className={`${tbodyTrStyle} ${thTdStyle}`}>
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
                      <button className="border-solid border-2 border-sky-300 px-2 mt-1 mb-1 text-sky-300" onClick={() => handleEditOpen(movie._id, movie.name, movie.downloadLink)} variant="outlined">Edit</button>
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
        <Box className="bg-gray-900 rounded-2xl" sx={style}>
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
  <Box className="bg-gray-900 rounded-2xl" sx={style}>
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
    <Stack spacing={2} direction="row" className="flex mt-8">
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
    </div>
  );
};

export default AllMovieList;
