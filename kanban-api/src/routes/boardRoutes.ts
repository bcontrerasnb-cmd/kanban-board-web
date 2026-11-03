import { Router } from 'express';
import { createBoard, getBoards } from '../controllers/boardController';

const router = Router();

// Cuando hagan un POST a esta ruta, ejecuta "createBoard"
router.post('/', createBoard);

// Cuando hagan un GET a esta ruta, ejecuta "getBoards"
router.get('/', getBoards);

export default router;