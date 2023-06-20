import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from '../ProtectedRoute.jsx';
import './index.css';
import {
	AboutUs,
	Chat,
	Dashboard,
	EditProfile,
	ForgotPassword,
	LandingPage,
	LearningModule,
	Login,
	ManageCourse,
	ManageCustomer,
	Quiz,
	Register,
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
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/edit-profile"
							element={
								<ProtectedRoute>
									<EditProfile />
								</ProtectedRoute>
							}
						/>
						<Route path="/income" element={<Dashboard />} />
						<Route
							path="/manage-customer"
							element={
								<ProtectedRoute>
									<ManageCustomer />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/quiz"
							element={
								<ProtectedRoute>
									<Quiz />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/modul/:id"
							element={
								<ProtectedRoute>
									<LearningModule />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/course/:id"
							element={
								<ProtectedRoute isUsingSidebar={false}>
									<ManageCourse />
								</ProtectedRoute>
							}
						/>
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
									<Dashboard />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
				<ToastContainer />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
