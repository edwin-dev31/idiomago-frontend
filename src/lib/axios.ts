import axios from "axios";

const javaAPI = axios.create({
  baseURL: "http://partial-sabine-idiomago-c4716f6f.koyeb.app/idiomago",
});

const javaOauth =
  "http://partial-sabine-idiomago-c4716f6f.koyeb.app/idiomago/oauth2/authorization";
export { javaAPI, javaOauth };
