const Redis = require('redis');

let redisClient;

exports.connectWithRedis = async () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
    console.log(`Redis connected!`);
  } catch (error) {
    console.log(`Redis connection error: ${error}`);
    process.exit(1);
  }
};

exports.setOrGetCache = async (key, callback) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) {
        reject(err);
      }
      if (data != null) {
        resolve(JSON.parse(data));
      }
      const freshdata = await callback();
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshdata));
      resolve(freshdata);
    });
  });
};
