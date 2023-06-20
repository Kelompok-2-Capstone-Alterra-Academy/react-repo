import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import styles from "../ManageCustomer/ManageCustomer.module.css";
import {
  ConfirmationModal,
  Header,
  Tag,
} from "../../components";
import {
  Backdrop,
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
} from "@mui/icons-material";
import { BiSortAZ, BiSortZA } from "react-icons/bi";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { OutlineTag } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../redux/actions/customerAction";
import { getCourse, getCustomer } from "../../clients";
import { LoopCircleLoading } from "react-loadingg";
import { toast } from "react-toastify";
import { setCourse } from "../../redux/actions/courseActions";

export default function ManageCustomer() {
  const [selectedOption, setSelectedOption] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortByTime, setSortByTime] = useState("");
  const [sortBySiswa, setSortBySiswa] = useState("");
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const customers = useSelector((state) => state.customer).customer;
  const courseData = useSelector((state) => state.course).course;

  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingFetch(true);
    getCustomer()
      .then((res) => {
        // console.log(res)
        dispatch(setCustomer(res.data.data));
      })
      .catch((err) => {
        // console.log(err)
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  }, []);

  useEffect(() => {
		setLoadingFetch(true);
		getCourse()
			.then((res) => {
				dispatch(setCourse(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetch(false);
			});
	}, []);

  if (loadingFetch) {
    return <LoopCircleLoading size="large" color="#4161ff" />;
  }

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

  return (
    <div className={styles.container}>
      <Header
        breadCrumbData={{
          name: "Customer Saya",
          links: [
            { link: "/dashboard", title: "Dashboard" },
            { link: "/manage-customer", title: "Manage Customer" },
          ],
        }}
        profileData={{
          name: "Admin",
          role: "Admin",
          pic: "https://i.pravatar.cc/150?img=21",
          email: "testing@gmail.com",
        }}
      />
      <div className={styles.mainContent}>
        <div className="flex justify-between my-10">
          <div className="flex space-x-2">
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              {customers ? customers.length : 0}
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
                {courseData.map((course, i) => (
                  <MenuItem
                    value={course.course_name}
                    sx={{
                      width: "100%",
                      ":hover": { bgcolor: "#F0FAFF", color: "#2196F3" },
                    }}
                  >
                    <Typography textAlign={"center"} sx={{ width: "100%" }}>
                      {course.course_name}
                    </Typography>
                  </MenuItem>
                ))}
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
                    mb={"36px"}
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
                        <BiSortAZ fontSize={20} className="mr-3" /> A-Z
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                      >
                        <BiSortZA fontSize={20} className="mr-3" /> Z-A
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
                        <BiSortAZ fontSize={20} className="mr-3" /> Terbaru
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                        className="w-52"
                      >
                        <BiSortZA fontSize={20} className="mr-3" /> Terlama
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
                        <TbSortAscending2 fontSize={20} className="mr-3" />{" "}
                        Siswa Aktif
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="descending"
                        aria-label="italic"
                        className="w-56"
                      >
                        <TbSortDescending2 fontSize={20} className="mr-3" />{" "}
                        Siswa Nonaktif
                      </StyledToggleButton>
                    </StyledToggleButtonGroup>
                  </div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      fontWeight: 600,
                      bgcolor: "#2196F3",
                      mt: "10px",
                      textTransform: "capitalize",
                      boxShadow: "none",
                    }}
                    variant={"contained"}
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
                  <TableCell>Section </TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Tindakan</TableCell>
                </TableRow>
              </TableHead>
              {customers != 0 ? (
                <TableBody>
                  {customers.map((row, i) => (
                    <TableRow
                      key={row.name + i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="flex items-center space-x-3">
                          <img
                            src={row.profile}
                            alt=""
                            className="rounded-full w-16"
                          />
                          <div>
                            <Typography fontWeight={600}>{row.name}</Typography>
                            <div className="flex items-center space-x-3 mt-1">
                              <Typography fontSize={14}>{row.class}</Typography>
                              <Tag
                                type={row.status === "active" ? "Green" : "Red"}
                              >
                                {row.status === "active"
                                  ? "Aktif"
                                  : "Tidak Aktif"}
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
                          <WhatsApp
                            sx={{ fontSize: "12pt", color: "#616161" }}
                          />
                          <Typography fontSize={14} fontWeight={500}>
                            {row.phone_number}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>{row.CreatedAt ? new Date(row.CreatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-5">
                          <Typography>
                            {row.sectionProgress ? row.sectionProgress : "-"}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-5">
                          <OutlineTag
                            type={
                              row.sectionProgress === 12 ? "Green" : "Yellow"
                            }
                          >
                            {row.sectionProgress === 12
                              ? "Lulus Kursus"
                              : " - "}
                          </OutlineTag>
                        </div>
                      </TableCell>
                      <TableCell>
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
                                "https://wa.me/+62" +
                                row.phone_number.replace(/-/g, "")
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
                                ":hover": {
                                  bgcolor: "#d32f2f",
                                  color: "white",
                                },
                              }}
                              variant="outlined"
                              color={"error"}
                              onClick={handleOpenDeleteModal}
                            >
                              Hapus Siswa
                            </Button>
                          </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      Belum ada data!
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
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
