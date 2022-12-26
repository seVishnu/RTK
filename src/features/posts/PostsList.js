import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds); //dont call the function
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date)); //slice to generate a shallow copy of the array
  // const renderedPosts = orderedPosts.map((post, index) => (
  //   <PostsExcerpt key={index} post={post} />
  // ));
  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      {/* <h2>Posts</h2> */}
      {content}
    </section>
  );
};

export default PostsList;
