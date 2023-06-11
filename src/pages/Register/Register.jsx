import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Link
} from "@material-ui/core";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import {  InputAdornment, InputLabel, Select, MenuItem, ButtonGroup} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faM, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import styles from './Register.module.css'
import gambar from '../../../public/image/Daftar.png'
import { Footer } from '../../components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";


    function getSteps() {
        return [
          "Akun",
          "Data Diri",
        ];
    }
    
    const BasicForm = () => {
      const { control } = useFormContext();
      return (
        <> <label className={styles.Judul}>Username</label>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <label>Username</label>,
              <TextField
                id="username"
                required
                label="Username"
                variant="outlined"
                placeholder="Username"
                style={{marginBottom:"10px", boxShadow:"12px"}}
                {...field}
                fullWidth
              />
            )}
          />
           <label className={styles.Judul}>Email</label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <label>Email</label>,
              <TextField
              required
                id="email"
                variant="outlined"
                placeholder="contoh@gmail.com"
                type="Email"
                style={{marginBottom:"10px"}}
                {...field}
                fullWidth
              />
            )}
          />
           <label className={styles.Judul}>No Telpon</label>
          <Controller
            control={control}
            name="telpon"
            render={({ field }) => (
              <TextField
              required
                id="telpon"
                variant="outlined"
                placeholder="08XXXXXXXXXX"
                type="number"
                style={{marginBottom:"10px"}}
                {...field}
                fullWidth
              />
            )}
          />
           <label className={styles.Judul}>Kata Sandi</label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
              required
                id="password"
                type="password"
                variant="outlined"
                placeholder="Terdiri dari huruf dan angka"
                fullWidth
                style={{marginBottom:"10px"}}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><VisibilityIcon/></InputAdornment>,
                }}
                {...field}
              />
            )}
          />
           <label className={styles.Judul}>Ulang Kata Sandi</label>
          <Controller
            control={control}
            name="ulangPassword"
            render={({ field }) => (
              <TextField
              required
                id="UlangPassword"
                variant="outlined"
                type="password"
                placeholder="Masukan kata sandi yang sama"
                fullWidth
                style={{marginBottom:"10px"}}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><VisibilityIcon/></InputAdornment>,
                }}
                {...field}
              />
            )}
          />
        </>
      );
    };

    const DataDiri = () => {
      const { control } = useFormContext();
      const [age, setAge] = React.useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
      };
      const [gender, setGender] = useState('');
      const [selectedBorder, setSelectedBorder] = useState('');

      const handleGenderClick = (selectedGender) => {
        setGender(selectedGender);
      };

      return (
        <>
        <label className={styles.Judul}>Nama Lengkap</label>
          <Controller
            control={control}
            name="namaLengkap"
            render={({ field }) => (
              <TextField
              required
                id="namaLengkap"
                variant="outlined"
                placeholder="Masukkan Nama Lengkap"
                fullWidth
                style={{marginBottom:"10px"}}
                {...field}
              />
            )}
          />
          <label className={styles.Judul}>Tanggal Lahir</label>
          <div>
          <Controller
            control={control}
            name="tanggalLahir"
            render={({ field }) => (
              <TextField
              required
                id="tanggalLahir"
                variant="outlined"
                type="date"
                fullWidth
                style={{marginBottom:"10px"}}
                {...field}
              />
            )}
          />
          </div>
          <label className={styles.Judul}>Bidang Keahlian</label>
          <Controller
            control={control}
            name="bidangKeahlian"
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="bidangKeahlian"
                  label="bidangKeahlian"
                  placeholder="Bidang Keahlian"
                  onChange={handleChange}
                  {...field}
                >
                  <MenuItem value={"Ilmu Terapan"}>Ilmu Terapan</MenuItem>
                  <MenuItem value={"Ilmu Sosia"}>Ilmu Sosial</MenuItem>
                  <MenuItem value={"Bahasa dan Sastra"}>Bahasa dan Sastra</MenuItem>
                  <MenuItem value={"Ilmu Alam"}>Ilmu Alam</MenuItem>
                  <MenuItem value={"Multimedia"}>Multimedia</MenuItem>
                </Select>
                  
              </FormControl>
            )}
          />
          <label className={styles.Judul}>Jenis Kelamin</label>
          <Controller
            control={control}
            name="setGender"
            render={({ field }) => (
              <FormControl fullWidth
              {...field}
              id="setGender"
              label="bidangKeahlian"
              required
              >
                <div style={{display:"flex"}}>
                <div className={`${styles.Gender} ${selectedBorder === 'Laki-Laki' ? styles.selected : ''}`} onClick={() => handleGenderClick('Laki-Laki')}>
                  <div className={styles.Btn_GenderLak}>
                    <FontAwesomeIcon icon={faMars} />
                    <h6>Laki-Laki</h6>
                  </div>
                  </div>
                  <div className={styles.Gender}>
                  <div className={styles.Btn_GenderPer} onClick={() => handleGenderClick('Perempuan')}>
                    <FontAwesomeIcon icon={faVenus} />
                    <p>Perempuan</p>
                    <img src={faMars} alt="" />
                  </div>
                  </div>
                </div>
                
                
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value={"Laki-Laki"} control={<Radio />} label={
                    <>
                    <FontAwesomeIcon icon={faMars} />
                     Laki - Laki
                    </>
                  } />
                  <FormControlLabel value={"Peremnpuan"} control={<Radio />} label={
                    <>
                    <FontAwesomeIcon icon={faVenus} />
                    Perempuan
                  </>
                  } />
                </RadioGroup>
              </FormControl>
        )}
        />
        </>
      );
    };
  

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <DataDiri />;
    default:
      return "unknown step";
  }
}

const Register = () => {
  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      telpon: "",
      password: "",
      ulangPassword: "",
      namaLengkap: "",
      tanggalLahir: "",
      bidangKeahlian: "",
      setGender:"",
    },
  });

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 1) {
      navigate("/login");
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
    
  // };
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