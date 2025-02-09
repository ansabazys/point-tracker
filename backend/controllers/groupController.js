import Category from "../models/Category.js";
import Group from "../models/Group.js";
import mongoose from "mongoose";

// Controller method to calculate total points for a group
export const calculateTotalPoints = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 Aggregate to calculate total points
    const groupWithPoints = await Group.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match group
      {
        $lookup: {
          from: "categories", // Collection name
          localField: "categories", // Group's category references
          foreignField: "_id", // Match category IDs
          as: "categoriesDetails",
        },
      },
      { $unwind: { path: "$categoriesDetails", preserveNullAndEmptyArrays: true } }, // Flatten array
      {
        $group: {
          _id: "$_id", // Group by group ID
          totalPoints: { $sum: "$categoriesDetails.points" }, // Sum points
        },
      },
    ]);

    if (!groupWithPoints.length) {
      return res.status(404).json({ message: "Group not found or has no categories" });
    }

    const totalPoints = groupWithPoints[0].totalPoints || 0; // Ensure it defaults to 0

    // 🔥 Step 2: Update the Group model with total points
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { point }, // Update totalPoints field
      { new: true } // Return updated document
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({
      message: "Total points updated successfully",
      totalPoints: updatedGroup.totalPoints,
    });
  } catch (error) {
    console.error("Error updating total points:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const createGroup = async (req, res) => {
  const { name, description } = req.body;
  console.log(req.body)
  try {
    const newGroup = new Group({ name, description });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroups = async (req, res) => {
  const groups = await Group.find().populate("categories");
  res.json(groups);
};

export const getGroup = async (req, res) => {
  const {id} = req.params
  const group = await Group.findById(id).populate("categories");
  res.json(group);
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    // Find the group
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Delete categories associated with the group
    await Category.deleteMany({ _id: { $in: group.categories } });

    // Delete the group itself
    await group.deleteOne();

    res.json({ message: 'Group and categories deleted successfully' });
  } catch (error) {
    console.error('Error deleting group and categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
