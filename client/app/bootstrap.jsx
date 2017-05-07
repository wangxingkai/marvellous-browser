import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { ApolloProvider } from 'react-apollo'
import { applyRouterMiddleware, browserHistory, Route, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from './store'
import { progress } from './progress'
import Comics from './components/comics/components/Comics'
import Comic from './components/comics/components/comic/Comic'
import { client } from './client'
import useScroll from 'react-router-scroll/lib/useScroll'
import { logPageView } from './analytics'

export const bootstrap = () => {
  progress.setup()

  ReactDOM.render(
    <ApolloProvider client={client}
                    store={store}>
      <Router
        render={applyRouterMiddleware(useScroll())}
        history={syncHistoryWithStore(browserHistory, store)}
        onUpdate={logPageView}>
        <Route path="/"
               component={App}>
          <Route path="/comics"
                 component={Comics}>

            <Route path="/comics/:id"
                   component={(props) => <Comic id={props.params.id}/>}/>
          </Route>
        </Route>
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

