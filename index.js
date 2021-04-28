const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProduceRouter = require('./Router/SanPham');
const app = express();
const url_DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/BanHang';
const port = process.env.PORT || 2111;
mongoose
	.connect(url_DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(
		() => {
			console.log('Database is connected');
		},
		(err) => {
			console.log('Can not connect to the database ' + err);
		}
	);
// Fix lỗi cors
app.use(cors());
app.listen(port, function () {
	console.log('CORS-enabled web server listening on port 80:', port);
});
// bodyParser.json() trả về một function và khi function đó được dùng làm đối số cho app.use, nó hoạt động giống như bất kỳ middleware khác
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Router
app.use(ProduceRouter);
