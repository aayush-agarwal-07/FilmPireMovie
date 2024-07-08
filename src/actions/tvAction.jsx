import { loadtv } from "../reducers/tvSlice";
import axios from "../utils/axios";
export { removetv } from "../reducers/tvSlice"

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detailResponse = await axios.get(`/tv/${id}`);
    const externalIdsResponse = await axios.get(`/tv/${id}/external_ids`);
    const similarResponse = await axios.get(`/tv/${id}/similar`);
    const recommendationsResponse = await axios.get(
      `/tv/${id}/recommendations`
    );
    const videosResponse = await axios.get(`/tv/${id}/videos`);
    const watchProvidersResponse = await axios.get(
      `/tv/${id}/watch/providers`
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
    dispatch(loadtv(theUltimateDetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};
