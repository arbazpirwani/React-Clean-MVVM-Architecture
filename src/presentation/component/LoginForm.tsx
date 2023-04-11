import React, {useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Validation} from "../../domain/validation/Validation";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

function LoginForm({onSubmit}: LoginFormProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    let email = useRef("");
    let password = useRef("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        email.current  = event.target.value
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        password.current =  event.target.value
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            onSubmit(email.current, password.current);
        }
    };


    const validateInputs = () => {
        const errors: { [key: string]: string } = {};
        const emailValid = Validation.validateEmail(email.current);
        if (emailValid !== true) {
            errors.email = 'Email not valid';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    console.log("In Login form");
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
                id="email"
                label="Email"
                required
                name="email"
                fullWidth
                autoComplete="email"
                autoFocus
                type="email"
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
            />

            <TextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                required
                autoComplete="current-password"
                fullWidth
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>} label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign In
            </Button>
            <Grid container>
                <Grid item xs><Link href="login#" variant="body2">Forgot password?</Link></Grid>
                <Grid item><Link href="login#" variant="body2">{"Don't have an account? Sign Up"}</Link></Grid>
            </Grid>
        </Box>

    );
}

export default LoginForm;