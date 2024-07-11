import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/no-image.jpg";
import Loading from "./Loading";

const Cards = ({ data, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Set loading timeout to 1 second (1000 milliseconds)

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []); // Empty dependency array ensures this effect runs only once

  const getTitle = (item) => {
    // Check for name and split it, if available
    if (item.name) {
      return item.name.split(":")[0].trim();
    }
    // Check for title and split it, if available
    else if (item.title) {
      return item.title.split(":")[0].trim();
    }
    // Check for original_name and split it, if available
    else if (item.original_name) {
      return item.original_name.split(":")[0].trim();
    }
    // Check for original_title and split it, if available
    else if (item.original_title) {
      return item.original_title.split(":")[0].trim();
    }
    // Default case if none of the conditions match
    return "";
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full min-h-full bg-[#1F1E24] p-[3%] flex flex-wrap justify-center items-center gap-4 ">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className="card relative w-[17%] top-[10%] shadow-[8px_17px_18px_2px] bg-purple-100 hover:bg-purple-300 p-[1%] transition duration-300 transform hover:scale-[1.10] rounded"
        >
          <img
            className="h-[50vh] w-full object-contain "
            src={
              d.poster_path || d.profile_path
                ? `https://image.tmdb.org/t/p/w500/${
                    d.poster_path || d.profile_path
                  }`
                : noimage
            }
            alt={d.name || d.title || d.original_name || d.original_title}
          />
          <h1 className="text-lg text-black font-semibold w-[10vw] h-[3vh]">
            {d.name || d.title || d.original_name || d.original_title}
          </h1>
          {d.vote_average > 0 && (
            <div
              className="absolute right-[87%] bottom-[25%] rounded-full text-lg font-semibold 
            bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center"
            >
              {(d.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
