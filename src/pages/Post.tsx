import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  image: string | null;
  date: string;
}

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const posts: BlogPost[] = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post not found!</div>;
  }

  const handleDelete = () => {
    const updatedPosts = posts.filter((p) => p.id !== Number(id));
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    navigate('/');
  };

  return (
    <div 
      className="post-container" 
      style={{ backgroundColor: post.backgroundColor }}
    >
      <div className="post-header">
        <div>
          <h1 className="post-title">{post.title}</h1>
          <span className="post-date">{post.date}</span>
        </div>
        <div className="menu-container">
          <button 
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="post-content">
        {post.image && (
          <img 
            src={post.image} 
            alt="Post cover" 
            className="post-image"
          />
        )}
        <p className="post-description">{post.description}</p>
      </div>
    </div>
  );
}