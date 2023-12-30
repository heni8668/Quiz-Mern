import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from '../controllers/controller.js';

/** Questions Routes API */



// router.get('/questions', controller.getQuestions)
// router.get('/questions', controller.insertQuestions)

router.route('/questions')
        .get(controller.getQuestions)  /**get request */
        .post(controller.insertQuestions) /** post request */
        .delete(controller.dropQuestions) /**delete request */


router.route('/results')
            .get(controller.getResult)  
            .post(controller.storeResult)
            .delete(controller.dropResult)      



export default router;