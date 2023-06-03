import React, { useState } from "react";
import { InputAdornment, InputLabel, Select, MenuItem, ButtonGroup} from '@mui/material';
import { FormControl, FormGroup, FormLabel, TextField, Button, FormHelperText } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import validator from "validator";


const StepOne = ({ nextStep, handleFormData, values }) => {

  const [error, setError] = useState(false);


  const submitFormData = (e) => {
    e.preventDefault();

    if (
      validator.isEmpty(values.username) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.password) ||
      validator.isEmpty(values.lupa)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };

  return (
    
    <div>
          <form onSubmit={submitFormData}>
            <FormGroup className="mb-3">
              <FormLabel>Username</FormLabel>
              <TextField
              style={{ border: error ? "2px solid red" : "" }}
              name="username"
              defaultValue={values.username}
              type="text"
              placeholder="Username"
              variant="outlined"
              onChange={handleFormData("username")}/>
              {error ? (
                <FormHelperText style={{ color: "red" }}>
                  This is a required field
                </FormHelperText>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup >
              <FormLabel>Email</FormLabel>
              <TextField
                style={{ border: error ? "2px solid red" : "" }}
                name="email"
                defaultValue={values.email}
                type="email"
                placeholder="contoh@gmail.com"
                variant="outlined"
                onChange={handleFormData("email")}
              />
              {error ? (
                <FormHelperText style={{ color: "red" }}>
                  This is a required field
                </FormHelperText>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup >
              <FormLabel>Kata Sandi</FormLabel>
              <TextField
                style={{ border: error ? "2px solid red" : "" }}
                name="password"
                defaultValue={values.password}
                type="password"
                placeholder="Terdiri dari huruf dan angka"
                variant="outlined"
                onChange={handleFormData("password")}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><VisibilityIcon/></InputAdornment>,
                }}
              />
              {error ? (
                <FormHelperText style={{ color: "red" }}>
                  This is a required field
                </FormHelperText>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup >
              <FormLabel>Ulang Kata Sandi</FormLabel>
              <TextField
                style={{ border: error ? "2px solid red" : "" }}
                name="lupa"
                defaultValue={values.lupa}
                type="password"
                placeholder="Masukan kata sandi yang sama"
                variant="outlined"
                onChange={handleFormData("lupa")}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><VisibilityIcon/></InputAdornment>,
                }}
              />
              {error ? (
                <FormHelperText style={{ color: "red" }}>
                  This is a required field
                </FormHelperText>
              ) : (
                ""
              )}
            </FormGroup>
            <Button 
              variant="contained"
              type="submit"
              fullWidth 
              style={{color:"white", backgroundColor:"#2196F3"}}>
              Continue
            </Button>
          </form>
    </div>
  )
};

export default StepOne;
