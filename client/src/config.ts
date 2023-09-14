export const apiHost: string = process.env.DB_HOST || ''
export const apiKey: string = process.env.API_KEY || ''

const config = {
  apiHost,
  apiKey,
}

export default config
