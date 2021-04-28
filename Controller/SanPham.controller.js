//model
const TestProduct = require('../Model/SanPham.model');
//xu ly du lieu
module.exports = {
	GET: async function (req, res) {
		await TestProduct.find(function (err, data) {
			if (err) {
				return res.status(404).json({ message: err });
			} else {
				const objectData = {};
				data.map((item) => {
					objectData[item._id] = item;
				});
				return res.status(200).json(objectData);
			}
		});
	},
	POST: async function (req, res) {
		console.log('req', req.body);
		await TestProduct.find({ name: req.body.name }, function (err, data) {
			if (err) return res.status(404).json({ message: err });
			else if (data.length >= 1) {
				return res.json({ message: 'Sản phẩm đã tồn tại!' });
			} else if (data.length === 0) {
				return TestProduct(req.body)
					.save()
					.then((product) => {
						res.status(200).json({ message: 'Thêm sản phẩm thành công!' });
					})
					.catch((err) => {
						res.status(404).json({ message: err });
					});
			}
		});
	},
	DELETE: async function (req, res) {
		await TestProduct.findByIdAndRemove({ _id: req.params.id }, function (err, data) {
			if (err) res.status(404).json(err);
			else res.status(200).json({ message: 'Xóa sản phẩm thành công!' });
		});
	},
	UPDATE: async function (req, res) {
		let data = req.body;
		let productId = req.params.id;
		await TestProduct.findById(productId, function (err, response) {
			console.log('response', response);
			if (!response) res.status(404).json({ message: 'Không tìm thấy dữ liệu!' });
			else {
				// if (req.body.name === response.name) {
				// } else{}
				TestProduct.find({ name: req.body.name }, function (err, data) {
					if (err) res.status(404).json({ message: err });
					else if (data.length >= 1) {
						return res.json({ message: 'Sản phẩm đã tồn tại!' });
					} else if (data.length === 0) {
						req.body.name && (response.name = req.body.name);
						req.body.price && (response.price = req.body.price);
						req.body.amount && (response.amount = req.body.amount);
						req.body.status && (response.status = req.body.status);
						response
							.save()
							.then((business) => {
								res.status(200).json({ message: 'SUCCESS' });
							})
							.catch((err) => {
								res.status(400).send({ message: 'Failed to update Product' });
							});
					}
				});
			}
		});
	},
};
