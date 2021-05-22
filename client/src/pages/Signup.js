import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Button,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import AppIcon from "../images/icon.png";
import themeObject from "../util/theme";

// Custom styles
const useStyles = makeStyles(themeObject);

const Signup = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const newUserData = {
            email,
            password,
            confirmPassword,
            handle,
        };

        axios
            .post("/signup", newUserData)
            .then((res) => {
                setLoading(false);
                localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
                history.push("/");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                setErrors(error.response.data);
            });
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.form}
        >
            <Grid item sm={4} xs={12}>
                <img src={AppIcon} alt="Monkey" className={classes.image} />
                <Typography variant="h5" className={classes.pageTitle}>
                    Sign Up Form
                </Typography>

                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        type="text"
                        id="handle"
                        name="handle"
                        label="User Handle"
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        onChange={(event) => setHandle(event.target.value)}
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                        Sign Up{" "}
                        {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.progress}
                            />
                        )}
                    </Button>

                    {errors.general && (
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {errors.general}
                        </Typography>
                    )}

                    <br />
                    <br />
                    <small>
                        Already have an account ? Login{" "}
                        <Link to="/login" className={classes.anchor}>
                            here
                        </Link>
                    </small>
                </form>
            </Grid>
        </Grid>
    );
};

export default Signup;
