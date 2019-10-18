import { Router } from 'express';

export default function createRouter(controller) {
  const {
    createOne,
    deleteOne,
    getOne,
    getAll,
    updateOne,
    replaceOne
  } = controller;

  const router = Router();
  router.post('/', createOne);
  router.get('/', getAll);
  router.get('/:id', getOne);
  router.delete('/:id', deleteOne);
  router.put('/:id', replaceOne);
  router.patch('/:id', updateOne);
  return router;
}
