import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';

const HeroSection = styled.section`
    padding-bottom: 50px;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BannarHomeView = () => (
    <HeroSection>
        <Heading color="#fff" center>
            Know your Favorite Marvel HEROS!
        </Heading>
    </HeroSection>
)

export default BannarHomeView;