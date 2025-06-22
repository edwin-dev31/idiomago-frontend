import axios from "axios"

const javaAPI = axios.create({
  baseURL: "http://localhost:1731/idiomago",
})


export { javaAPI}