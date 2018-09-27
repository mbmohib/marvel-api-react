import React from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import { Link } from 'react-router-dom';
import { addHttps } from '../util/util';

const { Meta } = Card;

const HeroCard = styled(Card)`
    margin-bottom: 40px !important;
`

const Hero = (props) => (
    <Link to={`/hero/${props.hero.id}`}>
        <HeroCard
            hoverable
            cover={
                <img
                    alt={props.hero.name}
                    src={addHttps(`${props.hero.thumbnail.path}/landscape_xlarge.${props.hero.thumbnail.extension}`)}
                />
            }
        >
            <Meta title={props.hero.name}/>
        </HeroCard>
    </Link>
)

export default Hero
