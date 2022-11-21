import React from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {useAppDispatch} from "../../state/store";
import {loginMeTC} from "../../state/login-reducer";

export const Login = () => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(loginMeTC(values));
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Enter e-mail'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return  {
                    email: 'Invalid email'
                }
            }

            if (!values.password) {
                return {
                    password: 'Enter password'
                }
            }
        }
    });

    return (
        <Grid container justifyContent={'center'}>
            <Grid>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel></FormLabel>

                        <FormGroup>
                            <TextField label='E-mail'
                                       margin='normal'
                                       {...formik.getFieldProps('email')}
                            />
                            {
                                formik.errors.email && formik.touched.email
                                ? <div>{formik.errors.email}</div>
                                : null
                            }

                            <TextField label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       type='password'
                            />
                            {
                                formik.errors.password && formik.touched.password
                                    ? <div>{formik.errors.password}</div>
                                    : null
                            }

                            <FormControlLabel label={'Remember Me'}
                                              control={<Checkbox
                                                  {...formik.getFieldProps('rememberMe')}
                                                  checked={formik.values.rememberMe}
                                                  color={'primary'}/>}
                            />
                            <Button type={'submit'}
                                    color={'primary'}
                                    variant={'contained'}
                            >
                                Login
                            </Button>
                        </FormGroup>

                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
}