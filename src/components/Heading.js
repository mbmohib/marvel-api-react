import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
    font-size: ${props => props.size || '4rem'};
    color: ${props => props.color || 'rgba(0, 0, 0, 0.85)'};
    text-align: ${props => props.center ? 'center' : 'justify'};
    font-family: 'Poiret One', cursive;
    font-weight: 300;
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