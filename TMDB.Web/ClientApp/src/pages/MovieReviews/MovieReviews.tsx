import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { containerStyles } from '../../constants/styles'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCaretLeft } from 'react-icons/ai'
import { Tabs } from 'antd';
import ApiFetch from '../../service/ApiCalls/request'

import ReviewCard from '../../components/ReviewCard/ReviewCard'
import LocalReview from '../../components/LocalReview/LocalReview'
import LocalReviewCard from '../../components/LocalReviewCard/LocalReviewCard'

import './movieReviews.css'

//using the wrapper in entire application
const StyledWrapper = styled.div`
  ${containerStyles};
  padding: 30px;
  border: 1px solid #d9d9d9;
  background: white;
`
const { TabPane } = Tabs;

const MovieReviews = () => {
    const navigate = useNavigate();
    const { movieId }: any = useLocation().state;
    const { movieObject }: any = useLocation().state;

    const [movieReviews, setMovieReviews] = useState<any>();
    const [movieLocalReviews, setMovieLocalReviews] = useState<any>();
    useEffect(() => {
        async function GetMovieReviews() {
            try {
                const response = await fetch(ApiFetch.API_URL_movie + movieId + "/reviews?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                setMovieReviews(data.results);
            } catch (error: any) {
                console.log(error);
                setMovieReviews(error.message);
            }
        }

        async function GetMovieLocalReviews() {
            const requestOptions = {
                method: 'GET',
            };
            try {
                const response = await fetch('comment/GetCommentsByMovieId?movieId=' + movieId, requestOptions)
                const data = await response.json()
                if (data.message === "success") {
                    setMovieLocalReviews(data);
                }
            } catch (error: any) {
                console.log(error);
                setMovieLocalReviews(error.message);
            }
        }
        GetMovieLocalReviews();
        GetMovieReviews();
    }, [])

    return (
        <StyledWrapper>
            <h2> {movieObject.original_title}</h2>
            {/*BackButton*/}
            <div style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                <AiOutlineCaretLeft style={{ cursor: 'pointer' }} />
                <span>Înapoi</span>
            </div>
            {/*LocalReview*/}
            <LocalReview movieId={movieId}/>
            <Tabs defaultActiveKey="1">
                <TabPane tab="API" key="1">
                    {movieReviews ? (
                        <>
                            {movieReviews.map((review: any) => (
                                <ReviewCard key={review.id}
                                    movieReview={review}
                                />
                            ))}
                        </>
                    ) : (
                        <p>Se incarca...</p>
                    )}
                </TabPane>
                <TabPane tab="LOCAL" key="2">
                    {movieLocalReviews ? (
                        <>
                            {movieLocalReviews.comments.map((review: any) => (
                                <LocalReviewCard key={review.id}
                                    movieReview={review}
                                />
                            ))}
                        </>
                    ) : (
                        <p>Nu sunt comentarii...</p>
                    )}
                </TabPane>
            </Tabs>
        </StyledWrapper>
    );
}

export default MovieReviews;