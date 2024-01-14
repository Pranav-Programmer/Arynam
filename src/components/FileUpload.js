import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Image from "next/image";
import { categoryOptions } from './categoryOptions';

const FileUpload = ({setSelected}) => {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [Pid, setPid] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/upload-movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pid,
          name,
          information,
          trailerLink,
          downloadLink,
          language,
          image,
          genre,
          category,
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

          setName("");
          setInformation("");
          setPid("");
          setTrailerLink("");
          setDownloadLink("");
          setLanguage("");
          setImage(null);
          setGenre("");
          setCategory("");
          setFormattedDate(format(new Date(), 'MMM dd, yyyy'));
          setSelected(0);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'ml_default');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/Your_Cloudinary_Cloud_Name/image/upload',
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

  return (
    <>
      <div className="min-h-screen text-white" style={{backgroundColor:"#313336", marginTop:'-4rem'}}>
        <div className="flex items-center justify-center">
        <div className="bg-gray-700 p-8 rounded-xl shadow-md w-full md:max-w-4xl mt-16">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Name<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Poster<span className="text-red-500">*</span>:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              About Movie<span className="text-red-500">*</span>:
            </label>
            <textarea
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              placeholder='Not more than 50 words'
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Language<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Trailer Link<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={trailerLink}
              onChange={(e) => setTrailerLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Download Link<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={downloadLink}
              onChange={(e) => setDownloadLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Genre<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Category<span className="text-red-500">*</span>:
            </label>
            <select
              className="text-white mt-1 p-2 w-full border rounded bg-gray-700"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a Category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Movie'}
            </button>
            {loading && (
              <div className="absolute inset-0 flex justify-center">
                <Image
                  src="/load.gif"
                  alt="Loading..."
                  width={40}
                  height={40}
                />
              </div>
            )}
          </div>
        </form>
          </div>
        </div>
        <p className="text-gray-400 text-center" style={{marginTop:'-1.8rem'}}>Arynam © 2024</p>
      </div>
    </>
  );
};

export default FileUpload;
