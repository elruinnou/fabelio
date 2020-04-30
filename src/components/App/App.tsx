import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import style from '@components/App/App.scss'
import { routes } from '@routes/index'
import {
  Container,
  Typography,
} from '@material-ui/core'

export const App = () => {
  return (
    <Container maxWidth='md' style={{
      background: '#ffffff',
      borderRadius: 3,
    }}>
      <Router>
        <div className={style.routeWrapper}>
          {routes.map((route: any, index: number) => (
            <Route key={index} {...route} />
          ))}
        </div>
      </Router>
      <Typography variant='body2' color='textSecondary' align='center' style={{
        bottom: 15,
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        fontSize: 10,
      }}>
        {`Copyright © Fabelio ${new Date().getFullYear()}.`}
      </Typography>
    </Container>
  )
}
