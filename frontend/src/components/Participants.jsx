import { useEffect, useState } from "react";
import { getParticipants, addParticipant } from "../services/api";

const Participants = ({ categoryId }) => {
  const [participants, setParticipants] = useState([]);
  const [chestNumber, setChestNumber] = useState("");
  const [position, setPosition] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      const res = await getParticipants(categoryId);
      setParticipants(res.data);
    };
    fetchParticipants();
  }, [categoryId]);

  const handleAddParticipant = async () => {
    await addParticipant(categoryId, chestNumber, position, points);
    setChestNumber("");
    setPosition("");
    setPoints("");
    window.location.reload();
  };

  return (
    <div>
      <input type="text" placeholder="Chest Number" onChange={(e) => setChestNumber(e.target.value)} />
      <input type="text" placeholder="Position (1 or 2)" onChange={(e) => setPosition(e.target.value)} />
      <input type="text" placeholder="Points" onChange={(e) => setPoints(e.target.value)} />
      <button onClick={handleAddParticipant}>Add Participant</button>
      {participants.map((p) => (
        <p key={p._id}>{p.chestNumber} - {p.position} - {p.points} Points</p>
      ))}
    </div>
  );
};

export default Participants;
