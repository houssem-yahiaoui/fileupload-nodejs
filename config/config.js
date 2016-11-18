module.exports = {
  dev: {
    port: process.env.port || 3000,
    db  : process.env.DB_LINK || "mongodb://127.0.0.1/testgridfs"
  },
  prod: {
    //TODO !
  }
}
