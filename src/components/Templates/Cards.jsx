import { useEffect, useState } from "react";
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

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full min-h-full bg-[#1F1E24] p-1 sm:p-[3%] flex flex-wrap justify-center items-center gap-2 sm:gap-4 ">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className="card w-[180px] sm:w-[300px] h-[295px] sm:h-[490px] shadow-[8px_17px_18px_2px] bg-[#1F1E24] p-2 sm:p-[1%] transition duration-300 transform hover:scale-[1.10] hover:z-[999] rounded-3xl group"
        >
          <img
            className="h-[260px] sm:h-[620px] w-full object-contain -mt-[5px] rounded-2xl sm:-mt-[85px]"
            src={
              d.poster_path || d.profile_path
                ? `https://image.tmdb.org/t/p/w500/${
                    d.poster_path || d.profile_path
                  }`
                : { noimage }
            }
            alt={d.name || d.title || d.original_name || d.original_title}
          />
          <h1 className="text-lg text-white font-semibold text-start group-hover:text-black leading-5 mt-0 sm:-mt-[95px] line-clamp-1">
            {(d.name || d.title || d.original_name || d.original_title).slice(
              0,
              48
            )}
          </h1>
          {d.vote_average > 0 && (
            <div
              className="absolute right-[80%] sm:right-[87%] bottom-[25%] rounded-full text-lg font-semibold 
            bg-yellow-600 text-white w-[5vh] h-[5vh] sm:w-[7vh] sm:h-[7vh] flex justify-center items-center"
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
