import React from 'react'
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom'
import styled from '@emotion/styled'
import { ERoutes } from './entities/enums'
import Header from './components/header'
import Footer from './components/footer'
import HomePage from './pages/home'

import PopularMovies from './pages/PopularMovies/PopularMovies'
import TopRatedMovies from './pages/TopRatedMovies/TopRatedMovies'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import MovieReviews from './pages/MovieReviews/MovieReviews'

import SearchedMovies from './pages/SearchedMovies/SearchedMovies'

import LoginPage from './pages/login'
import RegisterPage from './pages/register'


const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
`
const StyledContent = styled.main`
  background-color: #f7f7f7;
  min-height: calc(100vh - 196px);
  padding: 40px 0;
`

function App() {
    return (
        <BrowserRouter>
            <StyledWrapper>
                <Header />
                <StyledContent>
                    <Routes>
                        <Route path={ERoutes.HOME} element={<HomePage />} />
                        <Route path={ERoutes.LOGIN} element={<LoginPage />} />
                        <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
                        {/*MOVIES paths*/}
                        <Route path={ERoutes.POPULARMOVIES} element={<PopularMovies />} />
                        <Route path={ERoutes.TOPRATEDMOVIES} element={<TopRatedMovies />} />
                        <Route path={ERoutes.MOVIEDETAILS} element={<MovieDetails />} />
                        <Route path={ERoutes.MOVIEREVIEWS} element={<MovieReviews />} />
                        {/*nav link for search*/}
                        <Route path={`${ERoutes.SEARCHMOVIES}/:searchedWord`} element={<SearchedMovies />} />
                    </Routes>
                </StyledContent>
                <Footer />
            </StyledWrapper>
		</BrowserRouter>
	)
}

export default App