import axios from "axios"

const javaAPI = axios.create({
  baseURL: "https://idiomago-app-84aa3f1a7db9.herokuapp.com/idiomago"

})

const javaOauth = "https://idiomago-app-84aa3f1a7db9.herokuapp.com/idiomago/oauth2/authorization"
export { javaAPI, javaOauth }