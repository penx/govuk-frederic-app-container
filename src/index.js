import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// TODO: feature flags
const features = {
  feature1: true,
  feature2: false
}

// TODO: auth
const auth = {
  user: {
    name: 'Jeff Goldblum'
  }
}

// TODO: reference data

const reference = {
  countries: {
    'GB': 'UK',
    'US': 'USA'
  }
}

function getReference(key) {
  // TODO:
}

export default class ExampleComponent extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      render: PropTypes.function
    }))
  }

  render() {
    const {
      modules
    } = this.props

    return (
      <div>
        <div>Top Nav</div>
        <Router>
          <div>
            <div>
              {modules.map(({name, displayName}) => <Link to={`/${name}`}>{displayName || name}</Link>)}
            </div>
            <Switch>
              {modules.map(({name, render}) => <Route key={name} path={`/${name}`}
                render={({match, location, history}) => render({match, location, history, features, auth, reference, getReference})}
              />)}
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
