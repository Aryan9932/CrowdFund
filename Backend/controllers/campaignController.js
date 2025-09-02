import Campaign from '../models/campaignModel.js';

// ✅ Create a campaign
export const createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      creator: req.user.id, // Inject user ID
    });

    const saved = await campaign.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Campaign creation error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all campaigns (basic info)
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({}, 'type title goalAmount imageUrl likes');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get campaign by ID (with creator + comments populated)
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('comments.user', 'name email');

    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Like a campaign
export const likeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    campaign.likes += 1;
    await campaign.save();

    res.status(200).json({
      message: 'Liked successfully',
      likes: campaign.likes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get top liked campaigns
export const getTopLikedCampaigns = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1;
    const topCampaigns = await Campaign.find()
      .sort({ likes: -1 })
      .limit(limit);

    res.json(topCampaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get campaigns by type
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

// ✅ Get logged-in user's campaigns
export const myCampaign = async (req, res) => {
  try {
    const my = await Campaign.find({ creator: req.user.id });
    res.status(200).json(my);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns", error: err.message });
  }
};

// ✅ Add a comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Campaign ID
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const comment = {
      user: req.user._id, // ✅ use _id instead of id
      text,
    };

    campaign.comments.push(comment);
    await campaign.save();

    // Populate comments with user info (name, email)
    const updatedCampaign = await Campaign.findById(id)
      .populate("comments.user", "name email");

    res.status(201).json({
      message: "Comment added successfully",
      comments: updatedCampaign.comments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};