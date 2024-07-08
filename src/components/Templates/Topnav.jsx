import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/no-image.jpg";
import axios from "../../utils/axios";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setSearchResults(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="relative inline-block z-50 w-[70vw]"> {/* Ensure this has higher z-index than other elements */}
      <i className="ri-search-line text-white text-xl pl-[10%]"></i>
      <input
        type="text"
        placeholder="Search Anything..."
        className="w-[50%] border-none bg-transparent outline-none rounded text-zince-200 mx-10 p-5 text-white relative z-[1000]"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {query.length > 0 && (
        <i
          className="ri-close-line text-white text-2xl cursor-pointer"
          onClick={() => setQuery("")}
        ></i>
      )}
      {query.length > 0 && (
        <div className="absolute top-[100%] left-[17%] bg-zinc-200 w-[40vw] max-h-[50vh] overflow-auto rounded shadow-lg z-[1500]">
          {/* Adjust z-index to ensure it appears above other elements */}
          {searchResults.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="p-2 border font-semibold text-zinc-600 border-b-zinc-400 hover:bg-zinc-300 hover:text-black duration-300 flex justify-start items-center gap-2 border-b-2 border-zinc-100"
            >
              <img
                className="w-[9vw] h-[12vh] object-cover rounded shadow-lg mr-5 bg-red"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
