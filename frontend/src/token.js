export const fetchToken = async () => {
  const response = await fetch('http://localhost:5004/token')
  const data = await response.json()
  return data
}
