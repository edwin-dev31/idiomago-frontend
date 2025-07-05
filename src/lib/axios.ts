import axios from "axios"

const javaAPI = axios.create({
  //   baseURL: "https://idiomago-app-84aa3f1a7db9.herokuapp.com/idiomago"
  baseURL: "http://localhost:1731/idiomago"
})

const javaOauth = "http://localhost:1731/idiomago/oauth2/authorization"
export { javaAPI, javaOauth}