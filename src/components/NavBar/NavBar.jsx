import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Button,
	AppBar,
	MenuItem,
	Container,
	Toolbar,
	Box,
	IconButton,
	Menu,
	Typography,
} from '@mui/material';

export default function NavBar() {
	const pages = ['Beranda', 'Kursus', 'Tentang Kami', 'Customer Service'];
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: '0' }}>
			<Container maxWidth="xl">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<img src="src/assets/logo-starMyDashboard.png" alt="" width={210} />
					</Box>
					<Box>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								sx={{
									bgcolor: '#dbedff',
									borderRadius: '8px',
									':hover': { color: '#fff', bgcolor: '#67bbff' },
								}}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
									color: 'black',
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center" sx={{ color: 'black' }}>
											{page}
										</Typography>
									</MenuItem>
								))}
								<MenuItem>
									<Button
										sx={{
											width: '100%',
											bgcolor: '#2196F3',
											borderRadius: '8px',
											fontWeight: 600,
											textTransform: 'capitalize',
										}}
										variant="contained"
									>
										Daftar
									</Button>
								</MenuItem>
								<MenuItem>
									<Button
										sx={{
											width: '100%',
											color: '#2196F3',
											borderRadius: '8px',
											fontWeight: 600,
											textTransform: 'capitalize',
										}}
										variant="outlined"
									>
										Login
									</Button>
								</MenuItem>
							</Menu>
						</Box>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								gap: { xs: '0', md: '40px' },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'black',
										textTransform: 'capitalize',
										display: 'block',
										':hover': { color: 'blue' },
									}}
								>
									{page}
								</Button>
							))}
						</Box>
					</Box>

					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', gap: '5px' } }}>
						<Button
							sx={{
								width: '120px',
								color: '#2196F3',
								borderRadius: '8px',
								fontWeight: 600,
								textTransform: 'capitalize',
							}}
							variant="outlined"
						>
							Login
						</Button>
						<Button
							sx={{
								width: '120px',
								bgcolor: '#2196F3',
								borderRadius: '8px',
								fontWeight: 600,
								textTransform: 'capitalize',
							}}
							variant="contained"
						>
							Daftar
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
