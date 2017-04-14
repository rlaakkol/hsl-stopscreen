import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DepartureList from './departurelist'

const DeparturesByLocation = props => (
  <DepartureList loading={props.data.loading} stops={props.data.stopsByBbox} />
)

DeparturesByLocation.propTypes = {
  data: React.PropTypes.object
}

const LocationQuery = gql`
query LocationQuery($minLat: Float!, $maxLat: Float!, $minLon: Float!, $maxLon: Float!, $time: Long!, $nstoptimes: Int!){
  stopsByBbox(minLat: $minLat,
              maxLat: $maxLat,
              minLon: $minLon,
              maxLon: $maxLon,
              agency: "HSL") {
    gtfsId
    name
    lat
    lon
    stoptimesForPatterns(
      startTime: $time,
      numberOfDepartures: $nstoptimes) {
      pattern {
        name
        route {
          shortName
          desc
          agency {
            gtfsId
            name
          }
        }
      }
      stoptimes {
        realtime
        realtimeDeparture
        scheduledDeparture
        serviceDay
        stop {
          name
        }
      }
    }
  }
}
`

export default graphql(LocationQuery)(DeparturesByLocation)
