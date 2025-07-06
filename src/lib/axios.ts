import axios from "axios"

const javaAPI = axios.create({
  baseURL: "http://localhost:1731/idiomago"

})

const javaOauth = "http://localhost:1731/idiomago/oauth2/authorization"
export { javaAPI, javaOauth }