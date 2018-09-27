import React from 'react';
import { addHttps } from '../util/util'
import { Row, Col, Skeleton, Button } from 'antd'
import styled from 'styled-components';
import Heading from './Heading';

const HeroThumbnail = styled.img`
    border: 2px solid #fff;
    border-radius: 5px;
    max-width: 100%;
    height: auto;
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
        <Row>
            <Col span={10}>
                <Skeleton 
                    loading={!props.hero} 
                    paragraph={false} title={false} 
                    avatar={{ shape: 'square', size: 'large'}}
                    active>

                    {props.hero && (
                        <HeroThumbnail
                            src={`${
                                addHttps(props.hero.thumbnail.path)
                            }/portrait_uncanny.${
                                props.hero.thumbnail.extension
                            }`}
                        />
                    )}
                </Skeleton>
            </Col>
            <Col span={14}>
                <Skeleton 
                    loading={!props.hero} 
                    title={{ width: '300px'}} 
                    paragraph={{ rows: 4, width: '500px' }} 
                    active
                >

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
                </Skeleton>
            </Col>
        </Row>
    </HeroSection>
)

export default BannarDetailsView;