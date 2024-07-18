import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import React from 'react';


const Category = ({ handleCategory }) => {

    const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

    return (
        <MDBCard className="category-card">
            <h4 className="category-title">Categories</h4>
            <MDBListGroup flush>
                {options.map((option, index) => {
                    return (
                        <MDBListGroupItem
                            key={index}
                            className="category-item"
                            onClick={() => handleCategory(option)}
                        >
                            {option}
                        </MDBListGroupItem>
                    );
                })}
            </MDBListGroup>
        </MDBCard>
    );
}

export default Category;
