import React from 'react'
import {
    Card,
    CardContent,
    CssBaseline,
    Grid,
    Typography,
    makeStyles,
    Container,
} from "@material-ui/core";
import { undefinedMovieAvatar } from '../../constants/constants'

import './searchedMovieCard.css'

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    topCard: {
        display: 'flex',
        marginLeft: 30,
    },
    cardContent: {
        flexGrow: 1
    },
    movieBanner: {
        width: 94,
        height: 153,
    }
}));

const SearchedMovieCard = (props) => {
    const classes = useStyles();
    const date = new Date(props.movieObject.release_date);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDay();
    let year = date.getFullYear();
    const base_url = "https://www.themoviedb.org/t/p/w94_and_h141_bestv2";

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid>
                        <Card className={classes.card}>
                            <div className={classes.topCard}>
                                <img
                                    alt="Profile Image"
                                    src={props.movieObject.poster_path ? base_url + props.movieObject.poster_path : undefinedMovieAvatar}
                                    className={classes.movieBanner}
                                />
                                <div style={{ marginLeft: 5 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {props.movieObject.original_title}
                                    </Typography>
                                    <Typography gutterBottom component="h3">
                                        {day} {month} {year}
                                    </Typography>
                                    <CardContent className={classes.cardContent}>
                                        <Typography>
                                            {props.movieObject.overview}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )
}
export default SearchedMovieCard
