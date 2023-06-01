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
                  <Link href="#" underline="none" color={"#fff"}>
                    <Typography>Kontak Kami</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Box sx={{ display: "flex", gap: "1.5rem" }}>
                    <Link href="#" underline="none" color={"#fff"}>
                      <FacebookRounded />
                    </Link>
  
                    <Link href="#" underline="none" color={"#fff"}>
                      <Twitter />
                    </Link>
  
                    <Link href="#" underline="none" color={"#fff"}>
                      <YouTube />
                    </Link>
  
                    <Link href="#" underline="none" color={"#fff"}>
                      <Instagram />
                    </Link>
  
                    <Link href="#" underline="none" color={"#fff"}>
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
  