import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const planetsController = require('./controller/planets');

const port = 3000;
const app = express();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req: Request, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/api/planets', planetsController.getAll);
app.get('/api/planets/:id', planetsController.getOneById);
app.post('/api/planets', planetsController.create);
app.post('/api/planets/:id/image', upload.single('image'), planetsController.createImg);
app.patch('/api/planets/:id', planetsController.updateById);
app.delete('/api/planets/:id', planetsController.deleteAPlanet);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong...');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
