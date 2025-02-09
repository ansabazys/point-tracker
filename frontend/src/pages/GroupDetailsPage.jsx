import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AddCategory from "../components/AddCategory";
import Categories from "../components/Categories";
import AuthContext from "../context/AuthContext";
import ArrowLeft from "@geist-ui/icons/arrowLeft";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);
  const [totalPoints, setTotalPoints] = useState(0);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `https://point-tracker-api.vercel.app/api/groups/${id}`
      );
      setGroup(response.data);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchTotalPoints = async () => {
    try {
      const response = await axios.get(
        `https://point-tracker-api.vercel.app/api/groups/${id}/total-points`
      );
      setTotalPoints(response.data.point);
    } catch (error) {
      console.error("Error fetching total points:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGroups();
    fetchTotalPoints();
  }, [id, categories]);

  if (group) {
    return (
      <motion.div
        className="h-dvh flex flex-col items-center justify-center no-scrollbar px-4 mx-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div className="w-full max-w-4xl pt-12 cursor-pointer">
          <ArrowLeft onClick={() => navigate(-1)} />
        </motion.div>

        <motion.div
          className="w-full max-w-3xl bg-white rounded-lg p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        >
          <h1 className="text-3xl font-bold text-gray-900">{group?.name}</h1>
          <p className="text-gray-600 leading-6 m-0">{group?.description}</p>
          <p className="text-xl font-semibold m-0 mt-2 text-green-600">
            Total Points: {group?.point}
          </p>
        </motion.div>

        <motion.div
          className="flex justify-start items-start w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-xl font-semibold m-0 text-gray-900">Categories</h2>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mb-4 bg-white border-4 rounded-3xl grow  px-5 py-1 mt-3 overflow-y-scroll scrollbar-thin"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
        >
          <div className="mt-4 flex flex-col gap-3">
            {admin && (
              <AddCategory
                setLoading={setLoading}
                setCategories={setCategories}
              />
            )}
            {categories?.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Categories category={category} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }
};

export default GroupDetailPage;
