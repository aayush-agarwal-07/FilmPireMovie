import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";
import Topnav from "./Templates/Topnav";

const Trending = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("movie");
  const [time, setTime] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${time}?page=${page}`
      );
      if (data.results.length > 0) {
        setData((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setData([]);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getTrending();
      setIsLoading(false);
    };

    loadData();
  }, [category, time]);

  return (
    <div className="w-screen pt-[2%] relative overflow-x-hidden">
      <div className="w-[100%] h-10vh flex items-center px-10 z-20">
        <Link to="/">
          <i className="ri-arrow-left-line hover:text-purple-400 text-2xl font-semibold text-white mr-5"></i>
        </Link>
        <h1 className="text-2xl font-semibold text-zinc-400 absolute top-[7%] left-[7%]">
          Trending
        </h1>
        <div className="w-[90%] ml-[10%] z-[10%]">
          <Topnav />
        </div>
        
      </div>
      <InfiniteScroll
        next={getTrending}
        dataLength={data.length}
        loader={<Loading />}
        hasMore={hasMore}
      >
        <Cards data={data} />
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
