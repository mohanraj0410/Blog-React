import React from 'react';
import {
  MDBContainer, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBCard, MDBCardBody
} from 'mdb-react-ui-kit';

const About = () => {
  return (
    <MDBContainer className='about-container'>
      <MDBTypography tag='h2' className='about-title'>
        About Our Blog
      </MDBTypography>
      <MDBRow className='about-content'>
        <MDBCol md='6'>
          <img
            src='/images/about-us.jpg'
            alt='About Us'
            className='about-image'
          />
        </MDBCol>
        <MDBCol md='6'>
          <MDBTypography tag='h4' className='about-subtitle'>
            Our Mission
          </MDBTypography>
          <MDBCard className='about-card'>
            <MDBCardBody>
              <p className='about-text'>
                Welcome to our blog! We aim to provide insightful articles on various topics including technology, travel, and lifestyle. Our mission is to share knowledge, inspire creativity, and foster a community of curious minds.
              </p>
            </MDBCardBody>
          </MDBCard>
          <MDBTypography tag='h4' className='about-subtitle mt-4'>
            Meet the Team
          </MDBTypography>
          <MDBCard className='about-card'>
            <MDBCardBody>
              <p className='about-text'>
                Our team is composed of passionate writers and enthusiasts from diverse backgrounds. Each of us brings a unique perspective and expertise to our articles. Together, we strive to deliver content that is engaging and informative.
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default About;
