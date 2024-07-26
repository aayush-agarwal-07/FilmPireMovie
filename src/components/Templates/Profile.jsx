import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../reducers/auth';

import { MdExitToApp } from 'react-icons/md';
import RatedCards from './RatedCards';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={logout}
        >
          Logout &nbsp; <MdExitToApp />
        </button>
      </div>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <h2 className="text-xl">Add favorites or watchlist some movies to see them here!</h2>
      ) : (
        <div>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </div>
      )}
    </div>
  );
};

export default Profile;
