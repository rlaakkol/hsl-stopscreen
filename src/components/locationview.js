import React, { Component } from 'react';

import DeparturesByLocation from './bylocation';

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

class LocationView extends Component {
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
    if (!this.state.pos.lat) return null;
    const minLat = this.state.pos.lat - 0.0005;
    const maxLat = this.state.pos.lat + 0.0005;
    const minLon = this.state.pos.lon - 0.0005;
    const maxLon = this.state.pos.lon + 0.0005;

    return (
      <DeparturesByLocation
        minLat={minLat}
        maxLat={maxLat}
        minLon={minLon}
        maxLon={maxLon}
        time={this.state.time}
        nstoptimes={2}
      />);
  }
}

export default LocationView;
