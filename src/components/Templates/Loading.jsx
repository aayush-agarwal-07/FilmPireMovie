import React from 'react';
import loading from "../../assets/loader.gif";

const Loading = () => {
  return (
    <div className="bg-black ">
      <img className="mx-auto object-conatin w-screen h-screen scale-[0.6]" src={loading} alt="Loading..." />
    </div>
    
  );
};

export default Loading;
