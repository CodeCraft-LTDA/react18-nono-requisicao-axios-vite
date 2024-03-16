import axios, { AxiosError } from "axios";
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

  // axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
  const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

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

  const handleGetPostsWithBaseUrl = async () => {
    setLoading(true);

    try {
      const postsRequest = await api.get<Post[]>('/posts');
      setPostsData(postsRequest.data);
    } catch (error) {
      setError('Error getting posts');
    }

    setLoading(false);
  }

  const handleGetPostsWithError = async () => {
    setLoading(true);

    try {
      const postsRequest = await axios.get<Post[]>('https://jsonplaceholder2.typicode.com/posts');
      setPostsData(postsRequest.data);
    } catch (error) {
      const errorResponse = error as AxiosError;
      setError(errorResponse.message);
    }

    setLoading(false);
  }


  return (
    <div>
      <button onClick={handleGetPosts}>Get posts</button>
      <button onClick={handlePostPost}>Post post</button>
      <button onClick={handleGetPostsWithBaseUrl}>Get posts with base url</button>
      <button onClick={handleGetPostsWithError}>Get posts with error</button>

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