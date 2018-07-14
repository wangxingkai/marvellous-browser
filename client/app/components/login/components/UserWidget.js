import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { logoutAction } from '../actions'
import './UserWidget.pcss'

class User extends React.PureComponent {
  render() {
    const {
      login: { user },
      dispatch
    } = this.props

    return (user.email ?
      <div className="UserWidget">
        Goodday! {user.email}
        <br />
        <button
          onClick={evt => {
            evt.preventDefault()
            dispatch(logoutAction())
          }}
        >
          Logout
        </button>
      </div>
      :
      <Link to="/login" activeClassName="toolbar__top__links--active">Login</Link>
    )
  }
}

export default connect(state => {
  return {
    login: state.login
  }
})(User)
