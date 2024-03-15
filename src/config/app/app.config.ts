export const appConfig = () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'dev',
  },
});
