const initialState = {
  sort: { name: "Popularity Descending", value: "popularity.desc" },
  country: { name: "India", value: "IN" },
  WatchProviders: "",
  releaseDateGte: "",
  releaseDateLte: "",
  genres: "",
  certifications: "",
  voteAverageGte: "",
  voteAverageLte: "",
  voteCountGte: "",
  runtimeGte: "",
  runtimeLte: "",
  userDetails: "",
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "UPDATE_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "UPDATE_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "UPDATE_WATCH_PROVIDERS":
      return {
        ...state,
        WatchProviders: action.payload,
      };

    case "UPDATE_RELEASE_DATE_GTE":
      return {
        ...state,
        releaseDateGte: action.payload,
      };
    case "UPDATE_RELEASE_DATE_LTE":
      return {
        ...state,
        releaseDateLte: action.payload,
      };
    case "UPDATE_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "UPDATE_CERTIFICATION":
      return {
        ...state,
        certifications: action.payload,
      };
    case "UPDATE_VOTE_AVERAGE":
      return {
        ...state,
        voteAverageGte: action.payload[0] / 10,
        voteAverageLte: action.payload[1] / 10,
      };
    case "UPDATE_VOTE_COUNT":
      return {
        ...state,
        voteCountGte: action.payload,
      };
    case "UPDATE_RUNTIME":
      return {
        ...state,
        runtimeGte: action.payload[0],
        runtimeLte: action.payload[1],
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_USERDETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default exampleReducer;
