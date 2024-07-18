import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { Popconfirm, message } from 'antd';

const Blog = ({ title, category, description, id, imageURL, excerpt, handleDelete }) => {

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <MDBCol className='mb-5 blog-col' size={4}>
            <MDBCard className='h-100 mt-2 blog-card'>
                <MDBCardImage
                    src={imageURL}
                    alt={title}
                    position='top'
                    className='blog-image'
                />
                <MDBCardBody className='d-flex flex-column'>
                    <MDBCardTitle className='blog-title'>{title}</MDBCardTitle>
                    <MDBCardText className='blog-text'>
                        {excerpt(description)}
                        <Link to={`/blog/${id}`} className='read-more-link'>Read More</Link>
                    </MDBCardText>
                    <Badge className='blog-badge'>{category}</Badge>
                    <div className='mt-auto align-self-end'>
                        <Popconfirm
                            title="Delete the Blog"
                            description="Are you sure to delete this Blog?"
                            onConfirm={() => handleDelete(id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <MDBBtn className='delete-btn' tag='a' color='none'>
                                <MDBIcon
                                    fas
                                    icon='trash'
                                    className='delete-icon'
                                ></MDBIcon>
                            </MDBBtn>
                        </Popconfirm>

                        <Link to={`/editBlog/${id}`} className='edit-link'>
                            <MDBIcon
                                fas
                                icon='edit'
                                className='edit-icon'
                            ></MDBIcon>
                        </Link>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};

export default Blog;
