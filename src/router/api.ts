import {Router} from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

router.get('/ping', apiController.ping);
router.get('/saveUniversits', apiController.saveAllUniversits);
router.get('/universities', apiController.universities);
router.get('/universities/:id', apiController.getUniversitiesId);

router.post('/universities', apiController.postUniversites);

router.put('/universities/:id', apiController.updateUniversities);

router.delete('/universities/:id', apiController.deleteUniversities);

export default router;