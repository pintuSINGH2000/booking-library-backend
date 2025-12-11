import express from 'express';
import {
  getBoards,
  getMediums,
  getClasses,
  getAcademicYears,
  getBooks,
  createMasterData,
  updateMasterData,
  deleteMasterData
} from '../controllers/masterDataController.js';

const router = express.Router();

router.get('/boards', getBoards);
router.get('/mediums', getMediums);
router.get('/classes', getClasses);
router.get('/academic-years', getAcademicYears);
router.get('/books', getBooks);

router.post('/boards', createMasterData('boards'));
router.post('/mediums', createMasterData('mediums'));
router.post('/classes', createMasterData('classes'));
router.post('/years', createMasterData('academic_years'));
router.post('/books', createMasterData('books'));

router.put('/boards/:id', updateMasterData('boards'));
router.put('/mediums/:id', updateMasterData('mediums'));
router.put('/classes/:id', updateMasterData('classes'));
router.put('/years/:id', updateMasterData('academic_years'));
router.put('/books/:id', updateMasterData('books'));

router.delete('/boards/:id', deleteMasterData('boards'));
router.delete('/mediums/:id', deleteMasterData('mediums'));
router.delete('/classes/:id', deleteMasterData('classes'));
router.delete('/years/:id', deleteMasterData('academic_years'));
router.delete('/books/:id', deleteMasterData('books'));

export default router;
