import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled'
import { containerStyles } from '../../constants/styles'
import Pagination from '@material-ui/lab/Pagination';
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../entities/enums'
import SearchedMovieCard from '../../components/SearchedMovieCard/SearchedMovieCard';
import ApiFetch from '../../service/ApiCalls/request'

import './searchedMovies.css';

//using the wrapper in entire application
const StyledWrapper = styled.div`
  ${containerStyles};
  padding: 30px;
  border: 1px solid #d9d9d9;
  background: white;
`
const SearchedMovies = () => {
    const navigate = useNavigate();
    const query = useParams().searchedWord;

    const [pageNumber, setPageNumber] = useState(1);
    const [searchedMovies, setSearchedMovies] = useState<any>();
    useEffect(() => {
        async function GetSearchedMovies() {
            try {
                const response = await fetch(ApiFetch.fetchSearchedMovies + query + "&page=" + pageNumber + "&include_adult=false");
                const data = await response.json()
                setSearchedMovies(data);
            } catch (error: any) {
                console.log(error);
                setSearchedMovies(error.message);
            }
        }
        GetSearchedMovies();
    }, [pageNumber])

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        //when the page is changed, scroll top
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <StyledWrapper>
            <h1> Căutare film după: {query} </h1>
            {searchedMovies ? (
                <div>
                    {searchedMovies.results.length >= 1 ? (
                        <>
                            {searchedMovies.results.map((movie: any) => (
                                <div
                                    style={{ cursor: 'pointer' }}
                                    key={movie.id}
                                    onClick={() => navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: movie.id } })}
                                >
                                    <SearchedMovieCard
                                        movieObject={movie}
                                    />
                                </div>
                            ))}
                            <div className="div__pagination">
                                <Pagination onChange={handlePaginationChange} count={searchedMovies?.total_pages} color="primary" />
                            </div>
                        </>
                    ) : (<p> Nu s-au găsit filme în urma căutării.</p>)}
                </div>) :
                (<p> Nu s-au găsit filme în urma căutării.</p>)}
        </StyledWrapper>
    );
}

export default SearchedMovies;