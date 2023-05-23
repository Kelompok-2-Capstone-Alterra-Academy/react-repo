import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
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
				<Route path="/chat" element={<App />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
