import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { Table } from 'react-bootstrap';

// import * as Actions from '../actions';

const DepartureList = (props) => {
  const formatTime = tstamp => moment.unix(tstamp).format('HH:mm');

  const list = props.data.loading
    ? []
    : props.data.stops.reduce((acc, stop) =>
        acc.concat(
          stop.stoptimesForPatterns.map(departure =>
            ({
              stop: departure.stoptimes[0].stop.name,
              line: departure.pattern.name,
              time: departure.stoptimes[0].serviceDay + departure.stoptimes[0].realtimeDeparture,
              isRealtime: departure.stoptimes[0].realtime,
            }),
          ),
        ),
        [],
      );

  list.sort((a, b) => a.time - b.time);
  const rows = list.map((departure, i) =>
    <tr key={i}>
      <td>
        {departure.stop}
      </td>
      <td>
        {departure.line}
      </td>
      <td>
        {formatTime(departure.time)} {departure.isRealtime ? <i className="fa fa-rss" aria-hidden="true" /> : ''}
      </td>
    </tr>,
  );
  return (
    <Table>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
};

DepartureList.propTypes = {
  data: React.PropTypes.object,
};

const StopQuery = gql`
query StopQuery($ids: [String]!, $time: Long!) {
  stops(ids: $ids) {
    gtfsId
    name
    lat
    lon
    stoptimesForPatterns(
      startTime: $time,
      numberOfDepartures: 1) {
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
`;

export default graphql(StopQuery)(DepartureList);
