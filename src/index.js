import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'tachyons';
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'

const Title = () => {
	useEffect(() => {
		document.title = "Word Jelly"
	}, [])

	return null
};

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Navigation/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
