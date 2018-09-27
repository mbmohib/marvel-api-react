import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import media from '../theme/mediaQuery';
import { Icon } from 'antd';

const NavWrapper = styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: flex-end;
`

const NavItem = styled(NavLink) `
    padding: 10px;
    color: #fff;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    display: none;

    ${media.tablet`
        display: block;
    `}
`;

const Link = styled.a`
    padding: 10px;
    color: #fff;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
`;

const Nav = () => (
    <NavWrapper>
        <NavItem to="/" activeClassName='is-active' exact={true}>Home</NavItem>
        <Link target="_blank" href="https://github.com/mbmohib/marvel-api-react">
            <Icon style={{marginRight: '5px'}} type="github" theme="outlined" />
            Fork this Repo
        </Link>
    </NavWrapper>
)

export default Nav
