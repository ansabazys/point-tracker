import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "@geist-ui/icons";
import AuthContext from "../context/AuthContext";

const GroupCard = ({ group, setLoading }) => {
  const { name, description, point, _id } = group;
  const [totalPoints, setTotalPoints] = useState(0);

  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    if (group?.categories) {
      const points = group.categories.reduce(
        (acc, category) => acc + category.points,
        0
      );
      setTotalPoints(points);
    }
  }, [group.categories]); // Dependency on categories

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Make PUT request to update the category
      const response = await axios.delete(
        `https://point-tracker-api.vercel.app/api/groups/${group._id}`,
        {
          headers: {
            Authorization: `Bearer ${admin}`, // Send JWT token in header
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="md:w-1/5 w-10/12 flex items-center  bg-white group transition-all duration-300 ease-in-out rounded-lg">
      {/* Main Content (Shrinks on Hover) */}
      <div
        className="flex justify-between w-full  transition-all duration-300 rounded-lg ease-in-out px-4 border-4  sm:px-6"
        onClick={() => navigate(`/group/${_id}`)}
      >
        <p className="text-2xl">{name}</p>
        <p className={`text-2xl ${totalPoints > 0 && "text-green-600"}`}>
          {totalPoints}
        </p>
      </div>

      {/* Hover Content (Appears Smoothly) */}
      {admin && (
        <div className="w-0 opacity-0 group-hover:w-1/5 group-hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center items-center">
          <Trash2 className="text-xl" onClick={handleDelete} />
        </div>
      )}
    </section>
  );
};

export default GroupCard;
