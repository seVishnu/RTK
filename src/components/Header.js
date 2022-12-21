import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postsSlice";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
