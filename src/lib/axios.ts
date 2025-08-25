import axios from "axios";

const javaAPI = axios.create({
  baseURL: "https://partial-sabine-idiomago-c4716f6f.koyeb.app/idiomago",
});

const javaOauth =
  "https://partial-sabine-idiomago-c4716f6f.koyeb.app/idiomago/oauth2/authorization";
export { javaAPI, javaOauth };
