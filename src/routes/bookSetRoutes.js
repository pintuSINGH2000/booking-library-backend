import express from 'express';
import {
  createBookSet,
  getBookSets,
  getBookSetById,
  updateBookSet,
  deleteBookSet
} from '../controllers/bookSetController.js';
import { validate } from '../middleware/validate.js';
import {
  createBookSetSchema,
  updateBookSetSchema,
  idParamSchema,
  queryParamsSchema
} from '../validators/bookSetValidator.js';

const router = express.Router();

router.post('/create', validate(createBookSetSchema), createBookSet);
router.get('/', validate(queryParamsSchema, 'query'), getBookSets);
router.get('/:id', validate(idParamSchema, 'params'), getBookSetById);
router.put('/:id', validate(idParamSchema, 'params'), validate(updateBookSetSchema), updateBookSet);
router.delete('/:id', validate(idParamSchema, 'params'), deleteBookSet);

export default router;
