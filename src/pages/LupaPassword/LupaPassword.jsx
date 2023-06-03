import React from 'react'
import styles from './Lupa.module.css';
import { TextField } from '@material-ui/core'
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import gambar from '../../../public/image/Daftar.png'
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components';



export default function LupaPassword() {
  const navigate = useNavigate();
  const btnstyle = { marginTop:"30px" }
  const initialValues = {
      Username: '',
      remember: false
  }
  const validationSchema = Yup.object().shape({
      Username: Yup
      .string()
      .required("Username wajib diisi")
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])/,
        "Username harus ada huruf dan angka"
      ),
  })
  const onSubmit = (values, props) => {
      console.log(values)
      setTimeout(() => {
          props.resetForm()
          props.setSubmitting(false)
      }, 2000)
      navigate("/login");

  }
  return (
    <div>
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
          <h6 className={styles.title}>Lupa Kata Sandi</h6>
          <p className={styles.desc}>Silahkan masukan username untuk proses selanjutnya</p>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                      {(props) => (
                          <Form>
                            <div className={styles.tes}>
                            <label className={styles.username}>Username</label>
                              <Field 
                                as={TextField}
                                  name="Username"
                                  placeholder='Username' fullWidth required
                                  helperText={<ErrorMessage name="Username" />}
                                  variant="outlined"
                              />
                            </div>
                              <Button type='submit' variant="contained" disabled={props.isSubmitting} style={btnstyle}
                                    fullWidth>{props.isSubmitting ? "Loading" : "Ajukan Perubahan Kata Sandi"}</Button>
                          </Form>
                      )}
                  </Formik>
          </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}