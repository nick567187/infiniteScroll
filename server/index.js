const express = require('express');
const app = express();
const parser = require('body-parser');
const morgan = require('morgan');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', express.static('./public'));

app.get('/male', (req, res) => {
	const response = new Array(100).fill({sex: 'Male', age: 10});
  const randomlyEnd = new Array(26).fill({sex: 'Male', age: 10});

  if (Math.random() > 0.7) {
    res.end(JSON.stringify(randomlyEnd));
  }

  res.end(JSON.stringify(response));
});

app.get('/female', (req, res) => {
	const response = new Array(100).fill({sex: 'Female', age: 20});
  const randomlyEnd = new Array(26).fill({sex: 'Male', age: 10});
  
  if (Math.random() > 0.7) {
    res.end(JSON.stringify(randomlyEnd));
  }

  res.end(JSON.stringify(response));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

