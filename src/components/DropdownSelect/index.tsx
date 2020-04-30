import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

interface IMultipleSelectProps {
  id: string
  label: string,
  items: string[],
  onChange: (e: any) => void
}

const MultipleSelect = (props: IMultipleSelectProps) => {
  const {
    id,
    items,
    label,
    onChange,
  } = props
  const classes = useStyles()
  const [value, setValue] = React.useState([])

  const handleChange = (event: any) => {
    setValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={`${id}`}
          multiple
          value={value}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected: any) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {items && items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={value.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MultipleSelect
