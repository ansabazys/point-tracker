import { ArrowUpRight, Edit2, Trash2 } from "@geist-ui/icons";
import { useContext, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";

const Categories = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: category.name,
    position: category.position,
    points: category.points,
  });
  const { admin } = useContext(AuthContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make PUT request to update the category
      const response = await axios.put(
        `https://point-tracker-api.vercel.app/api/categories/${category._id}`,
        { categoryData },
        {
          headers: {
            Authorization: `Bearer ${admin}`, // Send JWT token in header
          },
        }
      );

      // Handle the successful update response
      console.log("Updated Category:", response.data);
      closeModal(); // Close modal after successful update
    } catch (error) {
      // Handle any errors during the update process
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make PUT request to update the category
      const response = await axios.delete(
        `http://localhost:5000/api/categories/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${admin}`, // Send JWT token in header
          },
        }
      );

      // Handle the successful update response
      console.log("Updated Category:", response.data);
      closeModal(); // Close modal after successful update
    } catch (error) {
      // Handle any errors during the update process
      console.error("Error updating category:", error);
    }
  };

  return (
    <section className="flex items-center bg-white group transition-all duration-300 ease-in-out rounded-lg">
      {/* Main Content (Shrinks on Hover) */}
      <div className="flex justify-between w-full p-3 rounded-lg border-2">
        <div className="flex justify-center gap-2 items-center">
          {category.position === 1 ? (
            <img src={first} className="size-5" />
          ) : category.position === 2 ? (
            <img src={second} className="size-5" />
          ) : (
            category.position === 3 && <img src={third } className="size-5" />
          )}
          <span className="text-gray-700">{category.name}</span>
        </div>

        <span className="text-green-500 font-medium">
          {category.points} pts
        </span>
      </div>

      {/* Hover Content (Appears Smoothly) */}
      {admin && (
        <div className="w-0 gap-8 opacity-0 group-hover:w-1/5 group-hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center items-center">
          <div className="flex justify-center gap-6 items-center bg-gray-100">
            <Edit2 onClick={openModal} size={16} className="cursor-pointer" />

            {/* Modal component usage */}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              handleButton={handleSubmit}
              title="Edit Category"
            >
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="border-2 px-2 py-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Category Name"
                    name="name"
                    value={categoryData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="border-2 px-2 py-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Position"
                    name="position"
                    value={categoryData.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="border-2 px-2 py-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Points"
                    name="points"
                    value={categoryData.points}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end mt-4"></div>
              </form>
            </Modal>
            <Trash2
              size={16}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
