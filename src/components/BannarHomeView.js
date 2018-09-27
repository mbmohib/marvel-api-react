import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';

const HeroSection = styled.section`
    padding-top: 50px;
    padding-bottom: 50px;
    min-height: 40vh;
`

const BannarHomeView = () => (
    <HeroSection>
        <Heading color="#fff" center>
            Know your Favorite Marvel HEROS!
        </Heading>
    </HeroSection>
)

export default BannarHomeView;