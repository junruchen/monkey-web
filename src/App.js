import React from 'react'
import {
  Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux'
import history from '@/history'

import Home from '@/views/Home.js'

class Basic extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home} />
        </Router>
      </Provider>
    )
  }
}
export default Basic
