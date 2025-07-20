import Campaign from '../models/campaignModel.js';

export const createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      creator: req.user.id   // ✅ inject the user ID from token
    });

    const saved = await campaign.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Campaign creation error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({}, 'type title goalAmount imageUrl');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('creator', 'name email');
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    campaign.likes += 1;
    await campaign.save();

    res.status(200).json({
      message: 'Liked successfully',
      likes: campaign.likes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTopLikedCampaigns = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1; 
    const topCampaigns = await Campaign.find().sort({ likes: -1 }).limit(limit);
    console.log(topCampaigns);
    res.json(topCampaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getCampaignsByType = async (req, res) => {
  try {
    const type = req.params.type;

    const campaigns = await Campaign.find({ type });

    if (campaigns.length === 0) {
      return res.status(404).json({ message: `No campaigns found for type: ${type}` });
    }

    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const myCampaign = async (req, res) => {
  try {
    const my = await Campaign.find({ creator: req.user.id }); // ✅ await
    res.status(200).json(my);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error: error.message });
  }
};

