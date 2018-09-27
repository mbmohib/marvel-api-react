import React from 'react';
import { addHttps } from '../util/util'
import { Row, Col, Button, Spin } from 'antd'
import styled from 'styled-components';
import Heading from './Heading';
import media from '../theme/mediaQuery';

const HeroThumbnail = styled.img`
    border: 2px solid #fff;
    border-radius: 5px;
    max-width: 60%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    display: block;

    ${media.tablet`
        max-width: 80%;
        margin-bottom: 0;
    `}

    ${media.laptop`
        max-width: 100%;
        margin-bottom: 0;
    `}
`

const HeroSection = styled.section`
    padding-top: 50px;
    padding-bottom: 50px;
    min-height: 40vh;
`

const Paragraph = styled.p`
    font-size: 1.3rem;
`

const BannarDetailsView = (props) => (
    <HeroSection className="container">
        <Row gutter={32}>
            <Spin tip="Loading..." size="large" spinning={!props.hero}>
                <Col xs={24} sm={8}>
                    {props.hero && (
                        <HeroThumbnail
                            src={`${
                                addHttps(props.hero.thumbnail.path)
                            }/portrait_uncanny.${
                                props.hero.thumbnail.extension
                            }`}
                        />
                    )}
                </Col>
                <Col xs={24} sm={16}>

                    {props.hero && (
                        <Heading color="#fff">
                            {props.hero.name}
                        </Heading>
                    )}

                    {props.hero && (
                        <Paragraph>{props.hero.description}</Paragraph>
                    )}

                    {props.hero && (
                        <Button style={{ color: '#fff' }} href={props.hero.urls[0].url} type="ghost" target="_blank">
                            Visit Resource
                        </Button>
                    )}
                </Col>
            </Spin>
        </Row>
    </HeroSection>
)

export default BannarDetailsView;