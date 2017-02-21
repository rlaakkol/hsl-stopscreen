import React from 'react';

import DeparturesByStopList from './bylist';


const ListView = (props) => {
  const time = Date.now() / 1000 | 0;

  const list = props.location.query.stops
    ? props.location.query.stops.split(',')
    : [];

  return (
    <DeparturesByStopList
      ids={list}
      time={time}
      nstoptimes={2}
    />);
};

ListView.propTypes = {
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      stops: React.PropTypes.string,
    }),
  }),
};

export default ListView;
