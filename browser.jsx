import React from 'react'
import ReactDOM from 'react-dom'
import Application from './component/Application.jsx'

window.onload = () => {
  ReactDOM.render(<Application />, document.getElementById('application'))
}
