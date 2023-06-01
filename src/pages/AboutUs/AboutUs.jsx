import { NavBar, Footer } from '../../components';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function AboutUs() {
  return (
    <div>
      <NavBar active={"Tentang Kami"} />
      <Container maxWidth={"xl"}>
        <Grid container spacing={2} sx={{ my: "50px" }}>
          <Grid item xs={12} md={6}>
            <div className="pr-10">
              <Grid container sx={{ mb: "15px" }}>
                <Box
                  sx={{
                    pr: "10px",
                    borderRight: "2px solid",
                    borderColor: "#2196F3",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12pt",
                        md: "16pt",
                      },
                      color: "#2196F3",
                      fontWeight: "600",
                    }}
                  >
                    Aksesibilitas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: "10px",
                    borderRight: "2px solid",
                    borderColor: "#2196F3",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12pt",
                        md: "16pt",
                      },
                      color: "#2196F3",
                      fontWeight: "600",
                    }}
                  >
                    Kualitas
                  </Typography>
                </Box>
                <Box sx={{ px: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12pt",
                        md: "16pt",
                      },
                      color: "#2196F3",
                      fontWeight: "600",
                    }}
                  >
                    Inklusif
                  </Typography>
                </Box>
              </Grid>
              <Typography
                sx={{
                  fontSize: {
                    xs: "20pt",
                    md: "25pt",
                    color: "#212121",
                    fontWeight: "600",
                  },
                  fontWeight: 500,
                }}
              >
                Tentang Perusahaan
              </Typography>
              <img
                src="/image/logo-staredu-2.png"
                alt="logo"
                className="mt-5 mb-12"
                width={"270px"}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: "12pt",
                    md: "12pt",
                    color: "#212121",
                    fontWeight: "600",
                  },
                  pr: "20px",
                  fontWeight: 500,
                }}
              >
                Kami dari perusahaan Staredu memiliki visi untuk menghadirkan
                pendidikan berkualitas kepada semua orang melalui platform
                e-learning inovatif kami. Dengan menggunakan teknologi canggih
                dan pendekatan pedagogis yang efektif, kami berkomitmen untuk
                mengubah cara orang belajar dan memberikan peluang pendidikan
                yang tidak terbatas.
              </Typography>
            </div>
          </Grid>
          <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src="/image/aboutUs-group.png" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ my: "50px", py: "75px", bgcolor: "#F0FAFF" }}>
        <Container maxWidth={"xl"}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography
                sx={{
                  fontSize: { xs: "28pt", md: "30pt" },
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                99<span className="text-[#2196F3]">%</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15pt", md: "17pt" },
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Keakuratan Data
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography
                sx={{
                  fontSize: { xs: "28pt", md: "30pt" },
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                700<span className="text-[#2196F3]">+</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15pt", md: "17pt" },
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Proyek Yang Berhasil
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography
                sx={{
                  fontSize: { xs: "28pt", md: "30pt" },
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                100<span className="text-[#2196F3]">+</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15pt", md: "17pt" },
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Anggota Tim
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography
                sx={{
                  fontSize: { xs: "28pt", md: "30pt" },
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                15<span className="text-[#2196F3]">+</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15pt", md: "17pt" },
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Produk
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          mt: "30px",
          py: "70px",
        }}
      >
        <Container maxWidth={"lg"}>
          <img src="/image/aboutUs-value.png" alt="" />
        </Container>
      </Box>

      <Box sx={{ py: "50px" }}>
        <Container maxWidth={"xl"}>
          <Typography
            textAlign="center"
            sx={{
              fontSize: { xs: "20pt", md: "25pt" },
              fontWeight: "600",
              color: "#212121",
              mb: "20px",
            }}
          >
            Value Kami
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontSize: { xs: "12pt", md: "18pt" },
              fontWeight: "400",
              color: "#212121",
              px: "40px",
            }}
          >
            Kami memprioritaskan kualitas dan keunggulan akademik dalam semua
            aspek platform e-learning kami.
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          py: "0px",
        }}
      >
        <Container maxWidth={"xl"}>
          <Grid container spacing={7}>
            <Grid item xs={12} md={4} sx={{}}>
              <Card
                sx={{
                  position: "relative",
                  height: { xs: "400px", md: "350px", lg: "400px" },
                  borderRadius: "16px",
                  background:
                    "linear-gradient(358.78deg, #F0FAFF 1.04%, rgba(187, 222, 251, 0) 82.65%)",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image="/image/aboutUs-valueCollaboration.png"
                  sx={{
                    width: "15rem",
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    mt: "50px",
                  }}
                />
                <CardContent sx={{ py: "2rem", px: "2rem", color: "#212121" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    mb={2}
                    sx={{ fontWeight: "600" }}
                  >
                    Kolaborasi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} sx={{}}>
              <Card
                sx={{
                  position: "relative",
                  height: { xs: "400px", md: "350px", lg: "400px" },
                  borderRadius: "16px",
                  background:
                    "linear-gradient(358.78deg, #F0FAFF 1.04%, rgba(187, 222, 251, 0) 82.65%)",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image="/image/aboutUs-valueInnovation.png"
                  sx={{
                    width: "15rem",
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    mt: "50px",
                  }}
                />
                <CardContent sx={{ py: "2rem", px: "2rem", color: "#212121" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    mb={2}
                    sx={{ fontWeight: "600" }}
                  >
                    Inovasi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} sx={{}}>
              <Card
                sx={{
                  position: "relative",
                  height: { xs: "400px", md: "350px", lg: "400px" },
                  borderRadius: "16px",
                  background:
                    "linear-gradient(358.78deg, #F0FAFF 1.04%, rgba(187, 222, 251, 0) 82.65%)",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image="/image/aboutUs-valueCommitment.png"
                  sx={{
                    width: "15rem",
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    mt: "50px",
                  }}
                />
                <CardContent sx={{ py: "2rem", px: "2rem", color: "#212121" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    mb={2}
                    sx={{ fontWeight: "600" }}
                  >
                    Komitmen
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: "70px" }}>
        <Container maxWidth={"xl"}>
          <Grid container>
            <Grid item xs={12} md={6} mb={"2rem"}>
              <img
                src="/image/aboutUs-CEO.png"
                className="rounded-[20px]"
                alt=""
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography variant="h3" mb={"20px"} fontWeight={600}>
                Misi Kami
              </Typography>
              <Typography variant="h5" mb={"25px"}>
                Menginspirasi dan Membuka Peluang Belajar yang Tak Terbatas
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  p: "1rem",
                  boxShadow: "0px 6px 10px 0px #4161FF80",
                  borderRadius: "16px",
                  width: "fit-content", // Added this line to make the width fit the content
                }}
              >
                <Typography variant="h5" mb={"10px"} fontWeight={600}>
                  Mr. Richard Joan
                </Typography>
                <Typography
                  variant="h5"
                  mb={"10px"}
                  fontWeight={600}
                  color={"#2196F3"}
                >
                  CEO - StarEdu
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
