import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import noimage from "../../assets/no-image.jpg";
import axios from "../../utils/axios";
import { MdAccountCircle } from "react-icons/md";
import { setUser, userSelector } from "../../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { RxAvatar } from "react-icons/rx";

const Topnav = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

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

  const handleLogin = async () => {
    const token = await fetchToken();
    if (token) {
      // Redirect to the authentication page
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  };

  useEffect(() => {
    const logInUser = async () => {
      const token = localStorage.getItem("request_token");
      const sessionIdFromLocalStorage = localStorage.getItem("session_id");

      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId(token);
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [dispatch]);

  return (
    <div className="relative z-50 w-full flex items-center justify-center">
      {/* Ensure this has higher z-index than other elements */}
      <div className="w-[66%] flex items-center justify-center relative mr-[4.5%]">
        <i className="ri-search-line text-white text-xl"></i>
        <input
          type="text"
          placeholder="Search Anything..."
          className="w-[70%] border-none bg-transparent outline-none rounded text-zince-200 mx-10 p-5 text-white relative z-[1000]"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        {query.length > 0 && (
          <i
            className="ri-close-line text-white text-2xl cursor-pointer hover:text-blue-300 absolute right-[9.5%]"
            onClick={() => setQuery("")}
          ></i>
        )}
      </div>
      <div className="absolute right-[3%]">
        {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            className="text-white hover:text-blue-300 hover:no-underline flex items-center"
          >
            Login &nbsp; <MdAccountCircle />
          </button>
        ) : (
          <Link
            to={`/profile/${user.id}`}
            className=" text-white hover:text-blue-300 hover:no-underline flex items-center"
          >
            <span className="mr-2">My Movies</span>
            <div className="text-xl"><RxAvatar /></div>
          </Link>
        )}
      </div>
      {query.length > 0 && (
        <div className="absolute top-[100%] left-[26.5%] bg-zinc-200 w-[40vw] max-h-[50vh] overflow-auto rounded shadow-lg z-[1500]">
          {/* Adjust z-index to ensure it appears above other elements */}
          {searchResults.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="p-2 border font-semibold text-zinc-600 border-b-zinc-400 hover:bg-zinc-300 hover:text-black duration-300 flex justify-start items-center gap-2 border-b-2 border-zinc-100"
            >
              <img
                className="w-[9vw] h-[9vh] object-cover rounded shadow-lg mr-5 bg-red"
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
