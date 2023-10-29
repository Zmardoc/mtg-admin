function formatEur(price: number) {
  const formatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  })

  return formatter.format(price)
}

export default formatEur
