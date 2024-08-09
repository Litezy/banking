import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'

export default function Forminput({ onChange, formtype, isError, label, name, placeholder, value, children }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='mb-3'>
      <FormControl fullWidth error={isError}>
        {formtype === 'checkbox' && <FormControlLabel  control={<Checkbox />} label={placeholder} />}
        <InputLabel className='bg-white py-1 px-4' htmlFor="component-outlined">{label}</InputLabel>
        {formtype === 'select' &&
          <>
            <Select
              labelId="demo-simple-select-label"
              value={value}
              label="Age"
              onChange={onChange}
            >
              <MenuItem value={''}>--Select--</MenuItem>
              {children}
            </Select>
          </>}
        {formtype === 'text' &&
          <OutlinedInput name={name} value={value} />
        }
        {formtype === 'password' &&
          <>
            {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </>}
        {isError && <FormHelperText>Error</FormHelperText>}
      </FormControl>


    </div>
  )
}
