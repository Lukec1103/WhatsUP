import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string | null;
  backgroundColor: string;
}

export default function Home() {
  const posts: BlogPost[] = JSON.parse(localStorage.getItem('blogPosts') || '[]');

  return (
    <div className="blog-container">
      <h2 className="section-title">BLOGS</h2>
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet. Create one!</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/post/${post.id}`} 
              className="post-link"
            >
              <div 
                className="post-preview" 
                style={{ backgroundColor: post.backgroundColor }}
              >
                {post.image && (
                  <div className="thumbnail-container">
                    <img 
                      src={post.image} 
                      alt="Post thumbnail" 
                      className="post-thumbnail"
                    />
                  </div>
                )}
                <div className="post-text">
                  <h3>{post.title}</h3>
                  <span className="post-date">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}