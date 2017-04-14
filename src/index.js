import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import ListView from './components/listview'
import LocationView from './components/locationview'
// import rootReducer from './reducers';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LocationView} />
        <Route path="/list" component={ListView} />
        <Route path="/location" component={LocationView} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.querySelector('.main')
)
