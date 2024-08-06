import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

const Trailer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const [trailer, setTrailer] = useState(null); // State to store trailer URL
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to indicate loading state

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`/${category}/${id}/videos`);
        const trailerKey = response?.data?.results?.[0]?.key; // Assuming you fetch an array of videos and take the first one
        if (trailerKey) {
          const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
          setTrailer(trailerUrl); // Store the trailer URL in state
        } else {
          setError("No trailer available"); // Set error message if no trailer found
        }
      } catch (error) {
        console.log("Error fetching trailer: ", error);
        setError("Error fetching trailer"); // Handle fetch error
      } finally {
        setLoading(false); // Update loading state after fetch completes
      }
    };

    fetchTrailer(); // Call the function on component mount
  }, [category, id]); // Depend on category and id for fetch logic

  if (loading) {
    return (
      <div className="absolute bg-[rgba(0,0,0,0.9)] z-[100] top-[0%] left-[0%] w-screen h-screen flex items-center justify-center">
        <loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute bg-[rgba(0,0,0,0.9)] z-[100] top-[0%] left-[0%] w-screen h-screen flex items-center justify-center">
        <p className="text-white">{error}</p>
        <Link
          onClick={() => navigate(-1)}
          className="absolute hover:text-blue-500 ri-close-fill text-3xl text-white right-[10%] top-[10%] sm:right-[5%] sm:top-[5%] z-[10000]"
        ></Link>
      </div>
    );
  }

  if (!trailer) {
    return (
      <div className="absolute bg-[rgba(0,0,0,0.9)] z-[100] top-[0%] left-[0%] w-screen h-screen flex items-center justify-center">
        <p className="text-white">No trailer available</p>
      </div>
    );
  }

  return (
    <div className="absolute bg-[rgba(0,0,0,0.9)] z-[100] top-[0%] left-[0%] w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-blue-500 ri-close-fill text-3xl text-white right-[5%] top-[5%]"
      ></Link>
      <div className="scale-[0.6] sm:scale-[2]">
        <ReactPlayer controls url={trailer} />
      </div>
    </div>
  );
};

export default Trailer;
