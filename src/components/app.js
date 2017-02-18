import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import DepartureList from './departurelist';

// import * as Actions from '../actions';

const App = () => {
  const time = Date.now() / 1000 | 0;
  return (
    <div>
      <DepartureList
        ids={['HSL:1040112', 'HSL:1040413', 'HSL:1040141']}
        time={time}
      />
      <Navbar
        fixedBottom
      >
        <Navbar.Header>
          <Link to="/scorecard">
            <Navbar.Brand>
              Moro
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/scorecard">
              <NavItem
                eventKey={1}
              >
                Asetukset
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default App;
