import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Content from './Content'
import Header from './Header'

const themeReducer = (state, action) => {
  if (!state) return { themeColor: 'red' }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state, themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

class Redux extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

export default Redux
