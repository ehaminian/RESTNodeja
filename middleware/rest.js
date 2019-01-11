rest = require('../models/rest')
const { Router } = require('express');
const { bearer_jwt_token } = require('./auth');

const methods = {
  "all": (req, res) => {
    const { table } = req.params;
    const { connection } = req.query;
    rest.all({ table, connection }).then((data) => {
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({err})
    })
  },
  "get": (req, res) => {
    const { table, id } = req.params;
    const { connection } = req.query;
    rest.get({ table, connection, id }).then((data) => {
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({err})
    })
  },
  "post": (req, res) => {
    const { table } = req.params;
    const { connection } = req.query;
    const body = req.body
    rest.post({ table, body, connection }).then((data) => {
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({err})
    })
  },
  "put": (req, res) => {
    const { table, id } = req.params;
    const { connection } = req.query;
    const body = req.body
    rest.put({ table, body, id, connection }).then((data) => {
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({err})
    })
  },
  "delete": (req, res) => {
    const { table, id } = req.params;
    const { connection } = req.query;
    rest.delete({ table, id, connection }).then((data) => {
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({err})
    })
  }
}

module.exports = () => {
  const router = new Router();

  router.use(bearer_jwt_token);

  router.get("/:table/:id", methods.get);
  router.put("/:table/:id", methods.put);
  router.delete("/:table/:id", methods.delete);
  router.get("/:table", methods.all);
  router.post("/:table", methods.post);

  return router;

}