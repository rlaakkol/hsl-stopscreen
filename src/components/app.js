import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      pos: { lat: undefined, lon: undefined },
      time: Date.now() / 1000 | 0,
    };
  }

  componentWillMount() {
    geolocation.getCurrentPosition(
      pos => this.setState({ pos: { lat: pos.coords.latitude, lon: pos.coords.longitude } }),
      error => alert(`Can't get location: ${error.message}`),
    );
  }

  render() {
    return (
      <div>
        <div>
          Lat: {this.state.pos.lat}, Lon: {this.state.pos.lon}
        </div>
        {this.props.children}
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
      </div>
    );
  }
}

export default App;
