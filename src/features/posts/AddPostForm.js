import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    content: "",
  });
  const onDataChange = (e) => {
    switch (e.target.name) {
      case "postTitle":
        setState((state) => ({ ...state, title: e.target.value }));
        break;
      case "postContent":
        setState((state) => ({ ...state, content: e.target.value }));
        break;
      default:
        return state;
    }
  };
  const savePost = (e) => {
    e.preventDefault();
    if (state.title && state.content) {
      dispatch(postAdded(state.title, state.content));
      setState({
        title: "",
        content: "",
      });
    }
  };
  return (
    <section>
      <h2>Add a new Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={state.title}
          onChange={onDataChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={state.content}
          onChange={onDataChange}
        />
        <button onClick={savePost} type="submit">
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
