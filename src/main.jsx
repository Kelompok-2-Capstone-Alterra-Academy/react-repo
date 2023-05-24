import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material'
import App from './App.jsx';
import { Chat } from './pages';
import './index.css';
import LandingPage from './pages/LandingPage/LandingPage.jsx';

const theme = createTheme({
	typography: {
	  fontFamily: 'Poppins, Arial',
	},
  })

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<App />} />
				<Route path="/register" element={<App />} />
				<Route path="/profil" element={<App />} />
				<Route path="/income" element={<App />} />
				<Route path="/customer">
					<Route path="atur-customer" element={<App />} />
				</Route>
				<Route path="/learning">
					<Route path=":nama" element={<App />} />
					<Route path="kuis" element={<App />} />
					<Route path="modul" element={<App />} />
				</Route>
				<Route path="/chat" element={<Chat />} />
			</Routes>
		</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
