const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
  
    if (value === undefined) {
      throw Error(`Missing String environment variable for ${key}`);
    }
  
    return value;
};

const NODE_ENV = getEnv("NODE_ENV", "development");
const PORT = getEnv("PORT", "8080");
const CLIENT_ID_ENV = getEnv("CLIENT_ID");
const CLIENT_SECRET_ENV = getEnv("CLIENT_SECRET");
const REDIRECT_URI_ENV = getEnv("REDIRECT_URI");
const MONGO_URI = getEnv("MONGO_URI");

module.exports = {
    NODE_ENV,
    PORT,
    CLIENT_ID_ENV,
    CLIENT_SECRET_ENV,
    REDIRECT_URI_ENV,
    MONGO_URI
};