export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    database: {
        connectionString: process.env.MONGO_URL,
    },
    kafka: {
        url: process.env.MS_AUTHENTICATION_KAFKA_URI,
        group_id: process.env.MS_AUTHENTICATION_KAFKA_GROUP_ID,
        clientId: process.env.MS_AUTHENTICATION_KAFKA_CLIENT_ID,
    },
});
