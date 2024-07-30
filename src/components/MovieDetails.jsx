import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { asyncloadmovie, removemovie } from "../actions/movieAction";
import HorizontalCards from "./Templates/HorizontalCards";
import Loading from "./Templates/Loading";
import { useGetMovieQuery, useGetListQuery } from "../services/TMDB";
import { MdFavorite, MdFavoriteBorder, MdPlusOne } from "react-icons/md";
import { CgRemove } from "react-icons/cg";
import { userSelector } from "../reducers/auth";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  const { data } = useGetMovieQuery(id);

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  const truncateOverview = (overview) => {
    if (overview.length <= 400) {
      return overview;
    }
    // Find the last period (.) before or at 400 characters

    const truncated = overview.slice(0, 400);
    const lastPeriodIndex = truncated.lastIndexOf(".");
    if (lastPeriodIndex !== -1) {
      return truncated.slice(0, lastPeriodIndex + 1); // Include the period
    } else {
      return truncated + "..."; // Fallback if no period found
    }
  };

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => dispatch(removemovie());
  }, [dispatch, id]);

  const getLogoPath = () => {
    const watchProviders = info?.watchproviders?.results?.IN;

    if (watchProviders?.flatrate?.length > 0) {
      return watchProviders.flatrate[0].logo_path;
    } else if (watchProviders?.buy?.length > 0) {
      return watchProviders.buy[0].logo_path;
    } else if (watchProviders?.ads?.length > 0) {
      return watchProviders.ads[0].logo_path;
    } else if (watchProviders?.rent?.length > 0) {
      return watchProviders.rent[0].logo_path;
    } else {
      // Handle case where none of the above are present
      return null; // or an appropriate fallback, e.g., a default image URL
    }
  };

  // Usage example
  const logo_path = getLogoPath();

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-[149vh] px-[5%] relative overflow-x-hidden"
    >
      {/* Part 1 nav*/}
      <nav className="w-[100%] h-[10vh] text-zinc-300 flex items-center gap-6 text-lg">
        <i
          className="ri-arrow-left-line hover:text-blue-400 text-2xl font-semibold text-zinc-200 mr-5 cursor-pointer"
          onClick={() => navigate(-1)}
        ></i>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line hover:text-white"></i>
        </a>
        <a
          target="_blank"
          href={`https://en.wikipedia.org/${info.external_ids.wikidata_id}`}
        >
          <i className="ri-earth-line hover:text-white"></i>
        </a>

        <a
          className="hover:text-white"
          target="_blank"
          href={`https://www.imdb.com/title/${info.external_ids.imdb_id}`}
        >
          imdb
        </a>
        <Link to="/" className="ml-[83%] hover:text-white text-[18px]">
          Home
        </Link>
      </nav>

      {/* Part 2 */}
      <div className="w-full h-[60vh] flex relative mx-[7%]">

        {/* Part 2a Streaming Partner */}
        {logo_path && (
          <div className=" w-[30vw] h-[4vh] flex justify-center mt-[26vh] absolute right-[74.5vw]">
            {/* <h3 className="text-white text-2xl font-medium bg-black w-[25vh] rounded text-center">
              Available Platform
            </h3> */}
            <span
              className="rounded-full 
            bg-white w-[9vh] h-[9vh] flex justify-center items-center"
            >
              <img
              className="h-[6vh] w-[6vw] object-contain"
              src={`https://image.tmdb.org/t/p/w500/${logo_path}`}
              alt=""
            /> 
            </span>
            {/* <img
              className="h-[4vh] w-[4vw] object-contain rounded"
              src={`https://image.tmdb.org/t/p/w500/${logo_path}`}
              alt=""
            /> */}
          </div>
        )}

        {/* Part 2b Poster */}
        <img
          className="h-[55vh] object-contain shadow-[8px_17px_18px_2px] mt-2 w-"
          src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`}
          alt=""
        />

        {/* Part 2c Details */}
        <div className="content mr-10 w-[67%] ml-[5%]">
          <h1 className="text-white text-4xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex text-white items-center gap-x-4 mt-3 mb-5">
            <span
              className="rounded-full text-lg font-semibold 
            bg-yellow-500 text-white w-[7vh] h-[7vh] flex justify-center items-center"
            >
              {(info.detail.vote_average * 10).toFixed() === "0" ? (
                "NA"
              ) : (
                <>
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </>
              )}
            </span>
            <h1 className="w-[20px] font-semibold text-xl leading-5 mr-8">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-2 mb-1 text-white">Overview</h1>
          <p className="text-white leading-5 w-[85%]">
            {truncateOverview(info.detail.overview)}
          </p>
          <div className="flex gap-2">
            <Link
              to={`${pathname}/trailer`}
              className="text-black bg-white font-medium px-3 h-[35px] flex items-center 
              justify-center rounded-xl mt-3 hover:bg-zinc-300"
            >
              <span>
                <i className="ri-play-fill mr-1"></i>
              </span>
              Play Trailer
            </Link>
            <button
              onClick={addToFavorites}
              className="text-white font-medium px-3 h-[35px] flex items-center 
        justify-center rounded-xl mt-3 w-[6vw] ml-2"
            >
              <span className="mr-1">
                {isMovieFavorited ? <MdFavorite /> : <MdFavoriteBorder />}
              </span>
              {isMovieFavorited ? "Unfavorite" : "Favorite"}
            </button>
            <button
              onClick={addToWatchlist}
              className="text-white font-medium px-3 h-[35px] flex items-center 
        justify-center rounded-xl mt-3 "
            >
              <span className="mr-1">
                {isMovieWatchlisted ? <CgRemove /> : <MdPlusOne />}
              </span>
              Watchlist
            </button>
          </div>
          <h1 className="text-white text-2xl italic mt-3">Top Cast</h1>
          <div className="flex gap-3">
            {data &&
              data.credits.cast
                .map(
                  (character, i) =>
                    character.profile_path && (
                      <div key={i} className="flex flex-col">
                        <img
                          className="w-[130px] h-[160px] bg-red-100 rounded mt-4 object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt=""
                        />
                        <h1 className="text-white">{character?.name}</h1>
                        <h1 className="text-zinc-400">
                          {character.character.split("/")[0].split(' ').slice(0, 2).join(' ')}
                        </h1>
                      </div>
                    )
                )
                .slice(0, 6)}
          </div>
        </div>
      </div>

      {/* Part 3 Recommendations and Similar Stuff */}
      <hr className="border-none h-[1px] bg-zinc-400 mt-1" />
      <h1 className="mt-3 text-2xl font-semibold text-white">
        Recommendations and Similar Stuff
      </h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar}/>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
