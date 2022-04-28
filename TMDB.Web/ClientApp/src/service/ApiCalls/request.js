"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_key = process.env.REACT_APP_API_KEY;
var requests = {
    API_URL_movie: "https://api.themoviedb.org/3/movie/",
    API_URL_tranding_movie: "https://api.themoviedb.org/3/trending/movie/",
    fetchPopularMovies: "https://api.themoviedb.org/3/movie/popular?api_key=".concat(api_key, "&language=en-US&page="),
    fetechTopRatedMovies: "https://api.themoviedb.org/3/movie/top_rated?api_key=".concat(api_key, "&language=en-US&page="),
    fetchSearchedMovies: "https://api.themoviedb.org/3/search/movie?api_key=".concat(api_key, "&language=en-US&query="),
};
exports.default = requests;
//# sourceMappingURL=request.js.map