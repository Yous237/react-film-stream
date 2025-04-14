import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjM1NTcwNzIyYmM1NDVhNDE2ZGNjZDQzYTNjMGU5MiIsIm5iZiI6MTY0NDU5MjY4Mi40MTI5OTk5LCJzdWIiOiI2MjA2N2UyYTI5NzMzODAwYjk1MjI1YjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zg9sJpWiwfG7jqPUtnSQf_9AvOZggj81omrwciw5YEo",
    "Content-Type": "application/json",
  },
  params: {
    language: "fr-FR",
  },
});

export default movieApi;
