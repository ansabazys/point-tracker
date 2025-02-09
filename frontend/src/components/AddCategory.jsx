import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";


const AddCategory = ({ setLoading, setCategories }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    points: "",
    groupId: id,
  });

  const { admin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name === "position") {

      if (value === "1" || value === "2" ) {
        setFormData({
          ...formData,
          [name]: value,
        });  
      }
      
    }

  

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.points) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);  // Optional: Show loading state

    try {
      const response = await axios.post(
        "https://point-tracker-api.vercel.app/api/categories",
        formData,
        {
          withCredentials: true
        }
      );

      // Add the newly created category to the categories state
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, response.data.category];
        console.log("Updated Categories:", updatedCategories);  // Check the updated state
        return updatedCategories;
      });

      // Reset the form data after submission
      setFormData({
        name: "",
        position: "",
        points: "",
        groupId: id,
      });

      setLoading(false);  // Optional: Hide loading state
    } catch (error) {
      console.error("Error adding category:", error);
      setLoading(false);  // Optional: Hide loading state on error
    }
  };

  return (
    <form className="flex flex-wrap gap-4" onSubmit={handleSubmit}>
      <div className="flex justify-between w-full p-3 border-2 border-dashed">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Category Name"
          className="w-full"
        />
      </div>
      <div className="flex justify-between p-3 border-2 grow border-dashed">
        <input
          type="number"
          maxLength={1}
          name="position"
          
          value={formData.position}
          onChange={handleInputChange}
          placeholder="Position"
          className="w-20"
        />
      </div>
      <div className="flex justify-between p-3 border-2 grow border-dashed">
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleInputChange}
          placeholder="Points"
          className="w-20"
        />
      </div>
      <button
        type="submit"
        className="border-2 px-4 py-1 bg-gray-200 rounded-lg"
      >
        Add Category
      </button>
    </form>
  );
};


export default AddCategory;
