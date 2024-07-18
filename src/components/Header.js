import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Header = () => {

    const [show, setShow] = useState(false);

    return (
        <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    <img src="/images/logo.jpg" alt='Logo' style={{ height: "30px" }} />
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShow(!show)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse open={show} navbar>
                    <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem className='active'>
                            <MDBNavbarLink aria-current='page' >
                                <Link to={"/"} style={{ color: "black" }} >Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink >
                                <Link to={"/about"} style={{ color: "black" }} >About</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink>
                                <Link to={"/addBlog"} style={{ color: "black" }} >Add Blog</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;