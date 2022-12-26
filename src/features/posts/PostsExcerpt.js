import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
// import React from "react";
// let PostsExcerpt = ({ post }) => {
const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body ? post.body.substring(0, 75) : null}</p>
      <p>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
// PostsExcerpt = React.memo(PostsExcerpt);
export default PostsExcerpt;
