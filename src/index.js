import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'tachyons';
import { BrowserRouter } from 'react-router-dom'

const Title = () => {
	useEffect(() => {
		document.title = "Word Jelly"
	}, [])

	return null
};

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

