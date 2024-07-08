const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 9595;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Articles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const articleSchema = new mongoose.Schema({
  name: String,
  category: String,
  dateCreated: Date,
  creatorName: String,
});

const Article = mongoose.model('Article', articleSchema);

app.post('/articles/add', async (req, res) => {
  const article = new Article(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/articles/update/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/articles/delete/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
