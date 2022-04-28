const api_key = process.env.REACT_APP_API_KEY
const requests = {
    API_URL_movie: `https://api.themoviedb.org/3/movie/`,
    API_URL_tranding_movie: `https://api.themoviedb.org/3/trending/movie/`,
    fetchPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=`,
    fetechTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=`,
    fetchSearchedMovies: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=`,
}
export default requests;