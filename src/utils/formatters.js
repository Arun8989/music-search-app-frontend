export const formatDuration = (seconds = 0) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = `${seconds % 60}`.padStart(2, '0')
  return `${minutes}:${remainder}`
}

export const formatLargeNumber = (value = 0) =>
  new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
