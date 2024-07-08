import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";
import Topnav from "./Templates/Topnav";

const Trending = () => {
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("tv");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | Popular";

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setPopular((prevPopular) => [...prevPopular, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
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
          Popular
        </h1>
        <div className="w-[90%] ml-[7%] z-[10%]">
          <Topnav />
        </div>
        
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular()}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
