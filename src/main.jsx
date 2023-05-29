import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import { Chat, LandingPage, Quiz, Course, LearningModule } from './pages';
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
						<Route path="kuis" element={<Quiz />} />
						<Route path="modul" element={<LearningModule />} />
					</Route>
					<Route path="/course/:id" element={<Course />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
