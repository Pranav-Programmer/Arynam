import React, { useEffect, useState } from 'react';
import "../Updates/Updates.css";
import Image from "next/image";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MovieLoader from '@/components/MovieLoader';

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

const CustomerReview = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteThisMovieName, setdeleteThisMovieName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpen = (feedback) => {
    setdeleteThisMovieName(feedback);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedbackData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setFeedbackData(data.data);
      } else {
        console.error('Error fetching feedback data:', data.data);
      }
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchFeedbackData();
  }, []);
   const imageNames = ['/user-g.jpg', '/user-b.png', '/user-g2.jpg'];
   var i = 0;

   useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

   if (Object.keys(feedbackData).length === 0) {
    return (
      <>
          <div className="flex justify-center items-center ">
            {loading ? (
              <MovieLoader/>
            ) : (
              <p className="text-xl text-gray-500">There is no Review here</p>
            )}
          </div>
      </>
    );
  }
 
  return (
    <div className="Updates">
      {feedbackData.map((update) => {
        return (
          <>
          <div key={update._id} className="update">
            <Image src={imageNames[i++]} width={100} height={100} alt="profile" />
            <div className="noti">
              <div onClick={() => {handleOpen(update.feedback);}} className='cursor-pointer' style={{marginBottom: '0.5rem', display: 'flex', flexDirection: 'column'}}>
                <span>
                {update?.feedback.split(' ').slice(0, 4).join(' ')} ...
                </span>
              </div>
                <span style={{fontWeight:'bold'}}>{update.rating} <StarPurple500Icon style={{color:'#FFD700'}}/></span>
            </div>
          </div>
          </>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box className="rounded-2xl" sx={style}>
            <Typography className="text-white" id="modal-modal-title" variant="h6" component="h2">
            User Review
            </Typography>
            <Typography className="text-white" id="modal-modal-description" sx={{ mt: 2 }}>
              {deleteThisMovieName}
            </Typography>
            <Stack spacing={2} direction="row" className="flex mt-4" justifyContent="flex-end">
              <button
                onClick={handleClose}
                variant="contained"
                className="rounded-md border-solid border-2 border-white text-white p-1 px-2"
              >
                Close
              </button>
            </Stack>
          </Box>
      </Modal>

    </div>
  );
};

export default CustomerReview;
