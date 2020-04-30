import { List } from './list'

export interface IProduct {
  delivery_time: string
  description: string
  name: string
  price: number
  furniture_style: string[]
  [x: string]: any
}

export {
  List,
}
