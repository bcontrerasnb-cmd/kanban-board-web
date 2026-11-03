import { Request, Response } from 'express';
import List from '../models/List';

export const createList = async (req: Request, res: Response): Promise<void> => {
    try {
        // Para crear una lista necesitamos su título, a qué tablero pertenece y su posición inicial
        const { title, boardId, position } = req.body; 
        
        const newList = new List({ title, boardId, position });
        await newList.save();
        
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lista', error });
    }
};

// Obtener todas las listas de un tablero específico
export const getListsByBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { boardId } = req.params; // Extraemos el ID de la URL
        // Buscamos las listas y las ordenamos por su campo 'position'
        const lists = await List.find({ boardId }).sort({ position: 1 }); 
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las listas', error });
    }
};