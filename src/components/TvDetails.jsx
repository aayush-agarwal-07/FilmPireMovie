import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../actions/tvAction";
import noimage from "../assets/no-image.jpg";
import HorizontalCards from "./Templates/HorizontalCards";
import Loading from "./Templates/Loading";
import { useGetTvQuery, useGetListQuery } from "../services/TMDB";
import { MdFavorite, MdFavoriteBorder, MdPlusOne } from "react-icons/md";
import { CgRemove } from "react-icons/cg";
import { userSelector } from "../reducers/auth";

const TvDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  const { data } = useGetTvQuery(id);

  const { data: favoriteTv } = useGetListQuery({
    listName: "favorite/tv",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistTv } = useGetListQuery({
    listName: "watchlist/tv",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const [isTvFavorited, setIsTvFavorited] = useState(false);
  const [isTvWatchlisted, setIsTvWatchlisted] = useState(false);

  useEffect(() => {
    setIsTvFavorited(!!favoriteTv?.results?.find((tv) => tv?.id === data?.id));
  }, [favoriteTv, data]);

  useEffect(() => {
    setIsTvWatchlisted(
      !!watchlistTv?.results?.find((tv) => tv?.id === data?.id)
    );
  }, [watchlistTv, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "tv",
        media_id: id,
        favorite: !isTvFavorited,
      }
    );

    setIsTvFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "tv",
        media_id: id,
        watchlist: !isTvWatchlisted,
      }
    );

    setIsTvWatchlisted((prev) => !prev);
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
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [dispatch, id]);

  const filteredSeasons =
    info && info.detail && info.detail.seasons
      ? info.detail.seasons
          .filter((season) => season.season_number > 0) // Exclude specials (season_number 0)
          .sort((a, b) => a.season_number - b.season_number) // Sort by season number
      : [];

  // const getLogoPath = () => {
  //   const watchProviders = info?.watchprovidersresults?.IN;

  //   if (watchProviders?.flatrate?.length > 0) {
  //     return watchProviders.flatrate[0].logo_path;
  //   } else if (watchProviders?.buy?.length > 0) {
  //     return watchProviders.buy[0].logo_path;
  //   } else if (watchProviders?.ads?.length > 0) {
  //     return watchProviders.ads[0].logo_path;
  //   } else if (watchProviders?.rent?.length > 0) {
  //     return watchProviders.rent[0].logo_path;
  //   } else {
  //     // Handle case where none of the above are present
  //     return null; // or an appropriate fallback, e.g., a default image URL
  //   }
  // };
  const logo_path = info?.detail?.networks[0]?.logo_path;

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full min-h-[240vh] px-[5%] relative object-"
    >
      {/* Part 1 Nav*/}
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
        <Link
          to="/"
          className="ml-[28%] sm:ml-[83%] hover:text-white text-[18px]"
        >
          Home
        </Link>
      </nav>

      {/* Part 2 */}
      <div className="w-full min-h-[60vh] flex flex-col sm:flex-row relative mx-[7%]">
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
                className="w-[6vh] h-[6vh] sm:h-[6vh] sm:w-[6vw] object-contain"
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
          className="h-[55vh] object-contain shadow-[8px_17px_18px_2px] mt-2 mr-[15%] sm:mr-0"
          src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`}
          alt=""
        />

        {/* Part 2c Details */}
        <div className="content sm:mr-10 sm:w-[67%] sm:ml-[5%]">
          <h1 className="text-white text-2xl sm:text-4xl font-medium sm:font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl font-bold text-zinc-300">
              {info.detail.release_date
                ? `(${info.detail.release_date.split("-")[0]})`
                : ""}
            </small>
          </h1>
          <div className="flex flex-wrap gap-5 sm:gap-5 sm:flex-row text-white items-start sm:items-center gap-x-4 mt-3 mb-5">
            <span
              className="rounded-full text-lg font-semibold 
            bg-yellow-500 text-white w-[5vh] h-[5vh] sm:w-[7vh] sm:h-[7vh] flex justify-center items-center"
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
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-2 mb-1 text-white">Overview</h1>
          <p className="text-white leading-5 w-[89%] sm:w-[85%]">
            {truncateOverview(info.detail.overview)}
          </p>
          {/* {/buttons} */}
          <div className="flex gap-2">
            <Link
              to={`${pathname}/trailer`}
              className="text-black bg-white font-medium px-3 h-[27px] sm:h-[35px] sm:flex items-center 
              justify-center rounded-xl mt-3 hover:bg-zinc-300 "
            >
              <span>
                <i className="ri-play-fill mr-1"></i>
              </span>
              Play Trailer
            </Link>
            <button
              onClick={addToFavorites}
              className="text-white font-medium px-3 h-[27px] sm:h-[35px] flex items-center 
        justify-center rounded-xl mt-3 w-[6vw] ml-6 sm:ml-2"
            >
              <span className="mr-1">
                {isTvFavorited ? <MdFavorite /> : <MdFavoriteBorder />}
              </span>
              {isTvFavorited ? "Unfavorite" : "Favorite"}
            </button>
            <button
              onClick={addToWatchlist}
              className="text-white font-medium px-3 h-[27px] sm:h-[35px] flex items-center 
              justify-center rounded-xl mt-3 ml-3 sm:ml-0"
            >
              <span className="mr-1">
                {isTvWatchlisted ? <CgRemove /> : <MdPlusOne />}
              </span>
              Watchlist
            </button>
          </div>
          {/* cast */}
          {data.credits.cast.length > 0 && (
            <h1 className="text-white text-2xl italic mt-3">Top Cast</h1>
          )}
          <div className="flex flex-wrap gap-3 sm:gap-3">
            {data &&
              data.credits.cast
                .map(
                  (character, i) =>
                    character.profile_path && (
                      <div key={i} className="flex flex-col">
                        <img
                          className="w-[20vw] h-[20vw] sm:w-[130px] sm:h-[160px] bg-red-100 rounded mt-4 object-cover sm:object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt=""
                        />
                        <h1 className="text-white text-sm sm:text-base">
                          {character?.name}
                        </h1>
                        <h1 className="text-zinc-400 text-sm sm:text-base">
                          {character.character
                            .split("/")[0]
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h1>
                      </div>
                    )
                )
                .slice(0, 6)}
          </div>
        </div>
      </div>

      <hr className="border-none h-[1px] bg-blue-400 mt-1" />

      {/* Part 3 Seasons*/}
      <h1 className="mt-3 text-xl sm:text-2xl font-medium sm:font-semibold text-white">
        <span className="text-white mr-2">{data.number_of_seasons}</span>
        {data.number_of_seasons > 1 ? "Seasons" : "Season"}
      </h1>
      {filteredSeasons.length > 0 && (
        <div className="w-[100%] mb-5 p-2 text-white whitespace-nowrap overflow-x-auto">
          {filteredSeasons.map((s, i) => (
            <div key={i} className="inline-block mr-2">
              <img
                className="h-[35vh] object-cover"
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${s.poster_path}`
                    : noimage // Fallback image if poster_path is not available
                }
                alt={s.name || s.title || s.original_name || s.original_title}
              />
            </div>
          ))}
        </div>
      )}

      {/* Part 4 Recommendations and Similar Stuff*/}
      <h1 className=" text-xl sm:text-2xl font-medium sm:font-semibold text-white">
        Recommendations and Similar Stuff
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
