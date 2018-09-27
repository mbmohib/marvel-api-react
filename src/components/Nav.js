import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
`

const Nav = () => (
    <NavWrapper>
        <NavItem to="/" activeClassName='is-active' exact={true}>Home</NavItem>
        <NavItem to="" activeClassName='is-active'>Contact Me</NavItem>
        <NavItem to="" activeClassName='is-active'>Fork this Repo</NavItem>
    </NavWrapper>
)

export default Nav
