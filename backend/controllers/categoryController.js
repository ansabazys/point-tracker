import Category from "../models/Category.js";
import Group from "../models/Group.js";

export const createCategory = async (req, res) => {
  try { 
    // Destructure the incoming data from the frontend
    const { name, position, points, groupId } = req.body;

    console.log(req.body)

    // Validate the fields
    if (!name || !position || !points || !groupId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the new category
    const newCategory = new Category({
      name,
      position,
      points,
      groupId
    });

    console.log(newCategory)

    // Save the new category to the database
    await newCategory.save();
    

    // Add the category reference to the group (optional, depending on your design)
    // You can also do this after saving the category if needed.
    const group = await Group.findById(groupId);
    if (group) {
      group.categories.push(newCategory._id); // Push category ID into the group's `categories` array
      await group.save();
    }

    // Return a success response
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("groupId", "name");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "groupId",
      "name"
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category Controller
export const updateCategory = async (req, res) => {
  console.log(req.body)
  try {
    // Find and update the category by its ID
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id, // Get category ID from URL
      req.body.categoryData,       // The updated data from the frontend
      { new: true }   // Return the updated category (not the old one)
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory); // Return the updated category as response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return an error message if something goes wrong
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
