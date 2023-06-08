import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';

import ProtectedRoute from '../ProtectedRoute.jsx';
import './index.css';
import {
	AboutUs,
	Chat,
	LandingPage,
	LearningModule,
	Login,
	LupaPassword,
	ManageCourse,
	Quiz,
	Dashboard,
	EditProfile,
} from './pages';
import { store } from './redux/store';

const theme = createTheme({
	typography: {
		fontFamily: 'Poppins, Arial',
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/dashboard" element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/Lupa" element={<LupaPassword />} />
						<Route path="/register" element={<App />} />
						<Route path="/profil" element={<App />} />
						<Route path="/edit-profile" element={<EditProfile />} />
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
						<Route path="/course/:id" element={<ManageCourse />} />
						<Route
							path="/chat"
							element={
								<ProtectedRoute>
									<Chat />
								</ProtectedRoute>
							}
						/>
						<Route
							path="*"
							element={
								<ProtectedRoute>
									<App />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
