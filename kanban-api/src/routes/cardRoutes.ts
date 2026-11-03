import { Router } from 'express';
import { updateCard, createCard, getCardsByList } from '../controllers/cardController';

const router = Router();

router.post('/', createCard);
router.get('/:listId', getCardsByList);
router.put('/:cardId', updateCard);

export default router;