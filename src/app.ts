import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './app/utils/swagger';

const app: Application = express();
const swaggerSpec = swaggerJSDoc(options);
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('Shut up and code!');
});

app.use(globalErrorHandler);

export default app;
