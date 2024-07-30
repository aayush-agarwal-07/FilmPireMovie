import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Topnav from "./Templates/Topnav";
import Loading from "./Templates/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import gsap from "gsap";

const TvShows = () => {
  const [tv, setTv] = useState([]);
  const [category, setCategory] = useState("airing_today");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  document.title = "Filmpire | TvShows";

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevTv) => [...prevTv, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching TV data: ", error);
    }
  };
  useEffect(() => {
    // Animate the <hr> element with a class of 'animated-hr'
    gsap.fromTo('.animated-hr', { width: '0%' }, { width: '100%', duration: 1 });
  }, []);

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const refreshHandler = () => {
    setPage(1);
    setTv([]);
    setHasMore(true);
    getTv();
  };

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
      <div className="w-[100%] h-14vh flex items-center justify-between px-10 z-20 mb-7">
        <div className="flex">
          <Link to="/">
            <i className="ri-arrow-left-line hover:text-blue-400 text-2xl font-semibold text-white mr-5"></i>
          </Link>
          <h1 className="text-2xl font-semibold text-zinc-400">
          TvShows<small className="text-sm ml-[2px]">({category})</small>
        </h1>
        </div>
        <div className="w-[84%] ml-[8%] mr-[10%] z-[1000000] absolute left-0 ">
          <Topnav />
        </div>
        <Dropdown
          title="Filter"
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={handleCategoryChange} // Pass handler function
        />
      </div>

      <hr className="animated-hr w-full h-[1px] border-none bg-blue-400 mt-2" />

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={tv} title={"tv"} />
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

export default TvShows;
