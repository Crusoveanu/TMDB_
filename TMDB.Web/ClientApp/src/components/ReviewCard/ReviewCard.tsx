import React from 'react'

import './reviewCard.css'

import {
	Card,
	CardContent,
	CssBaseline,
	Grid,
	Typography,
	makeStyles,
	Container,
	Avatar
} from "@material-ui/core";
import ReadMore from '../readMore/ReadMore';

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
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

const ReviewCard = (props) => {
    const classes = useStyles();
    const date = new Date(props.movieReview.created_at);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDay();
    let year = date.getFullYear();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid>
                        <Card className={classes.card}>
                            <div className={classes.topCard}>
                                <Avatar
                                    alt="Profile Image"
                                    src={props.movieReview.author_details.avatar_path?.substring(1)}
                                    className={classes.avatar}
                                />
                                <div style={{marginLeft: 5}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Review de la {props.movieReview.author}
                                    </Typography>
                                    <Typography gutterBottom component="h3">
                                        Scris la {day} {month} {year}
                                    </Typography>
                                </div>
                            </div>
                            <CardContent className={classes.cardContent}>
                                <ReadMore children={props.movieReview.content} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )
}
export default ReviewCard
