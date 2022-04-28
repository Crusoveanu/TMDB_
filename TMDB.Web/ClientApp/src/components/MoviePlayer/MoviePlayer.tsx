import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ApiFetch from '../../service/ApiCalls/request'

import './moviePlayer.css'

const MoviePlayer = (props) => {
    const [movieVideos, setMovieVideos] = useState<any>([]);
    useEffect(() => {
        async function GetMovieVideos() {
            try {
                const response = await fetch(ApiFetch.API_URL_movie + props.movieId + "/videos?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                setMovieVideos(data.results);
            } catch (error: any) {
                console.log(error);
                setMovieVideos(error.message);
            }
        }
        GetMovieVideos();
    }, [])
    const base_url = "https://www.youtube.com/watch?v=";

    return (
        <>
            {movieVideos.length >= 1 ? (<div>
                <ReactPlayer controls url={base_url + movieVideos[0].key} />
            </div>) : (<p> Nu sunt trailere disponibile. </p>)
            }
        </>
    )
}
export default MoviePlayer
