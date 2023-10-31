function formatCzk(price: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 2,
  })

  return formatter.format(price)
}

export default formatCzk
