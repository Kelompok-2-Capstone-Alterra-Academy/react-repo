import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import styles from "../ManageCustomer/ManageCustomer.module.css";
import {
  ConfirmationModal,
  Header,
  ResponseModal,
  Tag,
} from "../../components";
import {
  Backdrop,
  Checkbox,
  Fade,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FilterList,
  Search,
  MailOutline,
  WhatsApp,
  Close,
} from "@mui/icons-material";
import { BiSortAZ, BiSortZA } from "react-icons/bi";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { OutlineTag } from "../../components";

export default function ManageCustomer() {
  const [selectedOption, setSelectedOption] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortByTime, setSortByTime] = useState("");
  const [sortBySiswa, setSortBySiswa] = useState("");
  const [open, setOpen] = useState(false);
  const [openQuizForm, setOpenQuizForm] = useState(false);
  const [openSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeSortTime = (event) => {
    setSortByTime(event.target.value);
  };

  const handleChangeSortSiswa = (event) => {
    setSortBySiswa(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenQuizForm = () => {
    setSelectedQuiz([]);
    setOpenQuizForm(true);
  };
  const handleCloseQuizForm = () => setOpenQuizForm(false);

  const handleQuizToggle = (quiz) => {
    const newSelectedQuiz = [...selectedQuiz];
    const index = newSelectedQuiz.indexOf(quiz);

    if (index === -1) {
      newSelectedQuiz.push(quiz);
    } else {
      newSelectedQuiz.splice(index, 1);
    }

    setSelectedQuiz(newSelectedQuiz);
  };

  const handleOpenSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);


  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(2),
      border: 0,
      borderRadius: "21px",
      "&.Mui-disabled": {
        border: 0,
        borderRadius: "21px",
      },
      "&:not(:first-of-type)": {
        borderRadius: "21px",
      },
      "&:first-of-type": {
        borderRadius: "21px",
      },
    },
  }));

  const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    "&.MuiToggleButton-root": {
      outline: "1px solid gray",
      borderRadius: "15px",
      minWidth: "150px",
      textTransform: "capitalize",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      borderColor: "#2196F3",
      backgroundColor: "#F0FAFF",
      outline: "1px solid #2196F3",
    },
    "&.Mui-selected svg ": {
      color: "#2196F3",
    },
  }));

  // dummy table data siswa
  const dummyImage =
    "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg";
  function createDataSiswa(
    photo,
    nama,
    kelas,
    isActive,
    email,
    telp,
    tglMasuk,
    sectionProgress
  ) {
    return {
      photo,
      nama,
      kelas,
      isActive,
      email,
      telp,
      tglMasuk,
      sectionProgress,
    };
  }
  const rows = [
    createDataSiswa(
      dummyImage,
      "Peter Parker",
      "SMA",
      true,
      "parker123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      8
    ),
    createDataSiswa(
      dummyImage,
      "Peter Parker",
      "SMA",
      true,
      "parker123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      8
    ),
    createDataSiswa(
      dummyImage,
      "Peter Parker",
      "SMA",
      true,
      "parker123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      8
    ),
    createDataSiswa(
      dummyImage,
      "Peter Parker",
      "SMA",
      true,
      "parker123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      8
    ),
    createDataSiswa(
      dummyImage,
      "Peter Johan",
      "SMA",
      false,
      "johan123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      12
    ),
    createDataSiswa(
      dummyImage,
      "Peter Johan",
      "SMA",
      false,
      "johan123@gmail.com",
      "0821-2345-6789",
      "20 April 2023",
      12
    ),
  ];

  function createDataQuiz(nama, kelas, mapel, jurusan) {
    return { nama, kelas, mapel, jurusan };
  }
  const rowsQuiz = [
    createDataQuiz("Aljabar Linier", 12, "Matematika", "IPS"),
    createDataQuiz("Molekul Atom", 12, "Kimia", "IPA"),
    createDataQuiz("Sistem Saraf", 12, "Biologi", "IPS"),
    createDataQuiz("Geometri", 11, "Matematika", "IPS"),
    createDataQuiz("Grammar", 12, "Bahasa Inggris", "IPS"),
    createDataQuiz("Struktur Pasar", 10, "Ekonomi", "IPS"),
  ];

  return (
    <div className={styles.container}>
      <Header
				breadCrumbData={{
					name: 'Customer Saya',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/manage-customer', title: 'Manage Customer' },
					],
				}}
				profileData={{
					name: 'Admin',
					role: 'Admin',
					pic: 'https://i.pravatar.cc/150?img=21',
					email: 'testing@gmail.com',
				}}
			/>
      <div className={styles.mainContent}>
        <div className="flex justify-between my-10">
          <div className="flex space-x-2">
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              183
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "600", color: "gray" }}>
              Total Siswa
            </Typography>
          </div>
          <div className="flex space-x-10">
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                size="small"
                value={selectedOption}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  borderColor: "#2196F3",
                  borderRadius: "10px",
                  color: "#2196F3",
                  "&:hover": { borderColor: "#2196F3" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#2196F3",
                  },
                }}
              >
                <MenuItem
                  value={"Matematika"}
                  sx={{
                    width: "100%",
                    ":hover": { bgcolor: "#F0FAFF", color: "#2196F3" },
                  }}
                >
                  <Typography textAlign={"center"} sx={{ width: "100%" }}>
                    Matematika
                  </Typography>
                </MenuItem>
                <MenuItem
                  value={"Fisika"}
                  sx={{
                    width: "100%",
                    ":hover": { bgcolor: "#F0FAFF", color: "#2196F3" },
                  }}
                >
                  <Typography textAlign={"center"} sx={{ width: "100%" }}>
                    Fisika
                  </Typography>
                </MenuItem>
                <MenuItem
                  value={"Kimia Dasar"}
                  sx={{
                    width: "100%",
                    ":hover": { bgcolor: "#F0FAFF", color: "#2196F3" },
                  }}
                >
                  <Typography textAlign={"center"} sx={{ width: "100%" }}>
                    Kimia Dasar
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>

            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{
                bgcolor: "transparent",
                border: "1px solid gray",
                borderRadius: "8px",
                ":hover": { color: "#F0FAFF", bgcolor: "#67bbff" },
              }}
              onClick={handleOpen}
            >
              <FilterList />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box className="absolute right-1/2 top-1/3 translate-x-1/2 bg-white rounded-lg p-7">
                  <Typography
                    id="transition-modal-title"
                    variant="h5"
                    component="h2"
                    textAlign={"center"}
                    fontWeight={600}
                    mb={'36px'}
                  >
                    Sortir Berdasarkan
                  </Typography>
                  <div>
                    <StyledToggleButtonGroup
                      value={sortBy}
                      variant="outlined"
                      onChange={handleChangeSort}
                      className="flex space-x-10"
                    >
                      <StyledToggleButton value="ascending" aria-label="bold">
                        <BiSortAZ fontSize={20} className="mr-3"/> A-Z
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                      >
                        <BiSortZA fontSize={20} className="mr-3"/> Z-A
                      </StyledToggleButton>
                    </StyledToggleButtonGroup>
                  </div>

                  <div>
                    <StyledToggleButtonGroup
                      value={sortByTime}
                      variant="outlined"
                      onChange={handleChangeSortTime}
                      className="space-x-10"
                    >
                      <StyledToggleButton
                        value="ascending"
                        aria-label="bold"
                        className="w-52"
                      >
                        <BiSortAZ fontSize={20} className="mr-3"/> Terbaru
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                        className="w-52"
                      >
                        <BiSortZA fontSize={20} className="mr-3"/> Terlama
                      </StyledToggleButton>
                    </StyledToggleButtonGroup>
                  </div>

                  <div>
                    <StyledToggleButtonGroup
                      value={sortBySiswa}
                      variant="outlined"
                      onChange={handleChangeSortSiswa}
                      className="space-x-10"
                    >
                      <StyledToggleButton
                        value="ascending"
                        aria-label="bold"
                        className="w-56"
                      >
                        <TbSortAscending2 fontSize={20} className="mr-3"/> Siswa Aktif
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                        className="w-56"
                      >
                        <TbSortDescending2 fontSize={20} className="mr-3"/> Siswa Nonaktif
                      </StyledToggleButton>
                    </StyledToggleButtonGroup>
                  </div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      fontWeight: 600,
                      bgcolor: '#2196F3',
                      mt:'10px',
                      textTransform: "capitalize",
                      boxShadow: 'none'
                    }}
                    variant={'contained'}
                    onClick={handleClose}
                  >
                    Simpan Pengaturan
                  </Button>
                </Box>
              </Fade>
            </Modal>

            <div className="relative flex items-center">
              <Search
                sx={{ position: "absolute", left: "12px", color: "gray" }}
              />
              <input
                type="text"
                className="w-72 rounded bg-gray-100 pl-11 pr-2 py-2.5 text-sm"
                placeholder="Cari nama siswa"
              />
            </div>
          </div>
        </div>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Siswa</TableCell>
                  <TableCell>Kontak</TableCell>
                  <TableCell>Tanggal Masuk</TableCell>
                  <TableCell>Section Progress</TableCell>
                  <TableCell>Tindakan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={row.nama+i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex items-center space-x-3">
                        <img
                          src={row.photo}
                          alt=""
                          className="rounded-full w-16"
                        />
                        <div>
                          <Typography fontWeight={600}>{row.nama}</Typography>
                          <div className="flex items-center space-x-3 mt-1">
                            <Typography fontSize={14}>{row.kelas}</Typography>
                            <Tag type={row.isActive ? "Green" : "Red"}>
                              {row.isActive ? "Aktif" : "Tidak Aktif"}
                            </Tag>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3 mb-2.5">
                        <MailOutline
                          sx={{ fontSize: "12pt", color: "#616161" }}
                        />
                        <Typography fontSize={14} fontWeight={500}>
                          {row.email}
                        </Typography>
                      </div>
                      <div className="flex items-center space-x-3">
                        <WhatsApp sx={{ fontSize: "12pt", color: "#616161" }} />
                        <Typography fontSize={14} fontWeight={500}>
                          {row.telp}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{row.tglMasuk}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-5">
                        <Typography>{row.sectionProgress}/12</Typography>
                        <OutlineTag
                          type={row.sectionProgress === 12 ? "Green" : "Yellow"}
                        >
                          {row.sectionProgress === 12
                            ? "Lulus Kursus"
                            : 2 + " Tugas perlu dinilai"}
                        </OutlineTag>
                      </div>
                    </TableCell>
                    <TableCell>
                      {row.sectionProgress === 12 ? (
                        <div className="flex space-x-5 items-center">
                          <Button
                            sx={{
                              width: "100%",
                              color: "#2196F3",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                            variant="outlined"
                            href={
                              "https://wa.me/+62" + row.telp.replace(/-/g, "")
                            }
                            target="_blank"
                          >
                            Hubungi
                          </Button>
                          <Button
                            sx={{
                              width: "100%",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textTransform: "capitalize",
                              ':hover': {
                                bgcolor:'#d32f2f',
                                color:'white'
                              }
                            }}
                            variant="outlined"
                            color={'error'}
                            onClick={handleOpenDeleteModal}
                          >
                            Hapus Siswa
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-5 items-center">
                          <Button
                            sx={{
                              width: "100%",
                              bgcolor: "#2196F3",
                              borderRadius: "8px",
                              boxShadow: "none",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                            variant="contained"
                            onClick={handleOpenQuizForm}
                          >
                            Berikan Quiz
                          </Button>
                          <Button
                            sx={{
                              width: "100%",
                              color: "#2196F3",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                            variant="outlined"
                            href={
                              "https://wa.me/+62" + row.telp.replace(/-/g, "")
                            }
                            target="_blank"
                          >
                            Hubungi
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Modal
          open={openQuizForm}
          onClose={handleCloseQuizForm}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openQuizForm}>
            <Box className="absolute right-1/2 top-[50px] translate-x-1/2 bg-white rounded-lg p-7">
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                textAlign={"center"}
                fontWeight={600}
              >
                Tugaskan Quiz
              </Typography>
              <Button
                sx={{
                  position: "absolute",
                  top: 7,
                  right: 2,
                  color: "#212121",
                }}
                onClick={handleCloseQuizForm}
              >
                <Close />
              </Button>
              <div>
                <div className="flex items-center justify-between my-7">
                  <div className="flex space-x-2">
                    <Typography fontSize={14}>
                      Pilih Kuis yang akan diberikan
                    </Typography>
                  </div>
                  <div className="relative flex items-center">
                    <Search
                      sx={{
                        position: "absolute",
                        left: "12px",
                        color: "gray",
                      }}
                    />
                    <input
                      type="text"
                      className="w-48 rounded-lg bg-white pl-11 pr-2 py-2.5 text-xs border"
                      placeholder="Cari Kuis"
                    />
                  </div>
                </div>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color={"#616161"}
                          >
                            Nama Kuis
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color={"#616161"}
                          >
                            Kelas
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color={"#616161"}
                          >
                            Mata Pelajaran
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color={"#616161"}
                          >
                            Jurusan
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsQuiz.map((row, i) => (
                        <TableRow
                          key={row.nama+i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Typography fontWeight={600} fontSize={14}>
                              {row.nama}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} fontSize={14}>
                              {row.kelas}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} fontSize={14}>
                              {row.mapel}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} fontSize={14}>
                              {row.jurusan}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                              checked={selectedQuiz.includes(row.nama)} // Tambahkan properti checked
                              onChange={() => handleQuizToggle(row.nama)} // Tambahkan properti onChange
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  sx={{
                    width: "100%",
                    bgcolor: "#2196F3",
                    borderRadius: "8px",
                    boxShadow: "none",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    mt: "10px",
                  }}
                  variant="contained"
                  onClick={(e) => {
                    handleCloseQuizForm(e), handleOpenSuccessModal(e);
                  }}
                  disabled={selectedQuiz.length === 0} // Tambahkan properti disabled
                >
                  Berikan Quiz
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
        <ResponseModal
          type={"Primary"}
          buttonVariant={"Outlined"}
          title={"Kuis Diberikan!"}
          message={"Kuis berhasil ditugaskan kepada siswa"}
          image={"image/customer-quizGiven.png"}
          buttonText={"Tutup"}
          show={openSuccessModal}
          buttonClick={handleCloseSuccessModal}
        />
        <ConfirmationModal
          show={showDeleteModal}
          primaryButtonName="Batal"
          secondaryButtonName="Hapus"
          onPrimaryButtonClick={handleCloseDeleteModal}
          onSecondaryButtonClick={handleCloseDeleteModal}
          title="Hapus Siswa?"
          image={"/image/customer-delete.png"}
          confirmationText="Apakah Anda yakin ingin siswa?"
        />
      </div>
    </div>
  );
}
