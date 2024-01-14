import React, {useState} from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: '#fff',
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[2],
    },
    label: {
      color: '#000',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    input: {
      width: '100%',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: '#4caf50',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#388e3c',
      },
    },
    ratingContainer: {
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    ratingStack: {
      display: 'flex',
      alignItems: 'center',
    },
    ratingIcon: {
      fontSize: '3rem',
      color: '#FFD700',
      margin: theme.spacing(1),
    },
    ratingIconEmpty: {
      fontSize: '3rem',
      color: 'gray',
      margin: theme.spacing(1),
      backgroundColor:'#fff',
      borderRadius:'50%',
    },
  }));

const Feedback = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
   
    if(rating !== 0 && feedback !== ''){
    fetch("http://localhost:5000/upload-movie-feedback", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        feedback,
        rating,
      }),
    })
      .then((res) => {
          setData(false);
          setDone(true);
          setIsLoading(false);
          return res.json()
      })
      .then((data) => {
        if (data.status === "ok") {
          setIsLoading(true);
          setData(false);
          setDone(true);
          setIsLoading(false);
        }
      });
    }
    else{
          setIsLoading(true);
          setDone(false);
          setData(true);
          setIsLoading(false);
}};

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const loader = (
    <div className="loader">
      <Image src='/load.gif' width={100} height={100} alt="loading" className='flex justify-center'/>
    </div>
  );

  return (
    <div className='flex flex-col'>
    <div>
      <Navbar/>
      </div>
      <div className="min-h-screen text-white flex flex-col justify-between" style={{backgroundColor:"#313336"}}>
      <div className="text-white" style={{backgroundColor:"#313336"}}>
        <div className="flex items-center justify-center">
        <div className="bg-gray-700 p-8 rounded shadow-md w-full md:max-w-4xl mt-16">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
            Leave your feedback<span className="text-red-500">*</span>
            </label>
            <TextField
            name="feedback"
            label="Feedback"
            variant="outlined"
            multiline
            minRows={5}
            className={classes.input}
            value={feedback}
            onChange={handleFeedbackChange}
            aria-required
            InputProps={{
              style: {
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '3px solid #ccc',
                padding: '10px 12px',
              },
            }}
          />
          </div>
          <div className="flex justify-center">
          <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
              style={{ fontSize: '3rem', color: '#ffc107' }}
              emptyIcon={<StarBorderIcon className={classes.ratingIconEmpty} />}
              icon={<StarIcon className={classes.ratingIcon} />}
              halficon={<StarHalfIcon className={classes.ratingIcon} />}
              aria-required
            />
          </div>
          <div className="relative flex justify-center mt-4 mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
          </div>
        </div>
        <p className="text-gray-400 text-center" style={{marginTop:'-1.8rem'}}>Arynam © 2024</p>
      </div>
      <div className='flex justify-center' style={{paddingTop:'2rem'}}>
          {isLoading ? (
             loader
          ) :
          (
          <span className='flex justify-center' style={{fontWeight: 'bold',  color:'#62BDE6', paddingTop:'.8rem'}}>{done && "Thank you for your valuable feedback !!  "}{data && "Please give rating with feedback  "}</span>
        ) }
          </div>
      <Footer/>
      </div>
    </div>
  )
}

export default Feedback
