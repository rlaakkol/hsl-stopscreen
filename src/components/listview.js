import React from 'react';

import DeparturesByStopList from './bylist';


const ListView = () => {
  const time = Date.now() / 1000 | 0;

  return (
    <DeparturesByStopList
      ids={['HSL:1040112', 'HSL:1040413', 'HSL:1040141']}
      time={time}
      nstoptimes={2}
    />);
};

export default ListView;
