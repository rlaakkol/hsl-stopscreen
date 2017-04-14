import React, { Component } from 'react'

import DeparturesByLocation from './bylocation'

const canUseDOM = !!(typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement)

const geolocation = canUseDOM && navigator.geolocation
  ? navigator.geolocation
  : {
      getCurrentPosition(success, failure) {
        failure('Your browser doesn\'t support geolocation.')
      }
    }

class LocationView extends Component {
  constructor() {
    super()
    this.state = {
      pos: { lat: undefined, lon: undefined },
      time: (Date.now() / 1000) | 0
    }
  }

  componentWillMount() {
    geolocation.getCurrentPosition(
      pos =>
        this.setState({
          pos: { lat: pos.coords.latitude, lon: pos.coords.longitude }
        }),
      error => alert(`Can't get location: ${error.message}`)
    )
  }

  render() {
    if (!this.state.pos.lat) return null
    const maybeDia = Number.parseFloat(this.props.location.query.dia)
    const dia = isNaN(maybeDia) ? 0.001 : maybeDia
    const minLat = this.state.pos.lat - dia / 2
    const maxLat = this.state.pos.lat + dia / 2
    const minLon = this.state.pos.lon - dia / 2
    const maxLon = this.state.pos.lon + dia / 2

    return (
      <DeparturesByLocation
        minLat={minLat}
        maxLat={maxLat}
        minLon={minLon}
        maxLon={maxLon}
        time={this.state.time}
        nstoptimes={2}
      />
    )
  }
}

LocationView.propTypes = {
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      dia: React.PropTypes.string
    })
  })
}

export default LocationView
