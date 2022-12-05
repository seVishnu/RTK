import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostsList = () => {
  const posts = useSelector(selectAllPosts); //dont call the function
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date)); //slice to generate a shallow copy of the array
  const renderedPosts = orderedPosts.map((post, index) => (
    <article key={index}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
