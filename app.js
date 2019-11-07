if (process.env.NODE_ENV === 'development') require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', require('./routes'));
app.use(require('./middlewares/errorHandler'));

mongoose
	.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongodb connection success'))
	.catch(err => console.log('mongodb connection failed', err));

app.listen(PORT, () => console.log('app listening to port', PORT));
