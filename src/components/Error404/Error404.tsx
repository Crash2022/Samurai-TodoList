import React from 'react'

import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import image404 from '../../assets/images/error404.svg'

import style from './Error404.module.css'

export const Error404 = () => {
  const navigate = useNavigate()

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} style={{ marginTop: '200px' }}>
      <Grid display="flex" justifyContent="center" alignItems="center" gap={'62px'}>
        <Box>
          <Box sx={{ marginBottom: '36px' }}>
            <span className={style.header}>Ooops!</span>
            <p className={style.description}>Sorry! Page not found!</p>
          </Box>
          <Button
            className={style.button}
            variant="contained"
            sx={{ borderRadius: '30px' }}
            onClick={() => {
              navigate('/')
            }}
          >
            Back to home page
          </Button>
        </Box>
        <div>
          <img src={image404} alt={'image-error404'} />
        </div>
      </Grid>
    </Grid>
  )
}
