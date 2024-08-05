import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../reducers/currentGenreOrCategory";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";

const List = [
  {
    icon: <i className="ri-fire-fill"></i>,
    h: "Trending",
    to: "/trending",
  },
  {
    icon: <i className="ri-bar-chart-fill"></i>,
    h: "Popular",
    to: "/popular",
  },
  {
    icon: <i className="ri-tv-fill"></i>,
    h: "Movies",
    to: "/movie",
  },
  {
    icon: <i className="ri-tv-fill"></i>,
    h: "Tv Shows",
    to: "/tv",
  },
];

const Sidenav = ({ isVisible, toggleVisibility, width }) => {
  const { info } = useSelector((state) => state.tv);
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isLoading, isError } = useGetGenresQuery();
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#1F1E24] border-r-2 border-zinc-100 p-2 transition-transform transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 z-[1001]`}
      style={{ width: `${width}px` }}
    >
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png"
          className="w-[60vw] sm:w-[13vw]"
        />
      </Link>
      <h1 className="text-white text-2xl mt-10 mb-5 font-semibold">
        New Feeds
      </h1>
      <div className="flex flex-col gap-1">
        {List.map((l, i) => (
          <Link
            to={l.to}
            key={i}
            className="flex justify-start text-xl text-white gap-4 p-2 rounded hover:bg-gray-200 group w-[250px]"
          >
            <div className="group-hover:text-zinc-900">{l.icon}</div>
            <h1 className="group-hover:text-gray-900">{l.h}</h1>
          </Link>
        ))}
      </div>
      <hr className="border-none bg-zinc-400 h-[1px] my-5" />
      <div className="mt-5">
        <div className="text-2xl font-semibold mb-4 text-white">Genres</div>

        {isLoading ? (
          <div>Loading genres...</div>
        ) : isError ? (
          <div>Error loading genres</div>
        ) : (
          data &&
          data.genres &&
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              to={`/genre/${name.toLowerCase()}`}
              className="flex items-center " // Added `group` class
            >
              <div
                onClick={() => dispatch(selectGenreOrCategory(id))}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded w-[360px] group"
              >
                <img
                  src={genreIcons[name.toLowerCase()]}
                  className="w-[25px] h-[25px] object-contain filter"
                  alt={name}
                />
                <span className="ml-4 text-gray-100 group-hover:text-gray-900 text-xl">
                  {name}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
      <hr className="border-none bg-zinc-400 h-[1px] my-5" />
      <Link className="flex justify-start text-lg text-white gap-2 py-2 px-3">
        <i className="ri-information-fill"></i>
        <h1 className="font-normal">Website Info.</h1>
      </Link>
      <Link className="flex justify-start text-lg text-white gap-2 py-2 px-3">
        <i className="ri-contacts-book-2-fill"></i>{" "}
        <h1 className="font-normal">Contact us</h1>
      </Link>
    </div>
  );
};

export default Sidenav;
