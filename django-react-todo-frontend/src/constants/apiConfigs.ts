export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://fast-castle-63660.herokuapp.com/api"
    : "http://localhost:8000/api";
