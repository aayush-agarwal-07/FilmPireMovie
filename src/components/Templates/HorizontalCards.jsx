import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "../../assets/no-image.jpg";

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
    <div className="w-full h-[370px] sm:h-[464px] flex flex-nowrap overflow-x-auto pt-3 gap-4 z-1 overflow-hidden pl-[1%]">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}}`}
          key={i}
          className="w-[50vw] sm:w-[13.5vw] h-full bg-transparent flex-shrink-0 transition-transform duration-300 relative hover:z-20"
        >
          <img
            className="sm:h-[400px] w-full object-cover rounded "
            src={
              d.poster_path
                ? `https://image.tmdb.org/t/p/w500/${d.poster_path}`
                : noimage
            }
            alt={d.name || d.title || d.original_name || d.original_title}
          />
          <div className="font-medium text-xl w-[95%] text-white mt-2 line-clamp-1">
            {getTitle(d).slice(0, 43)}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
