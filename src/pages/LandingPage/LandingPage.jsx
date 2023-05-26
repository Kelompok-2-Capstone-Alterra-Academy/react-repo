import { NavBar } from '../../components';
import { Box, Button, Container, Grid, ListItem, Typography } from '@mui/material';

export default function LandingPage() {
	const ellipseImg = Array(5).fill(
		'https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg'
	);

	return (
		<div>
			<NavBar />

			<Container maxWidth={'xl'}>
				<Grid container spacing={2} sx={{ my: '50px' }}>
					<Grid item xs={12} md={6} sx={{ display: { xs: '', md: 'none' } }}>
						<div>
							<img src="src/assets/bg-landing1.png" alt="" />
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div>
							<Typography
								sx={{
									fontSize: { xs: '20pt', md: '25pt', color: '#212121' },
									fontWeight: 500,
								}}
							>
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
									},
								}}
							>
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
									}}
								>
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
											}}
										>
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
							<img src="src/assets/bg-landing1.png" alt="" />
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
							}}
						>
							<Box width={'200px'}>
								<img src="src/assets/landing-benefitSharing.png" alt="" />
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
							}}
						>
							<Box width={'200px'}>
								<img src="src/assets/landing-benefitFlexible.png" alt="" />
							</Box>
							<Box
								sx={{
									transform: { xs: 'scaleX(-1)', md: 'scaleX(1)' },
									textAlign: { xs: 'right', md: 'left' },
								}}
							>
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
							}}
						>
							<Box width={'200px'}>
								<img src="src/assets/landing-benefitIncome.png" alt="" />
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
				}}
			>
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
							}}
						>
							<img src="src/assets/bg-landing2.png" alt="" />
						</Grid>
						<Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
							<Box>
								<Typography
									mb={1.5}
									sx={{
										fontSize: { xs: '20pt', md: '25pt' },
										fontWeight: '600',
										color: '#212121',
									}}
								>
									Komunitas Mentor Terbaik dan <br /> Nikmati Manfaat yang Lebih Besar
								</Typography>
								<ListItem my={3} sx={{ display: 'block' }}>
									<li className="py-1.5">Meningkatkan pengalaman mengajar</li>
									<li className="py-1.5">Akses ke jaringan mentor dan siswa yang lebih luas</li>
									<li className="py-1.5">
										Dukungan teknologi yang kuat untuk memudahkan pengajaran online
									</li>
									<li className="py-1.5">
										Peluang untuk memperluas bisnis Anda dan mendapatkan penghasilan yang lebih
										besar
									</li>
								</ListItem>
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
										},
									}}
								>
									Gabung Sekarang
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
}
