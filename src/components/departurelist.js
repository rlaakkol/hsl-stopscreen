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
          stop.stoptimesForPatterns.reduce((acc2, departure) =>
            acc2.concat(
              departure.stoptimes.map(stoptime =>
                ({
                  stop: stoptime.stop.name,
                  line: departure.pattern.name,
                  time: stoptime.serviceDay + stoptime.realtimeDeparture,
                  isRealtime: stoptime.realtime,
                }),
              ),
            ),
            [],
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
`;

export default graphql(StopQuery)(DepartureList);
