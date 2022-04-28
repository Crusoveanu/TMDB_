import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../entities/enums'
import { containerStyles } from '../../constants/styles'
import Pagination from '@material-ui/lab/Pagination';
import { Row, Col } from 'antd'
import MovieCard from '../../components/MovieCard/MovieCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ApiFetch from '../../service/ApiCalls/request'

import './topRatedMovies.css'

//using the wrapper in entire application
const StyledWrapper = styled.div`
  ${containerStyles};
  padding: 30px;
  border: 1px solid #d9d9d9;
  background: white;
`

const TopRatedMovies = () => {
    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState(1);
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        //when the page is changed, scroll top
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    useEffect(() => {
        async function GetPopularMovies() {
            try {
                const response = await fetch(ApiFetch.fetechTopRatedMovies + pageNumber);
                const data = await response.json()
                setTopRatedMovies(data.results);
            } catch (error: any) {
                console.log(error);
                setTopRatedMovies(error.message);
            }
        }
        GetPopularMovies();
    }, [pageNumber])

    const onChangeMovieTitle = (event, selectedMovie) => {
        console.log(event)
        if (selectedMovie) {
            navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: selectedMovie.id } })
        }
    }
    return (
        <StyledWrapper>
            <h1> Filmele cele mai votate </h1>
            <div className="div__filter">
                <Autocomplete
                    id="size-small-outlined-multi"
                    size="small"
                    options={topRatedMovies}
                    getOptionLabel={(option:any) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="Titlul filmului" placeholder="Cauta" />
                    )}
                    onChange={(event, selectedOptions) => onChangeMovieTitle(event, selectedOptions)}
                />
            </div>
            <div>
                <Row gutter={[12, 12]}>
                    {topRatedMovies && topRatedMovies.map((movie: any) => (
                        <Col span={4} key={movie.id} style={{ marginBottom: 20, marginRight: 40 }}
                            onClick={() => navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: movie.id } })}
                        >
                            <MovieCard
                                movieObject={movie}
                            />
                        </Col>
                    ))}
                </Row>
                <div className="div__pagination">
                    <Pagination onChange={handlePaginationChange} count={10} color="primary" />
                </div>
            </div>
        </StyledWrapper>
    );
}

export default TopRatedMovies;