import { Router } from 'express';
import { createList, getListsByBoard } from '../controllers/listController';

const router = Router();

router.post('/', createList);
// Usamos un parámetro dinámico :boardId en la URL
router.get('/:boardId', getListsByBoard);

export default router;