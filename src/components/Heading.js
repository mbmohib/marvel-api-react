import React from 'react';
import styled from 'styled-components';
import media from '../theme/mediaQuery';

const Heading = styled.h2`
    font-size: ${props => props.size || '2rem'};
    color: ${props => props.color || 'rgba(0, 0, 0, 0.85)'};
    text-align: ${props => props.center ? 'center' : 'justify'};
    font-family: 'Poiret One', cursive;
    font-weight: 300;

    ${media.tablet`
        font-size: ${props => props.size || '3rem'};
    `}

    ${media.laptop`
        font-size: ${props => props.size || '4rem'};
    `}
`;

export default (props) => (
    <Heading 
        center={props.center}
        color={props.color}
        size={props.size}
        >
        {props.children}
    </Heading>
)