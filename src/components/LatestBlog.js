import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const LatestBlog = ({ imageURL, title, id }) => {
    return (
        <div>
            <Link to={`/blog/${id}`}>
                <MDBCard style={{  Width: '300px', height: '80px',marginBottom:'10px' }} className='mt-2'>
                    <MDBRow className='g-0'>
                        <MDBCol md='3'>
                            <MDBCardImage
                                src={imageURL}
                                alt={title}
                                fluid
                                className='latest-img'
                            />
                        </MDBCol>
                        <MDBCol md='9'>
                            <MDBCardBody>
                                <p className='text-start latest-title'>{title}</p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Link>
        </div>
    )
}

export default LatestBlog