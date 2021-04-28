const express = require('express');
const { UPDATE } = require('../Controller/SanPham.controller');
const { DELETE } = require('../Controller/SanPham.controller');
const { POST } = require('../Controller/SanPham.controller');
const { GET } = require('../Controller/SanPham.controller');
const ProduceRouter = express.Router();
ProduceRouter.route('/api/product').get(GET).post(POST);
ProduceRouter.route('/api/product/:id').delete(DELETE).put(UPDATE);
module.exports = ProduceRouter;
