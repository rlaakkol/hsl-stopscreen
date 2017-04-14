import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

const App = props => (
  <div>
    {props.children}
    <Navbar fixedBottom>
      <Navbar.Header>
        <Link to="/">
          <Navbar.Brand>
            Pysäkit
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/list">
            <NavItem eventKey={1}>
              Listaa pysäkit
            </NavItem>
          </LinkContainer>
          <NavDropdown title="Paikanna" id="nav-dropdown">
            <LinkContainer to="/location?dia=0.001">
              <MenuItem eventKey={'2.1'}>
                Säde 0.001
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/location?dia=0.005">
              <MenuItem eventKey={'2.2'}>
                Säde 0.005
              </MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

App.propTypes = {
  children: React.PropTypes.element
}

export default App
