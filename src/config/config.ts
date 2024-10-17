export default () => ({
  database: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  redis: {
    host: process.env.REDIS_HOST ?? '',
    port: Number(process.env.REDIS_PORT) ?? 12726,
    password: process.env.REDIS_PASSWORD ?? '',
    ttl: 5000,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    // algorithm: process.env.JWT_ALGORITHM ?? '',
  },
  port: Number(process.env.PORT) ?? 3000,
});
