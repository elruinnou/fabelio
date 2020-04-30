import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { List } from '@components/Product'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

configure({ adapter: new Adapter() })

const history = createMemoryHistory()

const dummyItem = {
  delivery_time: '14',
  description: 'Product Description',
  name: 'Product Name',
  price: 88888888,
  furniture_style: ['Classic', 'Midcentury'],
}

const dummyComponentProps = {
  item: dummyItem,
}

describe('Product List component', () => {
  it('should render component properly', () => {
    const componentRenderer = renderer.create(<Router history={history}><List {...dummyComponentProps} /></Router>)
    const tree = componentRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
