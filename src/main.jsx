import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import { Chat, LandingPage, Quiz, Course, LearningModule, AboutUs } from './pages';
import ProtectedRoute from '../ProtectedRoute.jsx';
import './index.css';
// import LearningModule from './pages/LearningModule/LearningModule.jsx';

const theme = createTheme({
	typography: {
		fontFamily: 'Poppins, Arial',
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/dashboard" element={<App />} />
					<Route path="/login" element={<App />} />
					<Route path="/register" element={<App />} />
					<Route path="/profil" element={<App />} />
					<Route path="/income" element={<App />} />
					<Route path="/customer">
						<Route path="atur-customer" element={<App />} />
					</Route>
					<Route path="/learning">
						<Route path=":nama" element={<App />} />
						<Route
							path="kuis"
							element={
								<ProtectedRoute>
									<Quiz />
								</ProtectedRoute>
							}
						/>
						<Route
							path="modul"
							element={
								<ProtectedRoute>
									<LearningModule />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path="/course/:id" element={<Course />} />
					<Route
						path="/chat"
						element={
							<ProtectedRoute>
								<Chat />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
