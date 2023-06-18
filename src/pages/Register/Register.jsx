import React, { useState } from "react";
import {
  Typography,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './Register.module.css'
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useClickOutside } from '../../hooks';

    function getSteps() {
        return [
          "Akun",
          "Data Diri",
        ];
    }
    
    const BasicForm = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [showPasswordAgain, setShowPasswordAgain] = useState(false);
      const {control, watch, formState: { errors } } = useFormContext();const password = watch('password');

      return (
        <> 
        <div className={styles.form}>
          <div className={styles.usernameForm} style={{marginTop:"27px"}}>
					  <span className={styles.label}>Username</span>
							<div className={styles.inputContainer}>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <label>Username</label>,
                    <input
                      className={styles.input}
                      id="username"
                      required
                      label="Username"
                      placeholder="Username"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            
            <div className={styles.emailForm}>
              <span className={styles.label}>Email</span>
                <div className={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <label>Email</label>,
                      <input
                        className={styles.input}
                        required
                        id="email"
                        placeholder="contoh@gmail.com"
                        type="Email"
                        {...field}
                      />
                    )}
                  />
                </div>
            `</div>
             <div className={styles.telponForm} style={{marginTop:"-1.5em"}}>
               <span className={styles.label}>No Telpon</span>
                <div className={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="telpon"
                    render={({ field }) => (
                      <label>No Telpon</label>,
                      <input
                        className={styles.input}
                        required
                        id="telpon"
                        placeholder="08XXXXXXXXXX"
                        type="number"
                        {...field}
                      />
                    )}
                  />
                </div>
             </div>
             <div className={styles.passwordForm}>
              <label className={styles.label}>Kata Sandi</label>
                <div className={styles.inputContainer}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <input
                    className={styles.input}
                      required
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Terdiri dari huruf dan angka" 
                      {...field}
                    />
                  )}
                />
                <FontAwesomeIcon 
                  position="end" 
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{cursor:"pointer"}}
                />
                </div>
            </div>
            <div className={styles.passwordAgainForm}>
             <span className={styles.label}>Ulang Kata Sandi</span>
              <div className={styles.inputContainer}>
                <Controller
                  control={control}
                  name="ulangPassword"
                  rules={{
                    required: 'Ulang kata sandi diperlukan',
                    validate: value => value === password || 'Kata sandi tidak cocok'
                  }}
                  render={({ field }) => (
                    <input
                      className={styles.input}
                      required
                      id="UlangPassword"
                      type={showPasswordAgain ? 'text' : 'password'}
                      onChange={(e) => setShowPasswordAgain(e.target.value)}
                      placeholder="Masukan kata sandi yang sama"
                      {...field}
                    />
                  )}
                />
                <FontAwesomeIcon 
                  position="end" 
                  onClick={() => setShowPasswordAgain(!showPasswordAgain)}
                  icon={showPasswordAgain ? faEyeSlash : faEye}
                  style={{cursor:"pointer"}}
                />
              </div>
              {errors.ulangPassword && (<span className={`${styles.error} ${styles.visible}`}>{errors.ulangPassword.message}</span>
              )}
               {!errors.ulangPassword && (
              <span className={styles.error} style={{ visibility: 'hidden', opacity: 0 }}>
                &nbsp;
              </span>
            )}
            </div>
        </div>
        </>
        
      );
    };

    const DataDiri = () => {
      const { control, setValue  } = useFormContext();
      const [isLearningListOpen, setIsLearningListOpen] = useState(false);
      const [selectedLearning, setSelectedLearning] = useState('');
      const learningListRef = useClickOutside(() => {
        setIsLearningListOpen(false);
      });
      const handleLearningItemClick = (learning) => {
        setValue('bidangKeahlian', learning);
        setSelectedLearning(learning);
        setIsLearningListOpen(false);
      };

      return (
        <>
        <div className={styles.namaLengkapForm}>
          <label className={styles.label} style={{marginTop:"27px"}}>Nama Lengkap</label>
            <div className={styles.inputContainer}>
              <Controller
                control={control}
                name="namaLengkap"
                render={({ field }) => (
                  <input
                    className={styles.input}
                    required
                    id="namaLengkap"
                    placeholder="Masukkan Nama Lengkap"
                    {...field}
                  />
                )}
              />
            </div>
        </div>
        <div className={styles.tanggalForm}>
          <label className={styles.label}>Tanggal Lahir</label>
            <div className={styles.inputContainer}>
              <Controller
                control={control}
                name="tanggalLahir"
                render={({ field }) => (
                  <input
                    className={styles.input}
                    required
                    id="tanggalLahir"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    style={{color:"#9E9E9E", cursor:"pointer"}}
                    {...field}
                  />
                )}
              />
            </div>
        </div>
        <div className={styles.bidangForm}
          style={{marginBottom:"70px", cursor:"pointer"}}
          onClick={() => setIsLearningListOpen(!isLearningListOpen)}
          ref={learningListRef}>
          <label className={styles.label}>Bidang Keahlian</label>
            <div className={styles.inputContainer}>
              <Controller
                control={control}
                name="bidangKeahlian"
                render={({ field }) => (
                  <input disabled
                    required
                    className={styles.input}
                    placeholder="Keahlian yang dimiliki"
                    value={selectedLearning}
                    style={{background:"white", cursor:"pointer"}}
                    {...field}
                  />
                )}
              />
              <KeyboardArrowDownIcon style={{ color: 'black' }} />
              {isLearningListOpen && (
							<div className={styles.learningListContainer}>
                  <label style={{fontWeight:"bold"}}>Bidang Keahlian</label>
                	<span
									style={{ textDecoration: 'none' }}
									className={styles.learningListItem}
                  onClick={() => handleLearningItemClick('Ilmu Terapan')}
                  >
									<span className={styles.learningListItemTitle}>Ilmu Terapan</span>
								</span>
                	<span
									style={{ textDecoration: 'none' }}
									className={styles.learningListItem}
                  onClick={() => handleLearningItemClick('Ilmu Sosial')}>
									<span className={styles.learningListItemTitle}>Ilmu Sosial</span>
								</span>
                	<span
									style={{ textDecoration: 'none' }}
									className={styles.learningListItem}
                  onClick={() => handleLearningItemClick('Bahasa dan Sastra')}>
									<span className={styles.learningListItemTitle}>Bahasa dan Sastra</span>
								</span>
								<span
									style={{ textDecoration: 'none' }}
									className={styles.learningListItem}
                  onClick={() => handleLearningItemClick('Ilmu Alam')}>
									<span className={styles.learningListItemTitle}>Ilmu Alam</span>
								</span>
								<span
									style={{ textDecoration: 'none' }}
									className={styles.learningListItem}
                  onClick={() => handleLearningItemClick('Multimedia')}>
									<span className={styles.learningListItemTitle}>Multimedia</span>
								</span>
							</div>
						)}
            </div>
        </div>
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
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/image/logo-starMyDashboard.png" alt="logo" />
      </div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
            <img src="/image/Daftar.png" alt="/" className={styles.image} />
            <span className={styles.imageText}>Temukan Kembali Akses Akun Anda dengan Mudah</span>
        </div>
        <div className={styles.tampilan}>
          <div className={styles.tampilanHeader}>
            <h2 className={styles.title}>{activeStep === steps.length - 1 ? "Lengkapi Data Diri" : "Buat Akun Mentor" }</h2>
             <span className={styles.desc}>Mulai dengan membuat akun baru</span>
             <div className={styles.Steperr}>
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
             </div>
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
                  style={{color:"white", backgroundColor:"#2196F3", width:"100%"}}
                  variant="contained"
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Tambahkan Akun" : "Lanjut"}
                </Button>
              </form>
            </FormProvider>
            <div className={styles.TextLogin}>
              <p className={styles.deskripsi}>Sudah Punya Akun?</p>
              <Link href="/login" style={{color:"black", textDecoration:"none", fontWeight:"bold"}}>
                <span>Masuk</span>
              </Link>
            </div>
          </div>
                  </>
                )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Register;