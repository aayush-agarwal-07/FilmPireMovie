import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzVjNGI1NWJkOTVmZGYwOGQ0NTZmM2I3Yzk0Y2U2NCIsIm5iZiI6MTcxOTU1NDcxOS42OTIwNTgsInN1YiI6IjY2N2U1MTMyZmViOTE0MTM5Y2RhOTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ze_H5LFWiT-UgM2_DG74d1aY7-vcdcmdgq1a37dr_IU",
  },
});

export default instance;
