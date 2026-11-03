import { Request, Response } from 'express';
import Board from '../models/Board';

// Crear un nuevo tablero
export const createBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body; // Extraemos el título que envía el cliente
        
        const newBoard = new Board({ title });
        await newBoard.save(); // Guarda en MongoDB
        
        res.status(201).json(newBoard); // Responde con el tablero creado
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tablero', error });
    }
};

// Obtener todos los tableros
export const getBoards = async (req: Request, res: Response): Promise<void> => {
    try {
        const boards = await Board.find(); // Busca todos los tableros en la base de datos
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tableros', error });
    }
};