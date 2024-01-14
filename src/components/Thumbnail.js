import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieLoader from "@/components/MovieLoader";

const Thumbnail = ({ movie, user }) => {
  const [removeStatus, setRemoveStatus] = useState(null);
  const [btntext, setBtntext] = useState("Remove")

const handleRemove = async () => {
  setBtntext("Removing...")
  try {
    const response = await fetch('http://localhost:5000/removeMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movie._id,
        userid: user.email,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      setRemoveStatus('Deleted');
      window.location.reload();
    } else {
      setRemoveStatus(`Error: ${data.data}`);
    }
  } catch (error) {
    setRemoveStatus(`Error: ${error.message}`);
  }
};

  if(user){return (
    <>{movie? (
      <div className="relative flex flex-col text-white no-underline rounded-xl bg-gray-800 overflow-hidden p-2">
      <Link href={`/movieData/${movie._id}`} passHref>
        <div className="w-full h-40 min-w-[180px] md:min-w-[260px] relative overflow-hidden">
          <Image
            src={movie.image}
            className="w-full h-full object-cover rounded-sm"
            fill
            alt="movie poster"
          />
        </div>
        <div className="h-4 overflow-hidden mt-2">
           <p className="text-sm ml-3 text-center w-60 truncate">{movie.name}</p>
        </div>
      </Link>
        <div className="h-4 mb-3 mt-2 text-center">
          <Button
            onClick={handleRemove}
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            {btntext}
          </Button>
          {removeStatus && <p className="text-sm text-center mt-1">{removeStatus}</p>}
        </div>
      </div>
  ) : (<MovieLoader/>)}
    </>
  );
}
else{
return (
  <>
  <Link href={`/movieData/${movie._id}`} passHref>
    { movie?(
    <div className="relative flex flex-col items-center text-white no-underline rounded-xl bg-gray-800 overflow-hidden p-2">
      <div className="w-full h-40 min-w-[180px] md:min-w-[260px] relative overflow-hidden">
        <Image
          src={movie.image}
          className="w-full h-full object-cover rounded-sm"
          fill
          alt="movie poster"
        />
      </div>
      <div className="h-4 overflow-hidden mt-2">
        <p className="text-sm text-center w-40 truncate">{movie.name}</p>
      </div>
    </div>
) : (<MovieLoader/>)}
    </Link>
  </>
);
}
};

export default Thumbnail;
