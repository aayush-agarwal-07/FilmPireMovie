import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "../../assets/no-image.jpg"

const HorizontalCards = ({ data }) => {
  

  // Function to get title before colon or return an empty string if not found
  const getTitle = (item) => {
    if (item.name) {
      return item.name.split(":")[0].trim();
    } else if (item.title) {
      return item.title.split(":")[0].trim();
    } else if (item.original_name) {
      return item.original_name.split(":")[0].trim();
    } else if (item.original_title) {
      return item.original_title.split(":")[0].trim();
    }
    return ""; // Default case if none of the conditions match
  };

  return (

      <div className="w-full h-[46vh] flex flex-nowrap overflow-x-auto pt-3 gap-2 rounded z-1 overflow-hidden">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}}`}
            key={i}
            className="w-[18%] h-full bg-purple-100 hover:bg-purple-300 rounded-xl flex-shrink-0 p-2 transition-transform duration-300 relative hover:z-20"
          >
            <img
              className="h-[20vh] w-full object-cover"
              src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/w500/${
                d.backdrop_path || d.poster_path
              }` : noimage}
              alt={d.name || d.title || d.original_name || d.original_title}
            />
            <div className="">{getTitle(d)}</div>
            <p className="text-xs text-zinc-600 m-1">
              {d.overview.slice(0, 80)}....
            </p>
          </Link>
        ))}
      </div>
  );
};

export default HorizontalCards;
