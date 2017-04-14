import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DepartureList from './departurelist'

const DeparturesByStopList = props => (
  <DepartureList loading={props.data.loading} stops={props.data.stops} />
)

DeparturesByStopList.propTypes = {
  data: React.PropTypes.object
}

const StopQuery = gql`
query StopQuery($ids: [String]!, $time: Long!, $nstoptimes: Int!) {
  stops(ids: $ids) {
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

export default graphql(StopQuery)(DeparturesByStopList)
