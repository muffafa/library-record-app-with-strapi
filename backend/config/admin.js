module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '908d59efdd3474c49535a1865028499b'),
  },
});
