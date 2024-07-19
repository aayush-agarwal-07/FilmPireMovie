import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const TvDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

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
      ? info.detail.seasons.filter((season) => season.poster_path !== null)
      : [];

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-[208vh] px-[5%] relative object-"
    >
      {/* Part 1 */}
      <nav className="w-[100%] h-[10vh] text-zinc-300 flex items-center gap-6 text-lg mx-[5%]">
        <i
          className="ri-arrow-left-line hover:text-blue-400 text-2xl font-semibold text-zinc-200 mr-5 "
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
        <Link to="/" className="ml-[70%] hover:text-white text-[18px]">
          Home
        </Link>
      </nav>

      {/* Part 2 */}
      <div className="w-full flex mx-[5%]">
        <img
          className="h-[55vh] object-contain shadow-[8px_17px_18px_2px] mt-2"
          src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`}
          alt=""
        />
        <div className="content mr-10 w-[67%] ml-[5%]">
          <h1 className="text-white text-4xl font-black">
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
          <div className="flex text-white items-center gap-x-4 mt-3 mb-5">
            <span
              className="rounded-full text-lg font-semibold 
            bg-yellow-500 text-white w-[7vh] h-[7vh] flex justify-center items-center"
            >
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
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
          <p className="text-white leading-5">
            {truncateOverview(info.detail.overview)}
          </p>
          <Link
            to={`${pathname}/trailer`}
            className="bg-blue-400 text-white font-medium w-[140px] h-[35px] flex items-center 
            justify-center rounded-3xl mt-3"
          >
            <span>
              <i className="ri-play-fill mr-2"></i>
            </span>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 */}
      <div className="mt-5 relative mb-5 mx-[5%]">
        {info.watchproviders &&
          Object.values(info.watchproviders.results).flatMap((provider) =>
            ["flatrate", "ads"].flatMap((type) =>
              provider[type]
                ? provider[type].map((w) => (
                    <img
                      className="h-[7vh] w-[7vw] object-contain rounded-lg absolute left-[-2%] z-10"
                      src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                      alt=""
                      key={w.provider_id}
                    />
                  ))
                : []
            )
          )}
        <h3 className="text-white pl-[5%] pt-[1%] font-medium">
          Available Platform
        </h3>
      </div>

      {/* Part 4 */}
      <hr className="border-none h-[1px] bg-zinc-400 mt-1" />

      <h1 className="mt-3 text-2xl font-semibold text-white">Seasons</h1>
      {filteredSeasons.length > 0 && (
        <div className="w-[100%] mb-5 p-2 text-white whitespace-nowrap overflow-x-auto">
          {filteredSeasons.map((s, i) => (
            <div key={i} className="inline-block mr-2">
              <img
                className="h-[40vh] object-cover"
                src={`https://image.tmdb.org/t/p/w500/${s.poster_path}`}
                alt={s.name || s.title || s.original_name || s.original_title}
              />
            </div>
          ))}
        </div>
      )}

      <h1 className=" text-2xl font-semibold text-white">
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
