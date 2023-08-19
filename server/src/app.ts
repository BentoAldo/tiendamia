import express from 'express';
import cors from 'cors';

import ordersRouter from './routes/orders';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());


app.use('/', ordersRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0::${PORT}`);
});
