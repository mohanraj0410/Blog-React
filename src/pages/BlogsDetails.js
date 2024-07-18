import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import {
  MDBCard, MDBCardBody, MDBCardImage, MDBCardText,
  MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography
} from 'mdb-react-ui-kit';
import Badge from '../components/Badge';

const BlogsDetails = () => {
  const [blog, setBlog] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();

  const getBlogDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${id}`);
      const relatedPostResponse = await axios.get(`http://localhost:5000/blogs/?category=${response.data.category}`);

      if (response.status === 200 && relatedPostResponse.status === 200) {
        setBlog(response.data);
        setRelatedPosts(relatedPostResponse.data);
      } else {
        message.error('Something went wrong!');
      }
    } catch (error) {
      message.error('Error fetching data!');
    }
  };

  useEffect(() => {
    if (id) {
      getBlogDetails();
    }
  }, [id]);

  const excerpt = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  return (
    <MDBContainer className='blogs-details-container'>
      <Link to='/' className='back-link'>
        <MDBIcon className='back-icon' fas icon='long-arrow-alt-left' size='lg' />
        Back to Home
      </Link>
      <div className='blog-title'>
        <MDBTypography tag='h3' className='blog-title-text'>
          {blog?.title}
        </MDBTypography>
      </div>
      <img
        src={blog?.imageURL}
        alt={blog?.title}
        className='blog-image'
      />
      <div className='blog-info'>
        <div className='post-info'>
          <MDBIcon far icon='calendar-alt' size='lg' />
          <strong className='post-date'>
            {blog?.date}
          </strong>
          <Badge className='blog-category'>{blog?.category}</Badge>
        </div>
        <MDBTypography className='blog-description'>
          {blog?.description}
        </MDBTypography>
      </div>
      {relatedPosts.length > 1 && (
        <div className='related-posts'>
          <h3 className='related-posts-title'>Related Posts</h3>
          <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            {relatedPosts.filter(post => post.id !== id).map((post, index) => (
              <MDBCol key={index} className='related-post-col'>
                <MDBCard className='related-post-card'>
                  <Link to={`/blog/${post.id}`} className='related-post-link'>
                    <MDBCardImage src={post.imageURL} alt={post.title} position='top' className='related-post-image' />
                  </Link>
                  <MDBCardBody>
                    <MDBCardTitle className='related-post-title'>{post.title}</MDBCardTitle>
                    <MDBCardText className='related-post-excerpt'>{excerpt(post.description)}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      )}
    </MDBContainer>
  );
};

export default BlogsDetails;
