import React from 'react'

const RatedCards = ({ title, data }) => {
  return (
       <div>
      <h5 className="text-xl font-semibold mb-4">{title}</h5>
      <div className="flex flex-wrap">
        {data?.results.map((movie, i) => (
          <Linkk to={`/movie/${movie.id}`} key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h6 className="text-lg font-medium text-white mb-2">{movie.title}</h6>
              <p className="text-gray-400">{movie.release_date}</p>
            </div>
          </Linkk>
        ))}
      </div>
    </div>
  )
}

export default RatedCards