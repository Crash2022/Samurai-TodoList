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

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
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
                            <TextField label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       type='password'
                            />
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