import axios from "axios";
const BACKEND_URL = "https://idiomago-api.dev-ka.duckdns.org/idiomago";

const javaAPI = axios.create({
  baseURL: BACKEND_URL,
});

const javaOauth = `${BACKEND_URL}/oauth2/authorization`;
export { javaAPI, javaOauth };
