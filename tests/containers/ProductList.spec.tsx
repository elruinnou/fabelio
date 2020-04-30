import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductList from '../../src/containers/Pages/Product'
import { List } from '@components/Product'

configure({ adapter: new Adapter() })

describe('product List Screen', () => {
  const setState = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (initState: any) => [initState, setState]
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render properly', () => {
    const componentRenderer = renderer.create(<ProductList />)
    const tree = componentRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should contain List component', () => {
    useStateMock.isFetching = false
    const screen = shallow(<ProductList />)
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    expect(screen.find(List).exists())
  })
})
