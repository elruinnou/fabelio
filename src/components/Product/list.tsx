import React from 'react'
import { IProduct } from './index'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from '@material-ui/core'
import { numberToCurrency } from '../../utils/formatter'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagContainer: {
      'margin': `0px -${theme.spacing(0.5)}px`,
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    infoText: {
      fontSize: theme.spacing(1.5),
      fontStyle: 'italic',
      float: 'right',
    },
  }),
)

interface IListProps {
  item: IProduct,
}

export const List = (props: IListProps) => {
  const { item } = props
  const desc = item.description.length > 114 ? item.description.substring(0, 114) + '...' : item.description
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Grid container alignItems='baseline'>
          <Grid item xs={8}>
            <Typography gutterBottom variant='h5' component='h5'>
              {item.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle1' color='secondary' component='h5' align='right'>
              {numberToCurrency(item.price)}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant='body2' color='textSecondary' component='p' paragraph>
          { desc }
        </Typography>

        <Grid container alignItems='center'>
          <Grid item xs={8} className={classes.tagContainer}>
            {item.furniture_style.map((style: string, index: number) => {
              return <Chip key={index} label={style} color='default' />
            })}
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2' color='textSecondary' className={classes.infoText} align='right'>
              Delivery time:<br/>{item.delivery_time} day(s)
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
