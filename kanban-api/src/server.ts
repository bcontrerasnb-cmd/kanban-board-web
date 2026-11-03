import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import boardRoutes from './routes/boardRoutes';
import listRoutes from './routes/listRoutes'; // <-- NUEVO IMPORT
import cardRoutes from './routes/cardRoutes';

dotenv.config();

// Inicializar base de datos
connectDB();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes); // <-- NUEVA RUTA
app.use('/api/cards', cardRoutes);// Permite recibir JSON en el body de las peticiones

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
    res.send('API del Tablero Kanban funcionando correctamente');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});