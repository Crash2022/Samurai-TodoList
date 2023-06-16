import React from 'react';
import s from '../../common/styles/Todolist.module.css'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup,
    FormLabel, Grid, TextField,} from '@material-ui/core';
import {FormikHelpers, FormikValues, useFormik} from 'formik';
import {loginThunks} from '../../state/login-reducer';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectAuthIsLoggedIn} from '../../state/selectors';

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        // первая версия
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(loginThunks.loginTC(values));
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
        <Grid container justifyContent={'center'} className={s.loginGrid}>
            <Grid>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <FormControl>
                        <FormLabel className={s.formLabel}>
                            <p>
                                To login get registered <a href={'https://social-network.samuraijs.com'}
                                                           target={'_blank'}>here</a>
                            </p>
                            <p>
                                or use common account credentials
                            </p>
                            <p>
                                <b>E-mail:</b> free@samuraijs.com
                            </p>
                            <p>
                                <b>Password:</b> free
                            </p>
                        </FormLabel>

                        <FormGroup>
                            <div className={s.formGroupEmail}>
                                <TextField label="E-mail"
                                           margin="normal"
                                           style={{width: '252px'}}
                                           {...formik.getFieldProps('email')}
                                />
                                {
                                    formik.errors.email && formik.touched.email
                                        ? <div>{formik.errors.email}</div>
                                        : null
                                }
                            </div>

                            <div className={s.formGroupPassword}>
                                <TextField label="Password"
                                           margin="normal"
                                           style={{width: '252px'}}
                                           {...formik.getFieldProps('password')}
                                           type="password"
                                />
                                {
                                    formik.errors.password && formik.touched.password
                                        ? <div>{formik.errors.password}</div>
                                        : null
                                }
                            </div>

                            <FormControlLabel label={'Remember Me'}
                                              style={{marginBottom: '10px'}}
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