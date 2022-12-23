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
import {FormikHelpers, FormikValues, useFormik} from "formik";
import {loginTC} from "../../state/login-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAuthIsLoggedIn} from "../../state/selectors";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        // первая версия
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values));
        },

        // версия с подсветкой отдельного поля
        // onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
        //     // alert(JSON.stringify(values));
        //     const response = await dispatch(loginTC(values));
        //
        //     if (loginTC.rejected.match(action)) {
        //         if (action.payload?.fieldsErrors?.length) {
        //             const error = action.payload?.fieldsErrors[0];
        //             formikHelpers.setFieldError(error.field, error.error);
        //         }
        //     }
        // },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Enter e-mail'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
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

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{marginTop: '30px'}}>
            <Grid>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>

                        <FormLabel style={{textAlign: 'center'}}>
                            <p>
                                To login get registered <a href={'https://social-network.samuraijs.com'}
                                                           target={'_blank'}>here</a>
                            </p>
                            <p>
                                or use common account credentials
                            </p>
                            <p>
                                E-mail: free@samuraijs.com
                            </p>
                            <p>
                                Password: free
                            </p>
                        </FormLabel>

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
                                                  color={'primary'}
                                              />}
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