import path from 'path';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(8040, () => {
  console.log('Example client established. http://localhost:8040');
});
