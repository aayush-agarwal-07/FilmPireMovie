import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";
import Topnav from "./Templates/Topnav";

const TvShows = () => {
  const [tv, setTv] = useState([]);
  const [category, setCategory] = useState("airing_today");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | TvShows";

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
      console.log("Error fetching trending data: ", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
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
          TvShows<small className="text-sm ml-[2px]">({category})</small>
        </h1>
        <div className="w-[90%] ml-[15%] z-[10%]">
          <Topnav />
        </div>
        
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={getTv()}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={tv} title={"tv"} />
      </InfiniteScroll>
    </div>
  );
};

export default TvShows;
