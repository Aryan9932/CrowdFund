import express from 'express';
import verifyToken from "../middlewares/verifyToken.js";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  likeCampaign,
  getTopLikedCampaigns,
  getCampaignsByType,
  myCampaign
} from '../controllers/campaignController.js';

const router = express.Router();

// ✅ Routes with auth protection where needed
router.post('/', verifyToken, createCampaign);             // ✅ Protect this!
router.get('/', getAllCampaigns);
router.get('/topliked', getTopLikedCampaigns);
router.get('/type/:type', getCampaignsByType);
router.patch('/:id/like', likeCampaign);
router.get('/mycampaign', verifyToken, myCampaign);        // ✅ Protect this!
router.get('/:id', getCampaignById);

export default router;
