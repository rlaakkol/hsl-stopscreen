import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const DepartureList = (props) => {
  const formatTime = tstamp => moment.unix(tstamp).format('HH:mm');

  const list = props.loading
    ? []
    : props.stops.reduce((acc, stop) =>
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
  loading: React.PropTypes.bool,
  stops: React.PropTypes.array,
};

export default DepartureList;
