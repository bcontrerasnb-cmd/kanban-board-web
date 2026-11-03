import { Request, Response } from 'express';
import Card from '../models/Card';

export const createCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, listId, position } = req.body;
        
        const newCard = new Card({ title, description, listId, position });
        await newCard.save();
        
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarjeta', error });
    }
};

// Obtener todas las tarjetas de una lista específica
export const getCardsByList = async (req: Request, res: Response): Promise<void> => {
    try {
        const { listId } = req.params;
        const cards = await Card.find({ listId }).sort({ position: 1 });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tarjetas', error });
    }
};

// Actualizar una tarjeta (mover de lista, cambiar posición, editar título/descripción)
export const updateCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cardId } = req.params; // Obtenemos el ID de la tarjeta desde la URL
        const { title, description, listId, position } = req.body; // Los nuevos datos

        // findByIdAndUpdate busca la tarjeta por ID y actualiza los campos proporcionados
        // { new: true } le dice a Mongoose que nos devuelva el documento actualizado, no el antiguo
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { title, description, listId, position },
            { new: true }
        );

        if (!updatedCard) {
            res.status(404).json({ message: 'Tarjeta no encontrada' });
            return;
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarjeta', error });
    }
};