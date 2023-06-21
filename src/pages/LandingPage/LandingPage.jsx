import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import { Footer, NavBar } from '../../components';

export default function LandingPage() {
	const ellipseImg = [
		'/image/landing-mentors/mentor-1.png',
		'/image/landing-mentors/mentor-2.png',
		'/image/landing-mentors/mentor-3.png',
		'/image/landing-mentors/mentor-4.png',
		'/image/landing-mentors/mentor-5.png',
	];

	return (
		<div>
			<NavBar active={'Beranda'} />

			<Container maxWidth={'xl'}>
				<Grid container spacing={2} sx={{ my: '50px' }}>
					<Grid item xs={12} md={6} sx={{ display: { xs: '', md: 'none' } }}>
						<div>
							<img src="/image/bg-landing1.png" alt="" />
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div>
							<Typography
								sx={{
									fontSize: { xs: '20pt', md: '25pt', color: '#212121' },
									fontWeight: 500,
								}}>
								Mulai <span style={{ fontWeight: 600 }}> Jadi Pahlawan </span>
								<br />
								Untuk Mencerdaskan
								<br />
								<span style={{ fontWeight: 600 }}> Anak Bangsa! </span>
							</Typography>
							<Typography my={3.5} sx={{ fontSize: '11pt', color: '#212121' }}>
								Kami Hadir sebagai Wadah untuk seluruh Pahlawan Pendidikan <br />
								untuk Membagikan Ilmunya kepada puluhan juta pelajar <br />
								di Indonesia, Ayo Gabung Sekarang
							</Typography>
							<Button
								sx={{
									width: '210px',
									background: 'linear-gradient(180deg, #2196F3 19.19%, #4161FF 100%)',
									boxShadow: '0px 6px 10px rgba(65, 97, 255, 0.5)',
									borderRadius: '8px',
									py: '10px',
									color: '#fff',
									textTransform: 'capitalize',
									transition: 'all ease-in 300',
									':hover': {
										background: 'linear-gradient(180deg, #1f87db 19.19%, #3854e0 100%)',
										color: 'white',
									},
								}}
								href="/register">
								Gabung Sekarang
							</Button>
							<Box mt={3.5} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box
									sx={{
										position: 'relative',
										width: '145px',
										height: '45px',
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									{ellipseImg.map((image, idx) => (
										<Box
											key={idx}
											sx={{
												position: 'absolute',
												left: `${idx * 20}px`,
												width: '40px',
												height: '40px',
												borderRadius: '100%',
												overflow: 'hidden',
												bgcolor: 'gray',
												boxShadow: '0px 0px 10px 0px #54A5FF',
											}}>
											{/* Render your image inside the Box component */}
											<img src={image} alt="" />
										</Box>
									))}
								</Box>
								<Typography sx={{ fontSize: '10pt' }}>1,2K+ Pengajar telah bergabung</Typography>
							</Box>
						</div>
					</Grid>
					<Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<img src="/image/bg-landing1.png" alt="" />
						</Box>
					</Grid>
				</Grid>
			</Container>

			<Box sx={{ my: '50px', py: '70px', bgcolor: '#F0FAFF' }}>
				<Container maxWidth={'xl'}>
					<Grid container spacing={2}>
						<Grid
							item
							xs={12}
							md={4}
							my={2}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '20px',
							}}>
							<Box width={'200px'}>
								<img src="/image/landing-benefitSharing.png" alt="" />
							</Box>
							<Box>
								<Typography mb={1.5} sx={{ fontSize: '17pt', fontWeight: '600', color: '#212121' }}>
									Sharing Ilmu
								</Typography>
								<Typography sx={{ fontSize: '10pt' }}>
									Bagikan Keahlian dan Pengetahuanmu dengan Jutaan Siswa di Indonesia
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							my={2}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '20px',
								transform: { xs: 'scaleX(-1)', md: 'scaleX(1)' },
							}}>
							<Box width={'200px'}>
								<img src="/image/landing-benefitFlexible.png" alt="" />
							</Box>
							<Box
								sx={{
									transform: { xs: 'scaleX(-1)', md: 'scaleX(1)' },
									textAlign: { xs: 'right', md: 'left' },
								}}>
								<Typography mb={1.5} sx={{ fontSize: '17pt', fontWeight: '600', color: '#212121' }}>
									Mengajar Fleksibel
								</Typography>
								<Typography sx={{ fontSize: '10pt' }}>
									Simpan File dan Video Pembelajaranmu Bagikan Kapanpun Kamu Mau
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							my={2}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '20px',
							}}>
							<Box width={'200px'}>
								<img src="/image/landing-benefitIncome.png" alt="" />
							</Box>
							<Box>
								<Typography mb={1.5} sx={{ fontSize: '17pt', fontWeight: '600', color: '#212121' }}>
									Dapatkan Income
								</Typography>
								<Typography sx={{ fontSize: '10pt' }}>
									Selain Berbagi Kebaikan, Kamu juga Bisa Meraih Penghasilan Tambahan
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box
				sx={{
					mt: '30px',
					py: '70px',
					background: 'linear-gradient(358.78deg, #F0FAFF 1.04%, rgba(187, 222, 251, 0) 82.65%)',
				}}>
				<Container maxWidth={'xl'}>
					<Grid container spacing={2}>
						<Grid
							item
							xs={12}
							md={5}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '20px',
							}}>
							<img src="/image/bg-landing2.png" alt="" />
						</Grid>
						<Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
							<Box>
								<Typography
									mb={1.5}
									sx={{
										fontSize: { xs: '20pt', md: '25pt' },
										fontWeight: '600',
										color: '#212121',
									}}>
									Komunitas Mentor Terbaik dan <br /> Nikmati Manfaat yang Lebih Besar
								</Typography>
								<List>
									<ListItem my={3} sx={{ display: 'block' }}>
										<ul style={{ listStyleType: 'disc' }}>
											<li className="py-1.5">Meningkatkan pengalaman mengajar</li>
											<li className="py-1.5">Akses ke jaringan mentor dan siswa yang lebih luas</li>
											<li className="py-1.5">
												Dukungan teknologi yang kuat untuk memudahkan pengajaran online
											</li>
											<li className="py-1.5">
												Peluang untuk memperluas bisnis Anda dan mendapatkan penghasilan yang lebih
												besar
											</li>
										</ul>
									</ListItem>
								</List>
								<Button
									sx={{
										width: '210px',
										my: 2,
										background: 'linear-gradient(180deg, #2196F3 19.19%, #4161FF 100%)',
										boxShadow: '0px 6px 10px rgba(65, 97, 255, 0.5)',
										borderRadius: '8px',
										py: '10px',
										color: '#fff',
										textTransform: 'capitalize',
										transition: 'all ease-in 300',
										':hover': {
											background: 'linear-gradient(180deg, #1f87db 19.19%, #3854e0 100%)',
											color: 'white',
										},
									}}
									href="/register">
									Gabung Sekarang
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box sx={{ py: '70px', background: '#F0FAFF' }}>
				<Container maxWidth={'xl'}>
					<Typography
						textAlign="center"
						sx={{
							fontSize: '22pt',
							fontWeight: '600',
							color: '#212121',
							mb: '50px',
						}}>
						Bagaimana kata mereka yang telah bergabung?
					</Typography>
					<Grid container spacing={1} my={1}>
						<Grid item xs={12} md={10} lg={8} xl={8} sx={{ mb: '30px' }}>
							<Box
								sx={{
									height: {
										xs: '143px',
										sm: '220px',
										md: '290px',
										lg: '310px',
									},
									display: 'flex',
									alignItems: 'center',
									backgroundImage: 'url("/image/landing-group-container.svg")',
									backgroundSize: 'cover',
									py: { md: '0rem' },
								}}>
								<Box
									sx={{
										flex: '0 0 auto',
										m: { xs: '10px', md: '20px', lg: '30px' },
										width: '25%',
										position: 'relative',
									}}>
									<div style={{ paddingTop: '100%' }} />
									<Box sx={{ mr: '0px', p: '0px' }}>
										<img
											src="/image/landing-mentor-john.png"
											alt=""
											className="rounded-full object-cover absolute top-0 left-0"
										/>
									</Box>
								</Box>
								<Box sx={{ maxWidth: { xs: '75%', md: '70%', lg: '60%' } }}>
									<Typography
										sx={{
											mb: { xs: '10px', md: '20px' },
											fontSize: {
												xs: '7pt',
												sm: '10pt',
												md: '12pt',
												lg: '14pt',
											},
											color: '#fff',
											px: '10px',
											overflowWrap: 'break-word',
										}}>
										{`"Sejak bergabung dengan platform ini saya merasa lebih mudah dalam mengajar dan
										saya mendapatkan akses ke lebih banyak siswa serta mendapatkan dukungan
										teknologi yang sangat membantu."`}
									</Typography>
									<Typography
										sx={{
											fontSize: {
												xs: '8pt',
												sm: '14pt',
												md: '15pt',
												lg: '16pt',
											},
											fontWeight: '600',
											color: '#fff',
										}}>
										John, Mentor Matematika
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={0} md={2} lg={4} xl={4}></Grid>
						<Grid item xs={0} md={2} lg={4} xl={4}></Grid>
						<Grid item xs={12} md={10} lg={8} xl={8}>
							<Box
								sx={{
									height: {
										xs: '143px',
										sm: '220px',
										md: '290px',
										lg: '310px',
									},
									display: 'flex',
									alignItems: 'center',
									backgroundImage: 'url("/image/landing-group-container.svg")',
									backgroundSize: 'cover',
									transform: 'scaleX(-1)',
									py: { md: '0rem' },
								}}>
								<Box
									sx={{
										flex: '0 0 auto',
										m: { xs: '10px', md: '20px', lg: '30px' },
										width: '25%',
										position: 'relative',
									}}>
									<div style={{ paddingTop: '100%' }} />
									<Box sx={{ mr: '0px', p: '0px' }}>
										<img
											src="/image/landing-mentor-sarah.png"
											alt=""
											className="rounded-full object-cover absolute top-0 left-0"
										/>
									</Box>
								</Box>
								<Box
									sx={{
										maxWidth: { xs: '75%', md: '70%', lg: '60%' },
										transform: 'scaleX(-1)',
										textAlign: 'right',
									}}>
									<Typography
										sx={{
											mb: { xs: '10px', md: '20px' },
											fontSize: {
												xs: '7pt',
												sm: '10pt',
												md: '12pt',
												lg: '14pt',
											},
											color: '#fff',
											px: '10px',
											overflowWrap: 'break-word',
										}}>
										{`"Saya sangat senang bergabung dengan platform kursus online ini. Saya dapat
										menjangkau lebih banyak siswa dan meningkatkan pendapatan saya sebagai mentor.
										Selain itu, dukungan teknologi yang diberikan sangat membantu dalam memudahkan
										pengajaran online."`}
									</Typography>
									<Typography
										sx={{
											fontSize: {
												xs: '8pt',
												sm: '14pt',
												md: '15pt',
												lg: '16pt',
											},
											fontWeight: '600',
											color: '#fff',
										}}>
										Sarah, Mentor Bahasa Inggris
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box
				sx={{
					py: '70px',
					background: 'linear-gradient(180.78deg, #F0FAFF 1.04%, rgba(187, 222, 251, 0) 82.65%)',
				}}>
				<Container maxWidth={'xl'}>
					<Typography
						textAlign={'center'}
						sx={{
							fontSize: '22pt',
							fontWeight: '600',
							color: '#212121',
							mb: '50px',
						}}>
						Fitur Unggulan
					</Typography>
					<Grid container spacing={7}>
						<Grid item xs={12} md={4} sx={{}}>
							<Card
								sx={{
									position: 'relative',
									height: { xs: '500px', md: '450px', lg: '500px' },
									borderRadius: '16px',
									bgcolor: '#FF9800',
									boxShadow: '0px 0px 10px 0px #54A5FF',
								}}>
								<CardMedia
									component="img"
									height="140"
									image="/image/landing-featureManagement1.png"
									sx={{ bgcolor: '#fff' }}
								/>
								<CardContent sx={{ py: '1rem', px: '2rem', color: '#fff' }}>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										mb={2}
										sx={{ fontWeight: '600' }}>
										Manajemen Siswa
									</Typography>
									<Typography variant="body2" sx={{ fontSize: '11pt' }}>
										Mentor dapat mengelola data siswa dengan mudah serta dapat memantau kemajuan
										belajar siswa,
									</Typography>
								</CardContent>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<div className="w-[50%] py-1.5 px-10 mx-auto absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#E65100]"></div>
								</Box>
							</Card>
						</Grid>

						<Grid item xs={12} md={4} sx={{}}>
							<Card
								sx={{
									position: 'relative',
									height: { xs: '500px', md: '450px', lg: '500px' },
									borderRadius: '16px',
									bgcolor: '#4CAF50',
									boxShadow: '0px 0px 10px 0px #54A5FF',
								}}>
								<CardMedia
									component="img"
									height="140"
									image="image/landing-featureTime1.png"
									sx={{ bgcolor: '#fff' }}
								/>
								<CardContent sx={{ py: '1rem', px: '2rem', color: '#fff' }}>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										mb={2}
										sx={{ fontWeight: '600' }}>
										Pengaturan Jadwal
									</Typography>
									<Typography variant="body2" sx={{ fontSize: '11pt' }}>
										Mentor dapat mengatur jadwal kelas dengan mudah dan efisien. Fitur ini dapat
										membantu memastikan bahwa siswa memiliki waktu yang cukup untuk belajar.
									</Typography>
								</CardContent>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<div className="w-[50%] py-1.5 px-10 mx-auto absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#1B5E20]"></div>
								</Box>
							</Card>
						</Grid>

						<Grid item xs={12} md={4} sx={{}}>
							<Card
								sx={{
									position: 'relative',
									height: { xs: '500px', md: '450px', lg: '500px' },
									borderRadius: '16px',
									bgcolor: '#2196F3',
									boxShadow: '0px 0px 10px 0px #54A5FF',
								}}>
								<CardMedia
									component="img"
									height="140"
									image="image/landing-featureClass1.png"
									sx={{ bgcolor: '#fff' }}
								/>
								<CardContent sx={{ py: '1rem', px: '2rem', color: '#fff' }}>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										mb={2}
										sx={{ fontWeight: '600' }}>
										Manajemen Kelas
									</Typography>
									<Typography variant="body2" sx={{ fontSize: '11pt' }}>
										mentor dapat mengatur setiap kelas dengan mudah. Ini mencakup pengiriman materi
										pelajaran, tugas, ujian, dan pekerjaan rumah.
									</Typography>
								</CardContent>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<div className="w-[50%] py-1.5 px-10 mx-auto absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#0D47A1]"></div>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box sx={{ py: '70px' }}>
				<Container
					maxWidth={'xl'}
					sx={{
						height: '300px',
						maxWidth: '95%',
						borderRadius: '16px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						position: 'relative',
						background: 'linear-gradient(180deg, #2196F3 19.19%, #4161FF 100%)',
						overflow: 'hidden',
					}}>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundImage: 'url(image/landing-maskgroup.png)',
							backgroundSize: 'cover',
						}}
					/>
					<Typography
						sx={{
							color: '#fff',
							fontSize: { xs: '17pt', md: '21pt' },
							fontWeight: '600',
							textAlign: 'center',
							zIndex: '0',
						}}>
						Siap untuk Mulai Meningkatkan <br />
						Pengalaman Mengajar Anda?
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							mt: '20px',
						}}>
						<Button
							sx={{
								width: '210px',
								background: '#fff',
								boxShadow: '0px 6px 10px rgba(65, 97, 255, 0.5)',
								borderRadius: '8px',
								py: '10px',
								color: '#2196F3',
								textTransform: 'capitalize',
								transition: 'all ease-in 300',
								':hover': { background: '#F0FAFF' },
							}}
							href="/register">
							Gabung Sekarang
						</Button>
					</Box>
				</Container>
			</Box>
			<Footer />
		</div>
	);
}
