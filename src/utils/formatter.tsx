/* eslint-disable import/prefer-default-export */
export const numberToCurrency = (currencyNumber: number) => {
  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'idr',
  })
  return formatter.format(currencyNumber).replace('Rp', 'IDR').replace(',00', '')
}
