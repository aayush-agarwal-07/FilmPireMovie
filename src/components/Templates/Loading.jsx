import React from 'react';
import loading from "../../assets/loader.gif";

const Loading = () => {
  return (
    <div className="bg-black">
      <img className="mx-auto object-contain w-screen h-screen scale-[1] sm:scale-[0.8]" src={loading} alt="Loading..." />
    </div>
    
  );
};

export default Loading;
