import React from 'react'
import Nav from './Nav'
import Bannar from './Bannar'
import styled from 'styled-components'
import logo from '../images/logo.png'
import { Row, Col } from 'antd'
import homeBackgroundImage from '../images/home-bg.jpg'
import detailsBackgroundImage from '../images/details-bg.jpg'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.div`
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)),
        url(${props => props.homeView ? homeBackgroundImage : detailsBackgroundImage});
    background-size: cover;
    color: #fff;
    margin-bottom: 50px;
`

const Logo = styled(Link)`
    padding: 10px 0;
    display: block;
`

const LogoImg = styled.img`
    width: 60px;
`

const Header = props => (
    <HeaderWrapper homeView={props.homeView}>
        <div className="container">
            <Row>
                <Col span={6}>
                    <Logo to="/">
                        <LogoImg src={logo} />
                    </Logo>
                </Col>
                <Col span={18}>
                    <Nav />
                </Col>
            </Row>
        </div>

        <Bannar homeView={props.homeView} hero={props.hero} />
    </HeaderWrapper>
)

export default Header
