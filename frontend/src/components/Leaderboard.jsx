import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import GroupCard from "./GroupCard";
import AuthContext from "../context/AuthContext";
import Plus from "@geist-ui/icons/plus";
import axios from "axios";
import { Link } from "react-router-dom";

const pageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Leaderboard = () => {
  const { admin, logout } = useContext(AuthContext); // Assuming admin contains the JWT token
  const [showInputs, setShowInputs] = useState(false);
  const [groups, setGroups] = useState(null); // State to store fetched groups
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch groups when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://point-tracker-api.vercel.app/api/groups"
        );
        setGroups(response.data); // Assuming the API returns an array of groups
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [groups, loading]); // Runs when admin.token changes

  const handlePlusClick = () => {
    setShowInputs((prev) => true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://point-tracker-api.vercel.app/api/groups",
        { name: groupName, description },
        {
          headers: {
            Authorization: `Bearer ${admin}`, // Send JWT token in header
          },
        }
      );

      if (response.data) {
        setGroups((prevGroups) => [...prevGroups, response.data]); // Add the newly created group to state
        setGroupName(""); // Reset form fields
        setDescription("");
        setErrorMessage(""); // Clear any previous errors
        setShowInputs((prev) => false);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to create group. Please try again.");
    }
  };

  if (groups) {
    return (
      <motion.div
        className="grid w-full h-svh no-scrollbar"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="flex relative items-center flex-col gap-2 w-full justify-center transition-all duration-300 ease-in-out">
          {admin && (
            <motion.section
              className="md:w-1/5 w-10/12 flex justify-between gap-3 items-center bg-white group rounded-lg"
              initial={{ height: "80px" }}
              animate={{ height: showInputs ? "230px" : "80px" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Plus Icon / Input Fields */}
              <div
                className="flex flex-col items-center text-center justify-center w-full cursor-pointer border-dashed mb-3 border-4 rounded-lg px-4 py-7 sm:px-6"
                onClick={handlePlusClick}
              >
                {!showInputs ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: showInputs ? 135 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="text-2xl" />
                  </motion.div>
                ) : (
                  <motion.form
                    className="flex flex-col gap-2 w-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Group Name"
                      className="border-2 px-2 py-1 rounded-lg"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />

                    <div className="w-full flex flex-col relative">
                      <textarea
                        placeholder="Description"
                        name="description"
                        className="border-2 basis-full px-2 py-1 h-20 resize-none rounded-lg"
                        value={description}
                        maxLength={65}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                        {description.length}/65
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="border-2 px-2 py-1 bg-gray-200 rounded-lg"
                    >
                      Create
                    </button>
                    {errorMessage && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                  </motion.form>
                )}
              </div>
            </motion.section>
          )}

          {/* Group Cards Section */}
          {groups && (
            <motion.div
              className="flex flex-col items-center gap-3 w-full"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2 }, // Stagger each child by 0.2s
                },
              }}
            >
              {groups.sort((a, b) => b.point - a.point).map((group, index) => (
                <motion.div
                className="w-full flex  justify-center"
                  key={group._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.2, // Add delay for each group
                  }}
                >
                  <GroupCard group={group} setLoading={setLoading} />
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="absolute flex gap-2 justify-center items-center text-gray-400 bottom-0">
            <p className="text-xs ">
              build by{" "}
              <a
                href="https://www.instagram.com/ansabazys?igsh=em9iaW95cjFjMTdu"
                className="underline text-gray-400  "
              >
                ansabazys
              </a>
            </p>
            {admin ? <button onClick={logout} className="text-xs hidden md:block">
              logout
            </button> : <Link to={"/login"} className="text-xs hidden md:block">
              admin?
            </Link> }
          </div>
        </div>
      </motion.div>
    );
  }
};

export default Leaderboard;
