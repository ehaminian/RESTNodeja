module.exports = {
  origin: `http://localhost:3000`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-type,Authorization',
  jwt_secret: 'secret',
  jwt_max_age: 86400,
  static: 'public',
  port: process.env.PORT || 3000
}
