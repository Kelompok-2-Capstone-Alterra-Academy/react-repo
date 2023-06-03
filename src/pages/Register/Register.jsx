import React, { useState } from "react";
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  TextField,
  Button,
  Link
} from "@material-ui/core";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FormControl, InputAdornment, InputLabel, Select, MenuItem, ButtonGroup} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import styles from './Register.module.css';
import gambar from '../../../public/image/Daftar.png';
import { Footer } from '../../components';


const schema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  telpon: yup.string().required("No Telpon wajib diisi"),
  password: yup.string().required("Kata Sandi wajib diisi"),
  ulangPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Kata Sandi tidak cocok")
    .required("Ulang Kata Sandi wajib diisi"),
  namaLengkap: yup.string().required("Nama Lengkap wajib diisi"),
  tanggalLahir: yup.string().required("Tanggal Lahir wajib diisi"),
  bidangKeahlian: yup.string().required("Bidang Keahlian wajib diisi"),
});

function getSteps() {
  return [
    "Akun",
    "Data Diri",
  ];
}

const BasicForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <label className={styles.Judul}>Username</label>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              placeholder="Username"
              style={{ marginBottom: "10px" }}
              {...field}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </>
        )}
      />
      <label className={styles.Judul}>Email</label>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <>
            <TextField
              id="email"
              variant="outlined"
              placeholder="contoh@gmail.com"
              type="Email"
              style={{ marginBottom: "10px" }}
              {...field}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </>
        )}
      />
      <label className={styles.Judul}>No Telpon</label>
      <Controller
        control={control}
        name="telpon"
        render={({ field }) => (
          <>
            <TextField
              id="telpon"
              variant="outlined"
              placeholder="08XXXXXXXXXX"
              type="number"
              style={{ marginBottom: "10px" }}
              {...field}
              fullWidth
              error={!!errors.telpon}
              helperText={errors.telpon?.message}
            />
          </>
        )}
      />
      <label className={styles.Judul}>Kata Sandi</label>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              placeholder="Terdiri dari huruf dan angka"
              fullWidth
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: <InputAdornment position="end"><VisibilityIcon /></InputAdornment>,
              }}
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </>
        )}
      />
      <label className={styles.Judul}>Ulang Kata Sandi</label>
      <Controller
        control={control}
        name="ulangPassword"
        render={({ field }) => (
          <>
            <TextField
              id="UlangPassword"
              variant="outlined"
              type="password"
              placeholder="Masukan kata sandi yang sama"
              fullWidth
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: <InputAdornment position="end"><VisibilityIcon /></InputAdornment>,
              }}
              {...field}
              error={!!errors.ulangPassword}
              helperText={errors.ulangPassword?.message}
            />
          </>
        )}
      />
    </>
  );
};

const DataDiri = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <label className={styles.Judul}>Nama Lengkap</label>
      <Controller
        control={control}
        name="namaLengkap"
        render={({ field }) => (
          <>
            <TextField
              id="namaLengkap"
              variant="outlined"
              placeholder="Masukkan Nama Lengkap"
              fullWidth
              style={{ marginBottom: "10px" }}
              {...field}
              error={!!errors.namaLengkap}
              helperText={errors.namaLengkap?.message}
            />
          </>
        )}
      />
      <label className={styles.Judul}>Tanggal Lahir</label>
      <div>
        <Controller
          control={control}
          name="tanggalLahir"
          render={({ field }) => (
            <>
              <TextField
                id="tanggalLahir"
                variant="outlined"
                type="date"
                fullWidth
                style={{ marginBottom: "10px" }}
                {...field}
                error={!!errors.tanggalLahir}
                helperText={errors.tanggalLahir?.message}
              />
            </>
          )}
        />
      </div>
      <label className={styles.Judul}>Bidang Keahlian</label>
      <Controller
        control={control}
        name="bidangKeahlian"
        render={({ field }) => (
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Keahlian Yang Dimiliki</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="bidangKeahlian"
                label="Keahlian Yang Dimiliki"
                style={{ marginBottom: "10px" }}
                {...field}
                error={!!errors.bidangKeahlian}
                helperText={errors.bidangKeahlian?.message}
              >
                <MenuItem>Ilmu Terapan</MenuItem>
                <MenuItem>Ilmu Sosial</MenuItem>
                <MenuItem>Bahasa dan Sastra</MenuItem>
                <MenuItem>Ilmu Alam</MenuItem>
                <MenuItem>Multimedia</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      />
      <label className={styles.Judul}>Jenis Kelamin</label>
      <div>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button variant='contained' sx={{ m: 2 }}>
            <FontAwesomeIcon icon={faMars} />
            Laki - Laki</Button>
          <Button variant='contained' sx={{ m: 2 }}>
            <FontAwesomeIcon icon={faVenus} />
            Perempuan</Button>
        </ButtonGroup>
      </div>
    </>
  );
};

function getStepContent(step, errors) {
  switch (step) {
    case 0:
      return <BasicForm errors={errors} />;
    case 1:
      return <DataDiri errors={errors} />;
    default:
      return "unknown step";
  }
}

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      telpon: "",
      password: "",
      ulangPassword: "",
      namaLengkap: "",
      tanggalLahir: "",
      bidangKeahlian: "",
    }, 
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 1) {
          setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  return (
    <div >
    <div className={styles.con}>
      <h3 className={styles.start}>Star</h3>
      <h3 className={styles.My}>MyDashboard</h3>
    </div>
    <div className={styles.container}>
      <div className={styles.containerGambar}>
        <img className={styles.gambar} src={gambar} />
        <h5 className={styles.titleBawah}>Temukan Kembali Akses Akun </h5>
        <h5 className={styles.titleBawah}>Anda dengan Mudah </h5>
      </div>
      <div className={styles.content}>
        <div className={styles.formContent}>
          <h2 className={styles.Title}>{activeStep === steps.length - 1 ? "Lengkapi Data Diri" : "Buat Akun Mentor" }</h2>
          <p className={styles.desc}>Mulai dengan membuat akun baru </p>
        <Stepper alternativeLabel activeStep={activeStep} >
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          return (
            <Step {...stepProps} key={index} >
              <StepLabel  {...labelProps} >{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
        <div>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Button
                style={{color:"white", backgroundColor:"#2196F3", marginTop:"10px"}}
                variant="contained"
                type="submit"
                fullWidth
              >
                {activeStep === steps.length - 1 ? "Tambahkan Akun" : "Lanjut"}
              </Button>
            </form>
          </FormProvider>
          <div className={styles.conn}>
            <p className={styles.deskripsi}>Sudah Punya Akun?</p>
            <Link className={styles.deskripsi} style={{fontWeight:"Bold", cursor:"pointer", color:"black", textDecoration:"none"}} href="/login">Masuk</Link>
            </div>
        </div>
        </>
      )}
        </div>
    </div>
    </div>
    <Footer/>
  </div>
  );
};

export default Register;
