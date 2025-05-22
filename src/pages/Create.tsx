import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  image: string | null;
  date: string;
}

export default function Create() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#e0e0e0');
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const blogPost: BlogPost = {
      id: Date.now(),
      title,
      description,
      backgroundColor: selectedColor,
      image,
      date: new Date().toLocaleDateString('en-GB') // DD/MM/YYYY format
    };
    
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    localStorage.setItem('blogPosts', JSON.stringify([...existingPosts, blogPost]));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const handleColorChange = () => {
    const colors = ['#e0e0e0', '#f8d7da', '#fff3cd', '#d1e7dd', '#cfe2ff'];
    const currentIndex = colors.indexOf(selectedColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setSelectedColor(colors[nextIndex]);
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-title">CREATE BLOG</h2>
      
      <div className="form-container" style={{ backgroundColor: selectedColor }}>
        <button className="close-button" onClick={handleCancel}>×</button>
        
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-left">
              <div className="input-group">
                <label className="input-label">add title</label>
                <input 
                  type="text" 
                  className="text-input" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">add description</label>
                <textarea 
                  className="textarea-input" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-right">
              <div className="input-group">
                <input 
                  type="file" 
                  id="image-upload" 
                  accept="image/*" 
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="image-upload">
                  {image ? (
                    <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <div className="plus-icon">+</div>
                      <div className="upload-text">add img</div>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-footer">
            <button 
              type="button" 
              className="color-selector" 
              onClick={handleColorChange}
            >
              Choose color
            </button>
            <button type="submit" className="post-button">post</button>
          </div>
        </form>
      </div>
    </div>
  );
}