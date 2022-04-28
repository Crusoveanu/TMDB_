import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ERoutes } from '../../entities/enums'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { containerStyles } from '../../constants/styles'
import PieChart from '../../components/PieChart/PieChart'
import { Col } from 'antd'
import ActorCard from '../../components/ActorCard/ActorCard'
import CommentSection from '../../components/CommentSection/CommentSection'
import Swal from 'sweetalert2'
import MoviePlayer from '../../components/MoviePlayer/MoviePlayer'
import ApiFetch from '../../service/ApiCalls/request'

import './movieDetails.css'

//using the wrapper in entire application
const StyledWrapper = styled.div`
  ${containerStyles};
  padding: 30px;
  border: 1px solid #d9d9d9;
  background: white;
  display: flex;
`

const MovieDetails = () => {
    const { movieId }: any = useLocation().state;
    const navigate = useNavigate();

    const [movieDetails, setMovieDetails] = useState<any>();
    const [movieActors, setMovieActors] = useState<any>();

    let banner_logo = "";
    if (movieDetails) {
        banner_logo = "https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,012541,e43101)" + movieDetails.backdrop_path
    }
    //calculate movie runtime
    let calculatedRunTime;
    if (movieDetails) {
        let h = Math.floor(movieDetails.runtime / 60);
        let m = movieDetails.runtime % 60;
        h = h < 10 ? 0 + h : h;
        m = m < 10 ? 0 + m : m;
        calculatedRunTime = `${h}h ${m}m`;
    }

    const StyledHeaderAdvertiseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top: 2px;
  height: auto;
  color: white;
  background-image: url("${banner_logo}");
  background-size: cover;
  background-color: #4d4d4d;
  background-position: center center;
  background-repeat: repeat;
  padding-bottom: 5%;
  padding-top: 5%;
  position: relative;
  height: 550px;
  width: 100%;
  margin: 0 auto;    
  margin-top: -40px;

  .thumb-overlay {
    background: rgba(0,0,0,0.6);
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .header-advertise-content {
    max-width: 1600px;
    padding: 30px;
	width: 100%;
	position: relative;
    margin-bottom: 10%;
  }

  h1 {
    color: #fff;
  }
  h2 {
    color: #fff;
    font-weight: bold;
  }

`
    useEffect(() => {
        async function GetMovieDetails() {
            try {
                const response = await fetch(ApiFetch.API_URL_movie + movieId + "?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                setMovieDetails(data);
            } catch (error: any) {
                console.log(error);
                setMovieDetails(error.message);
            }
        }
        async function GetMovieActors() {
            try {
                const response = await fetch(ApiFetch.API_URL_movie + movieId + "/credits?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                setMovieActors(data);
            } catch (error: any) {
                console.log(error);
                setMovieActors(error.message);
            }
        }
        GetMovieDetails();
        GetMovieActors();
    }, [])

    const handleInfoClickMenu = () => {
        Swal.fire({
            title: 'Neimplementat',
            icon: 'info'
        });
    }
    const base_url = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/";

    return (
        <>
            {movieDetails ? (
                <>
                    <StyledHeaderAdvertiseWrapper>
                        <div style={{ maxWidth: 1600, width: '100%', margin: '0 auto', display: 'flex' }}>
                            <img src={base_url + movieDetails.poster_path} />
                            <div style={{ marginLeft: 20 }}>
                                <h1>{movieDetails.title} ({movieDetails.release_date.substring(0, 4)})</h1>
                                {/*Genre div*/}
                                <div className="div__genre">
                                    <p>{movieDetails.release_date}</p>
                                    <p> ◉ </p>
                                    {movieDetails.genres.map((gen: any, i, arr) => {
                                        if (arr.length - 1 === i) {
                                            // Last one.
                                            return (
                                                <p key={gen.id}>
                                                    {gen.name}
                                                </p>
                                            )
                                        } else {
                                            return (
                                                <p key={gen.id}>
                                                    {gen.name},
                                                </p>
                                            )
                                        }
                                    })}
                                    <p> ◉ </p>
                                    <p> {calculatedRunTime} </p>
                                </div>
                                {/*PieChart div*/}
                                <div style={{ display: 'flex' }}>
                                    <div className="pie__circle__details" onClick={handleInfoClickMenu}>
                                        <PieChart vote={movieDetails.vote_average} />
                                    </div>
                                    <div className="pie__text">
                                        Scorul
                                        <br />
                                        Userilor
                                    </div>
                                </div>
                                <p className="p__tagline"> {movieDetails.tagline} </p>
                                <h2> Overview </h2>
                                <p> {movieDetails.overview} </p>
                            </div>
                        </div>
                    </StyledHeaderAdvertiseWrapper>
                    {movieActors && (
                        <StyledWrapper>
                            <div className="div__left">
                                <h2> Top Distributie </h2>
                                <div className="media">
                                    {movieActors.cast.map((actor: any) => (
                                        <Col onClick={handleInfoClickMenu} span={6} key={actor.cast_id} style={{ marginBottom: 20 }}>
                                            <ActorCard movieActorObject={actor} />
                                        </Col>
                                    ))}
                                </div>
                                {/*Reviews and Comms*/}
                                <div>
                                    <h2> Social </h2>
                                    <CommentSection />
                                    <h2
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`${ERoutes.MOVIEREVIEWS}`, { state: { movieId: movieId, movieObject: movieDetails } })}
                                    >
                                        Citește tot
                                    </h2>
                                </div>
                                {/*Media*/}
                                <div>
                                    <h2> Media </h2>
                                    <MoviePlayer movieId={movieId}/>
                                </div>
                            </div>
                            <div className="div__right">
                                <div>
                                    <p style={{fontWeight: 'bold'}}>Status</p>
                                    <p className="movieDetails__rightDiv">{movieDetails.status}</p>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold' }}>Buget</p>
                                    <p className="movieDetails__rightDiv">${movieDetails.budget.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p style={{fontWeight: 'bold'}}>Venit</p>
                                    <p className="movieDetails__rightDiv">${movieDetails.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </StyledWrapper>)}
                </>
            ) : (
                <p>Se incarca...</p>
            )}
        </>
    );
}

export default MovieDetails;