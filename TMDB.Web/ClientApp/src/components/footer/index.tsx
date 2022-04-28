import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './Footer.css'

const Footer = () => {
    return (
        <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor="rgba(3,37,65)">
            <Container maxWidth="lg">
                <div className="footer__logo">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
                </div>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box className="FooterP"> THE BASICS </Box>
                        <Box color="white"> About TMDB </Box>
                        <Box color="white"> Contact Us </Box>
                        <Box color="white"> Support Forums </Box>
                        <Box color="white"> API </Box>
                        <Box color="white"> System Status </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className="FooterP"> GET INVOLVED </Box>
                        <Box color="white"> Contribution Bible </Box>
                        <Box color="white"> Add New Movie </Box>
                        <Box color="white"> Add New TV Show </Box>
                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className="FooterP"> COMMUNITY </Box>
                        <Box color="white"> Guidelines </Box>
                        <Box color="white"> Discussions </Box>
                        <Box color="white"> Leaderboard </Box>
                        <Box color="white"> Twitter </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className="FooterP"> LEGAL </Box>
                        <Box color="white"> Terms of Use </Box>
                        <Box color="white"> API Terms of Use </Box>
                        <Box color="white"> Privacy Policy </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }} color="#bababa">
                    Copyright © Crusoveanu Mhai Build 229638e (3652)
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
