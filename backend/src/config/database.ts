export const databaseConfig = {
  database: process.env.DB_NAME || "style_journey_db",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres" as const,
};

export const jwtConfig = {
  accessSecretKey: process.env.ACCESS_SECRET_KEY || "access_secret_key",
  refreshSecretKey: process.env.REFRESH_SECRET_KEY || "refresh_secret_key",
  accessTokenExpiry: "15min",
  refreshTokenExpiry: "7d",
};

export const serverConfig = {
  port: parseInt(process.env.PORT || "5000"),
  nodeEnv: process.env.NODE_ENV || "development",
};
