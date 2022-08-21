import axios from "axios";

import { BASE_URL } from "../constants/apiConfigs";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
