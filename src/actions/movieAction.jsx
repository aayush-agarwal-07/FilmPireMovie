import { loadmovie } from "../reducers/movieSlice";
import axios from "../utils/axios";
export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detailResponse = await axios.get(`/movie/${id}`);
    const externalIdsResponse = await axios.get(`/movie/${id}/external_ids`);
    const similarResponse = await axios.get(`/movie/${id}/similar`);
    const recommendationsResponse = await axios.get(
      `/movie/${id}/recommendations`
    );
    const videosResponse = await axios.get(`/movie/${id}/videos`);
    const watchProvidersResponse = await axios.get(
      `/movie/${id}/watch/providers`
    );

    // Extracting necessary data
    const theUltimateDetails = {
      detail: detailResponse.data,
      external_ids: externalIdsResponse.data,
      similar: similarResponse.data.results,
      recommendations: recommendationsResponse.data.results,
      videos: videosResponse.data.results.filter((m) => m.type === "Trailer"),
      watchproviders: watchProvidersResponse.data,
    };
    dispatch(loadmovie(theUltimateDetails));
    console.log(theUltimateDetails);
  } catch (error) {
    console.log("Error: ", error);
  }
};
