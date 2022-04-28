import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../entities/enums'
import Switch from "@material-ui/core/Switch";
import styled from '@emotion/styled'
import { containerStyles } from '../../constants/styles'
import './home.css'
import { Col } from 'antd'
import MovieCard from '../../components/MovieCard/MovieCard';
import SearchBar from '../../components/SearchBar/SearchBar'
import ApiFetch from '../../service/ApiCalls/request'

//using the wrapper in entire application
const StyledWrapper = styled.div`
  ${containerStyles};
  padding: 30px;
  border: 1px solid #d9d9d9;
  background: white;
`
const StyledHeaderAdvertiseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top: 2px;
  height: auto;
  color: white;
  background-image: url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg");
  background-size: cover;
  background-color: #4d4d4d;
  background-position: center center;
  background-repeat: repeat;
  padding-bottom: 5%;
  padding-top: 5%;
  position: relative;
  height: 400px;
  max-width: 1600px;
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
const HomePage = () => {
    const navigate = useNavigate();

    const [popularMovies, setPopularMovies] = useState([]);
    useEffect(() => {
        async function GetPopularMovies() {
            try {
                const response = await fetch(ApiFetch.fetchPopularMovies);
                const data = await response.json()
                setPopularMovies(data.results);
            } catch (error : any) {
                console.log(error);
                setPopularMovies(error.message);
            }
        }
        GetPopularMovies();
    }, [])

    const [dayTrand, setDayTrand] = useState(true);
    const [trandMovies, setTrandMovies] = useState([]);
    useEffect(() => {
        async function GetTrandMovies() {
            try {
                const response = await fetch(ApiFetch.API_URL_tranding_movie + (dayTrand ? "day" : "week") + "?api_key=" + process.env.REACT_APP_API_KEY);
                const data = await response.json()
                setTrandMovies(data.results);
            } catch (error: any) {
                console.log(error);
                setTrandMovies(error.message);
            }
        }
        GetTrandMovies();
    }, [dayTrand])

    const handleToggleOnChange = () => {
        setDayTrand(!dayTrand);
    }

    return (
        <>
            <StyledHeaderAdvertiseWrapper>
                <div className="thumb-overlay"></div>
                <div className="header-advertise-content">
                    <h1>
                        Welcome.
                    </h1>
                    <h2>
                        Millions of movies, TV shows and people to discover. Explore now.
                    </h2>
                    <div>
                        <SearchBar placeholder="Caută filme, seriale, persoane ..." data={popularMovies} />
                    </div>
                </div>
            </StyledHeaderAdvertiseWrapper>
            <StyledWrapper>

                {/*Popular movies*/}
                <div>
                    <h2>Filme populare</h2>
                    <div className="media">
                        {popularMovies && popularMovies.map((movie: any) => (
                            <Col onClick={() => navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: movie.id } })}
                                span={4} key={movie.id} style={{ marginBottom: 20 }}>
                                <MovieCard
                                    movieObject={movie}
                                />
                            </Col>
                        ))}
                    </div>
                </div>

                {/*Trend movies*/}
                <div className="trend__movies">
                    <h2>În trend</h2>
                    <div className="switch__toggle">
                        <p>Azi</p>
                        <Switch onChange={handleToggleOnChange} color="primary" />
                        <p>Săptămâna aceasta</p>
                    </div>
                    <div className="media">
                        {trandMovies && trandMovies.map((movie: any) => (
                            <Col onClick={() => navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: movie.id } })}
                                span={4} key={movie.id} style={{ marginBottom: 20 }}>
                                <MovieCard
                                    movieObject={movie}
                                />
                            </Col>
                        ))}
                    </div>
                </div>
            </StyledWrapper>
        </>
    )
}

export default HomePage
