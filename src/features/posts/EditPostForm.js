import { useState } from "react";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: post?.title,
    content: post?.body,
    userId: post?.userId,
    requestStatus: "idle",
  });
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  const onDataChange = (e) => {
    switch (e.target.name) {
      case "postTitle":
        setState((state) => ({ ...state, title: e.target.value }));
        break;
      case "postContent":
        setState((state) => ({ ...state, content: e.target.value }));
        break;
      case "postAuthor":
        setState((state) => ({ ...state, userId: Number(e.target.value) }));
        break;
      default:
        return state;
    }
  };
  const canSave =
    [state.title, state.content, state.userId].every(Boolean) &&
    state.requestStatus === "idle";
  const savePost = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setState((prev) => ({ ...prev, requestStatus: "pending" }));
        dispatch(
          updatePost({
            id: post.id,
            title: state.title,
            body: state.content,
            userId: state.userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setState((prev) => ({ ...prev, title: "", content: "", userId: "" }));
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setState((prev) => ({ ...prev, requestStatus: "idle" }));
      }
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setState((prev) => ({ ...prev, requestStatus: "pending" }));
      dispatch(deletePost({ id: post.id })).unwrap();
      setState((prev) => ({ ...prev, title: "", content: "", userId: "" }));
      navigate("/");
    } catch (error) {
      console.log("Failed to delete the post!", error);
    } finally {
      setState((prev) => ({ ...prev, requestStatus: "idle" }));
    }
  };
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={state.title}
          onChange={onDataChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={state.userId}
          onChange={onDataChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={state.content}
          onChange={onDataChange}
        />
        <button onClick={savePost} type="submit" disabled={!canSave}>
          Save Post
        </button>
        <button onClick={onDeletePostClicked} type="button">
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
