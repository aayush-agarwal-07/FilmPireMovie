import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

const Sidenav = () => {
  const { info } = useSelector((state) => state.tv);

  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-5 relative">
      <img src="https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png" className="w-[12vw]"/>
      <h1 className="text-white text-xl font-semibold mt-10 mb-5">New Feeds</h1>
      <div className="flex flex-col gap-3">
        {List.map((l, i) => (
          <Link
            to={l.to}
            key={i}
            className="flex justify-start text-xl text-white gap-2 py-2 px-3 rounded-lg hover:bg-[#1277D3] duration-300"
          >
            <div>{l.icon}</div>
            <h1 className="font-medium">{l.h}</h1>
          </Link>
        ))}
      </div>
      <hr className="border-none bg-zinc-400 h-[1px] my-5" />
      <Link className="flex justify-start text-lg text-white gap-2 py-2 px-3 rounded-lg duration-300">
        <i className="ri-information-fill"></i>
        <h1 className="font-normal">Website Info.</h1>
      </Link>
      <Link className="flex justify-start text-lg text-white gap-2 py-2 px-3 rounded-lg duration-300">
        <i className="ri-contacts-book-2-fill"></i>{" "}
        {/* Corrected className here */}
        <h1 className="font-normal">Contact us</h1>
      </Link>
    </div>
  );
};

export default Sidenav;
