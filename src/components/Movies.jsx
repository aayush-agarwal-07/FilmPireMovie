import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Topnav from "./Templates/Topnav";
import Loading from "./Templates/Loading";

const Movies = () => {
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | Movies";

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}`);
      console.log(data)
      if (data.results.length > 0) {
        setMovie((prevMovie) => [...prevMovie, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    <div className="w-screen h-screen pt-[2%] relative overflow-x-hidden">
      <div className="w-[100%] h-10vh flex items-center px-10 z-20">
        <Link to="/">
          <i className="ri-arrow-left-line hover:text-purple-400 text-2xl font-semibold text-white mr-5"></i>
        </Link>
        <h1 className="text-2xl font-semibold text-zinc-400 absolute top-[7%] left-[7%]">
          Movie<small className="text-sm ml-[2px]">({category})</small>
        </h1>
        <div className="w-[90%] ml-[15%] z-[10%]">
          <Topnav />
        </div>
        
      </div>

      <Cards data={movie} title={"movie"} />
    </div>
  ) 
}
export default Movies;
