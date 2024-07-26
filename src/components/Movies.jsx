import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";
import Topnav from "./Templates/Topnav";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  document.title = `Filmpire | Movies (${category})`;

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching movie data: ", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    getMovies();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen h-screen pt-[2%] relative">
      <div className="w-[100%] h-10vh flex items-center px-10 z-20">
        <Link to="/">
          <i className="ri-arrow-left-line hover:hover:text-blue-400 text-2xl font-semibold text-white mr-5"></i>
        </Link>
        <h1 className="text-2xl font-semibold text-zinc-400 absolute top-[52px] left-[7.5%]">
          Movie<small className="text-sm ml-[2px]">({category})</small>
        </h1>
        <div className="w-[70%] ml-[6.5%] mr-[12%] z-[1000000]">
          <Topnav />
        </div>
        <Dropdown
          title="Filter"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={handleCategoryChange}
        />
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-7 bg-zinc-50 text-white p-2 rounded-full shadow-lg transition"
        >
          <i className="ri-arrow-up-s-line text-xl text-blue-600 font-semibold"></i>
        </button>
      )}
    </div>
  );
};

export default Movies;
