import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const App = props =>
  <div>
    {props.children}
    <Navbar
      fixedBottom
    >
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
            <NavItem
              eventKey={1}
            >
              Listaa pysäkit
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/location">
            <NavItem
              eventKey={1}
            >
              Paikanna
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>;

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
