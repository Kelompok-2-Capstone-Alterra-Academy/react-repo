import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, AppBar, MenuItem, Container, Toolbar, Box, IconButton, Menu } from '@mui/material';
import { useNavigate } from "react-router-dom";

const pages = ['Beranda', 'Komunitas', 'Tentang Kami', 'Customer Service'];
const url = ['/', 'https://t.me/+starEdu', '/about-us', 'https://wa.me/+6288888888888'];

export default function NavBar({ active }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [activePage, setActivePage] = React.useState(active);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (url) => {
    if (url.startsWith('https://')) {
    window.open(url, '_blank');
  } else {
    navigate(url);
  }
  handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: '0' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
              <img src="/image/logo-starMyDashboard.png" alt="" width={210}/>
          </Box>
          <Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ bgcolor: '#dbedff', borderRadius: '8px', ':hover':{color: '#fff', bgcolor: '#67bbff'} }}
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
                {pages.map((page, i) => (
                  <MenuItem key={page} onClick={() => handlePageClick(url[i])} sx={{":hover":{bgcolor:"transparent"}}}>
                    <Button
                      sx={{
                        color: activePage === page ? 'blue' : 'black',
                        bgcolor: activePage === page ? '#F0FAFF' : '#fff',
                        textAlign:"center",
                      }}
                    >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
                <MenuItem>
                  <Button sx={{ width: '100%', bgcolor:'#2196F3', borderRadius: '8px', fontWeight: 600, textTransform: 'capitalize'}} variant='contained' href='/register'>Daftar</Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ width: '100%', color:'#2196F3', borderRadius: '8px', fontWeight: 600, textTransform: 'capitalize'}} variant="outlined" href='/login'>Login</Button>
                </MenuItem>
              </Menu>
            </Box>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: {xs: '0', md: '40px'} }}>
              {pages.map((page, i) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(url[i])}
                  sx={{
                    my: 2,
                    color: '#212121',
                    borderBottom: activePage === page ? '2px solid #2196F3' : 'none',
                    textTransform: 'capitalize',
                    display: 'block',
                    borderRadius: "0",
                    ':hover': {color:'blue'}
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', gap: '5px' } }}>
              <Button sx={{ width: '120px', color:'#2196F3', borderRadius: '8px', fontWeight: 600, textTransform: 'capitalize'}} variant="outlined" href='/login'>Login</Button>
              <Button sx={{ width: '120px', bgcolor:'#2196F3', borderRadius: '8px', fontWeight: 600, textTransform: 'capitalize'}} variant='contained' href='/register'>Daftar</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
