import {
    Container,
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    Link,
  } from "@mui/material";
  import {
    FacebookRounded,
    Instagram,
    Twitter,
    WhatsApp,
    YouTube,
  } from "@mui/icons-material";
  
  export default function Footer() {
    return (
      <Box sx={{ bgcolor: "#4161FF", p: "5rem" }}>
        <Container maxWidth={"xl"}>
          <Grid container spacing={7}>
            <Grid item xs={12} md={4} sx={{}}>
              <img src="image/logo-starEdu.png" alt="" className="mb-7" />
              <Typography sx={{ fontSize: "11pt", color: "#fff" }}>
                Jl. Ibrahim Adjie No. 20 Kota Bandung <br />
                Jawa Barat - Indonesia
              </Typography>
            </Grid>
  
            <Grid item xs={12} md={4} sx={{}}>
              <List>
                <ListItem>
                  <Typography color={"#fff"}>Kontak Kami</Typography>
                </ListItem>
                <ListItem>
                  <Box sx={{ display: "flex", gap: "1.5rem" }}>
                    <Link
                      href="https://web.facebook.com/staredu"
                      underline="none"
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      <FacebookRounded />
                    </Link>

                    <Link
                      href="https://twitter.com/staredu"
                      underline="none"
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      <Twitter />
                    </Link>
  
                    <Link
                      href="https://youtube.com/@staredu"
                      underline="none"
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      <YouTube />
                    </Link>
  
                    <Link
                      href="https://instagram.com/staredu"
                      underline="none"
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      <Instagram />
                    </Link>
  
                    <Link
                      href="https://wa.me/+6288888888888"
                      underline="none"
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      <WhatsApp />
                    </Link>
                  </Box>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
  