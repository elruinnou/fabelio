import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { IProduct } from '@components/Product/index'
import { List } from '@components/Product/list'
import MultipleSelect from '@components/DropdownSelect'
import {
  Container,
  CircularProgress,
  Grid,
  TextField,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import ProductService from '../../../services/ProductSevices'

interface IProductState {
  errorMessage: string,
  isError: boolean,
  isFetching: boolean,
  products: IProduct[],
  vertical: any,
  horizontal: any,
  furnitureStyleList: string[],
  filteredProducts: IProduct[],
  [listFilter: string]: any,
}

const ProductList = () => {
  const didmountEffect = useRef(true)
  const [productState, setProductState] = useState<IProductState>({
    errorMessage: '',
    isError: false,
    isFetching: true,
    products: [],
    vertical: 'top' as const,
    horizontal: 'center' as const,
    furnitureStyleList: [],
    filteredProducts: [],
    listFilter: {
      nameFilter: '',
      deliveryTimeFilter: '',
      furnitureStyleFilter: '',
    },
  })

  const {
    errorMessage,
    isError,
    isFetching,
    products,
    vertical,
    horizontal,
    furnitureStyleList,
    filteredProducts,
    listFilter,
  } = productState

  const { nameFilter, deliveryTimeFilter, furnitureStyleFilter } = listFilter
  const deliveryTimeList = ['1 week', ' 2 weeks', '1 month', 'more']
  const deliveryTimeListInWeek = [1, 2, 4, 5]
  function Alert(props: any) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  async function fetchProductList() {
    ProductService().getProductList()
      .then((result: any) => {
        const isSuccess = result.status === 200
        const fetchedProducts = result.data.products

        // for testing purpose
        // products[products.length] = {
        //   delivery_time: '45',
        //   description: 'Woles juga nyampenya',
        //   furniture_style: ['Midcentury'],
        //   name: 'Forbyta Sofa Bed Woles',
        //   price: 8999000,
        // }

        setProductState({
          ...productState,
          errorMessage: result.error ? 'Please try again later' : '',
          isError: isSuccess ? false : true,
          isFetching: false,
          products: isSuccess ? fetchedProducts : null,
          filteredProducts: isSuccess ? fetchedProducts : null,
          furnitureStyleList: result.data.furniture_styles,
        })
        return true
      }).catch(() => {
        setProductState({
          ...productState,
          errorMessage: 'Failed. Please try again later',
          isError: true,
          isFetching: false,
        })
      })
  }

  function filterName(product: IProduct) {
    return product.name.toLowerCase().includes(nameFilter.toLowerCase()) && product
  }

  function filterDeliveryTime(product: IProduct) {
    let currentFilteredProduct: IProduct = null
    const productDeliveryTimeInWeek = Math.ceil(parseInt(product.delivery_time, 0) / 7)

    deliveryTimeFilter.map( (filter: string) => {
      const selectedIndexFilter = deliveryTimeList.indexOf(filter)
      const selectedFilterInWeek = deliveryTimeListInWeek[selectedIndexFilter]
      if (selectedFilterInWeek <= 2) {
        if (productDeliveryTimeInWeek === selectedFilterInWeek) {
          currentFilteredProduct = product
        }
      } else if (selectedFilterInWeek > 2 && selectedFilterInWeek <= 4) {
        if (productDeliveryTimeInWeek > 2 && productDeliveryTimeInWeek <= 4) {
          currentFilteredProduct = product
        }
      } else {
        if (productDeliveryTimeInWeek > 4) {
          currentFilteredProduct = product
        }
      }
    })
    return currentFilteredProduct
  }

  function filterFurniture(product: IProduct) {
    let currentFilteredProduct: IProduct = null
    product.furniture_style.map( (style: string) => {
      if (furnitureStyleFilter.indexOf(style) > -1) {
        currentFilteredProduct = product
      }
      return style
    })
    return currentFilteredProduct
  }

  function filteringList() {
    let filteredList: IProduct[] = products
    if (nameFilter !== '') {
      filteredList = filteredList.filter(filterName)
    }

    if (deliveryTimeFilter.length) {
      filteredList = filteredList.filter(filterDeliveryTime)
    }

    if (furnitureStyleFilter.length) {
      filteredList = filteredList.filter(filterFurniture)
    }

    setProductState({
      ...productState,
      filteredProducts: filteredList,
    })
  }

  function handleClose() {
    setProductState({
      ...productState,
      isError: false,
      errorMessage: '',
    })
  }

  function handleFilterChange(values: any, filter: string) {
    listFilter[filter] = values
    setProductState({
      ...productState,
      listFilter,
    })
  }

  useEffect(() => {
    fetchProductList()
  }, [])

  useLayoutEffect(() => {
    if (didmountEffect.current) {
      didmountEffect.current = false
      return
    }
    filteringList()
  }, [nameFilter, deliveryTimeFilter, furnitureStyleFilter])

  return (
    <div style={{marginTop: 100, paddingTop: 80, paddingBottom: 30}}>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal}}
        key={`${vertical},${horizontal}`}
      >
        <Alert onClose={handleClose} severity='error'>{errorMessage}</Alert>
      </Snackbar>
      <AppBar color='default' position='fixed'>
        <Toolbar>
          <Container maxWidth='md'>
            <Grid container spacing={3} style={{marginBottom: 16}}>
              <Grid item xs={12}>
                <TextField
                  placeholder='Search Furniture'
                  fullWidth
                  margin='normal'
                  value={nameFilter}
                  onChange={(e) => handleFilterChange(e.currentTarget.value, 'nameFilter')}
                />
              </Grid>
              <Grid item xs={6}>
                <MultipleSelect
                  id='furniture-style'
                  label='Furniture Style'
                  items={furnitureStyleList}
                  onChange={(e) => handleFilterChange(e, 'furnitureStyleFilter')}
                />
              </Grid>
              <Grid item xs={6}>
                <MultipleSelect
                  id='delivery-time'
                  label='Delivery Time'
                  items={deliveryTimeList}
                  onChange={(e) => handleFilterChange(e, 'deliveryTimeFilter')}
                />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      { isFetching ? <CircularProgress /> :
        <Grid container spacing={3} style={{marginBottom: 16}}>
          { filteredProducts.length ?
            filteredProducts.map( (item: IProduct, index: number) => {
              return(
                <Grid key={index} item xs={12} sm={6}>
                  <List item={item} />
                </Grid>
              )
            })
          :
          <Grid item xs={12}>
            <Typography variant='h2' gutterBottom color='textSecondary'>
              No Data Found.
            </Typography>
          </Grid>
        }
        </Grid>
      }
    </div>
  )
}

export default ProductList
