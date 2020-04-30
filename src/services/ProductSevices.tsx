import axios from 'axios'

const ProductService = () => {
  const instance = axios.create()

  const getProductList = () => instance.get('http://www.mocky.io/v2/5c9105cb330000112b649af8')
    .then((response) => response)
    .catch((error) => error.response.data)

  return {
    getProductList,
  }
}

export default ProductService
