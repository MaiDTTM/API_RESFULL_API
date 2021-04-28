const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Khai báo một Schema
const product = new Schema({
	name: {
		type: String,
		required: true,
	}, // String is shorthand for {type: String}
	price: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	update_create: {
		type: Date,
		required: true,
		default: new Date().getTime(),
	},
	create: {
		type: Date,
		required: true,
		default: new Date().getTime(),
	},
});
//Thực hiện chuyển đổi từ Schema sang Model
module.exports = mongoose.model('product', product, 'product');
