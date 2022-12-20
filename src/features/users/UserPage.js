import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  return <div>UserPage</div>;
};

export default UserPage;
