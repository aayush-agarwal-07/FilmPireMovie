import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";
import Topnav from "./Templates/Topnav";
import gsap from "gsap";

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

  useEffect(() => {
    // Animate the <hr> element with a class of 'animated-hr'
    gsap.fromTo(
      ".animated-hr",
      { width: "0%" },
      { width: "100%", duration: 1 }
    );
  }, []);

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
    <div className="w-[100%] sm:w-[84%] sm:left-[16%] pt-[2%] relative">
      <div className="w-[100%] flex items-center justify-between px-10 z-20">
        <div className="flex">
          <Link to="/">
            <i className="ri-arrow-left-line hover:text-blue-400 text-2xl font-semibold text-white mr-5 block sm:hidden"></i>{" "}
          </Link>
          <h1 className="text-3xl font-semibold text-zinc-400 -mt-1">
            Movie<small className="text-sm ml-[2px]">({category})</small>
          </h1>
        </div>
        <div className="w-[84%] ml-[8%] mr-[10%] z-[1000000] absolute left-0 ">
          <Topnav />
        </div>
        <div className="flex fixed z-[10000] right-10 top-[8.5]">
          <Dropdown
            title="Filter"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={handleCategoryChange}
          />
        </div>
      </div>

      <hr className="animated-hr w-full h-[1px] border-none bg-blue-400 mt-7" />

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
