import React from 'react'
import styled from '@emotion/styled'
import { containerRowCenterStyle } from '../../constants/styles'
import { Col, Card, Tooltip } from 'antd'
import 'react-circular-progressbar/dist/styles.css';
import PieChart from '../PieChart/PieChart'

import './movieCard.css'

const StyledNameWrapper = styled.div`
	${containerRowCenterStyle};
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
	min-height: 40px;
	text-align: center;
	align-items: flex-start;
	height: 40px;	
	overflow: hidden;
	word-break: break-word;
	white-space: normal;
	text-overflow: ellipsis;
`

const MovieCard = (props) => {
	const base_url = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

    return (
        <div>
			<Col>			
                <Card
					hoverable
					style={{
						width: 250,
						borderRadius: '10px',
						position: 'relative',
					}}
					cover={
						<>
							<img alt="" src={base_url + props.movieObject.poster_path}/>
						</>
					}
				>
                    <div className="pie__circle">
						<PieChart vote={props.movieObject.vote_average}/>
                    </div>
					<Tooltip title="Titlul filmului">
						<StyledNameWrapper>{props.movieObject.title}</StyledNameWrapper>
					</Tooltip>
					<Tooltip title="Anul aparitiei">
						<p className="p__release-year">{props.movieObject.release_date}</p>
					</Tooltip>
                </Card>
            </Col>
        </div>
    )
}

export default MovieCard
