import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReviewCard from '../ReviewCard/ReviewCard';
import ApiFetch from '../../service/ApiCalls/request'

import './commentSection.css'


const CommentSection = (props) => {
    const [movieReview, setMovieReview] = useState<any>();
    const { movieId }: any = useLocation().state;

    useEffect(() => {
        async function GetMovieReview() {
            try {
                const response = await fetch(ApiFetch.API_URL_movie + movieId + "/reviews?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                //take only one review to be diplayed in details
                setMovieReview(data.results[0]);
            } catch (error: any) {
                console.log(error);
                setMovieReview(error.message);
            }
        }
        GetMovieReview();
    }, [])

    return (
        <>
            {movieReview && (
                <div>
                    <ReviewCard movieReview={movieReview} />
                </div>
            )}
        </>
    )
}

export default CommentSection
