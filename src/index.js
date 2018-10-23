import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { PageHeader, PageNavigation } from 'govuk-frederic'
import { Header1 } from 'govuk-react'
import asNavLink from 'as-nav-link'

const PageHeaderLogo = asNavLink()(PageHeader.LogoAnchor)
// const PageHeaderLink = asNavLink()(PageHeader.NavAnchor)
const PageNavigationLink = asNavLink()(PageNavigation.Anchor)

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

export default class AppContainer extends Component {
  static propTypes = {
    title: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      render: PropTypes.function
    })),
    root: PropTypes.node,
    notFound: PropTypes.node
  }

  static defaultProps = {
    title: 'Frederic',
    root: '',
    notFound: () => <Header1>Test</Header1>
  }

  render() {
    const {
      modules,
      title
    } = this.props

    return (
      <Router>
        <ToastProvider
          autoDismissTimeout={6000}
        >
          <PageHeader logo={<PageHeaderLogo to='/'>{title}</PageHeaderLogo>}>
            {/* TODO: configurable top nav */}
            {/* <PageHeaderLink to='/'>Top Nav</PageHeaderLink> */}
          </PageHeader>
          <PageNavigation>
            {modules && modules.map(({name, displayName}) => <PageNavigationLink to={`/${name}`}>{displayName}</PageNavigationLink>)}
          </PageNavigation>
          <Switch>
            {modules && modules.map(({name, render}) => <Route key={name} path={`/${name}`}
              render={({match, location, history}) => render({match, location, history, features, auth, reference, getReference})}
            />)}
            <Route exact path='/' render={() => this.props.root} />
            <Route render={() => this.props.notFound} />
          </Switch>
        </ToastProvider>
      </Router>
    )
  }
}
