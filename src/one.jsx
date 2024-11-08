// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const API_URL = "https://mongo-crud-psi.vercel.app/api/posts";
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [editPostId, setEditPostId] = useState(null);

//   // Fetch posts when component mounts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setPosts(response.data);
//       } catch (error) {
//         console.log("Error fetching posts", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Create a new post
//   const createPost = async () => {
//     if (!newPost || !newDescription) return;
//     try {
//       const response = await axios.post(API_URL, {
//         Course: newPost,
//         description: newDescription,
//       });
//       setPosts([...posts, response.data]);
//       setNewPost("");
//       setNewDescription("");
//     } catch (error) {
//       console.log("Error creating post", error);
//     }
//   };

//   // Update an existing post
//   const updatePost = async (id) => {
//     try {
//        const response = await axios.put(`${API_URL}/${id}`, {
//         Course: newPost,
//         description: newDescription,
//       });
//       setPosts(
//         posts.map((post) =>
//           post._id === id ? response.data: post
//         )
//       );
//       setEditPostId(null);
//       setNewPost("");
//       setNewDescription("");
//     } catch (error) {
//       console.log("Error updating post", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try { 
//       await axios.delete(`${API_URL}/${id}`);
//       setPosts(posts.filter((post) => post._id !== id));
//     } catch (error) {
//       console.log("Error deleting post", error);
//     }
//   };

//   return (
//     <>
//       <h1>Hello World</h1>
//       <p>Posts</p>
//       <input
//         placeholder="Enter a new Course"
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//       />
//       <input
//         placeholder="Enter a new description"
//         value={newDescription}
//         onChange={(e) => setNewDescription(e.target.value)}
//       />
//       {editPostId ? (
//         <button onClick={() => updatePost(editPostId)}>EDIT POST</button>
//       ) : (
//         <button onClick={createPost}>CREATE POST</button>
//       )}
//       <ol>
//         {posts.map((post) => (
//           <li key={post._id}>
//             <strong>{post.Course}</strong>: {post.description}
//             <button
//               onClick={() => {
//                 setEditPostId(post._id);
//                 setNewPost(post.Course);
//                 setNewDescription(post.description);
//               }}
//             >
//               Edit
//             </button>
//             <button onClick={() => handleDelete(post._id)}>Delete</button>
//           </li>
//         ))}
//       </ol>
//     </>
//   );
// };

// export default App;
 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const App = () => {
  const API_URL = "https://mongo-crud-psi.vercel.app/api/posts";
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  // Create a new post
  const createPost = async () => {
    if (!newPost || !newDescription) return;
    try {
      const response = await axios.post(API_URL, {
        Course: newPost,
        description: newDescription,
      });
      setPosts([...posts, response.data]);
      setNewPost("");
      setNewDescription("");
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  // Update an existing post
  const updatePost = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        Course: newPost,
        description: newDescription,
      });
      setPosts(
        posts.map((post) =>
          post._id === id ? response.data : post
        )
      );
      setEditPostId(null);
      setNewPost("");
      setNewDescription("");
    } catch (error) {
      console.log("Error updating post", error);
    }
  };

  // Delete a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  const handleEdit = (post) => {
    setEditPostId(post._id);
    setNewPost(post.Course);
    setNewDescription(post.description);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Course Manager</h1>

        <div className="flex flex-col gap-4 mb-6">
          <input
            className="input input-bordered w-full p-2"
            placeholder="Enter a new Course"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <input
            className="input input-bordered w-full p-2"
            placeholder="Enter a new description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          {editPostId ? (
            <button
              className="btn btn-warning w-full"
              onClick={() => updatePost(editPostId)}
            >
              Edit Post
            </button>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={createPost}
            >
              Create Post
            </button>
          )}
        </div>

        {/* Display Posts as Cards */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card 
              key={post._id} 
              post={post} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
