export const envConfig = () => ({
  PORT: Number(process.env.PORT),
  MLS_INITIAL_ENDPOINT: process.env.MLS_INITIAL_ENDPOINT,
  MLS_TOKEN: process.env.MLS_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
  MLS_DOMAIN: process.env.MLS_DOMAIN,
});
