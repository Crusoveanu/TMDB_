import React, { useState } from 'react'
import styled from '@emotion/styled'
import { containerRowCenterStyle } from '../../constants/styles'
import { undefinedActorAvatar } from '../../constants/constants'
import { Col, Card, Tooltip } from 'antd'

import './actorCard.css'

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

const ActorCard = (props) => {
	const [loaded, setLoaded] = useState(false)
	function showImage() {
		//set default.
		setLoaded(true);
	}
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
						height: 450
					}}
					cover={
						<>
							<img alt="" src={undefinedActorAvatar} style={loaded ? { display: "none" } : { opacity: 0.5 }} />
							<img alt="" src={props.movieActorObject.profile_path ? base_url + props.movieActorObject.profile_path : undefinedActorAvatar}
								onLoadCapture={showImage} style={loaded ? {} : { display: "none" }}
								onError={({ currentTarget }) => {
									currentTarget.onerror = null; // prevents looping
									currentTarget.src = undefinedActorAvatar;
								}}
							/>
						</>
					}
				>
					<Tooltip title="Numele actorului">
						<StyledNameWrapper>{props.movieActorObject.original_name}</StyledNameWrapper>
					</Tooltip>
					<Tooltip title="Caracterul jucat">
						<p className="p__character">{props.movieActorObject.character}</p>
					</Tooltip>
                </Card>
            </Col>
        </div>
    )
}

export default ActorCard
