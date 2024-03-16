import axios from "axios";
import { useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGetPosts = async () => {
    setLoading(true);

    try {
      const postsRequest = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
      setPostsData(postsRequest.data);
    } catch (error) {
      setError('Error getting posts');
    }

    setLoading(false);
  }

  const handlePostPost = async () => {
    setLoading(true);

    try {
      const newPost = {
        userId: 1,
        id: 101,
        title: 'title',
        body: 'body'
      }
      const postRequest = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost);
      console.log(postRequest.data);
    } catch (error) {
      setError('Error posting post');
    }

    setLoading(false);
  }


  return (
    <div>
      <button onClick={handleGetPosts}>Get posts</button>
      <button onClick={handlePostPost}>Post post</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {postsData.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;