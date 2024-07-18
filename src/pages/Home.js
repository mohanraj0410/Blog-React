import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import Blog from '../components/Blogs';
import SearchBar from '../components/Search';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';

const Home = () => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [latestBlog, setLatestBlog] = useState([])

    const focus = useRef(null)

    const loadBlogData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/blogs");

            if (response.status === 200) {
                setData(response.data);
                setOriginalData(response.data);
            } else {
                message.error('Something went wrong!');
            }
        } catch (error) {
            message.error('Failed to load data.');
        }
    };

    const latestBlogData = async () => {
        const totalBlog = await axios.get("http://localhost:5000/blogs");
        const start = totalBlog.data.length - 4
        const end = totalBlog.data.length
        const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
        if (response.status === 200) {
            setLatestBlog(response.data.reverse());
        } else {
            message.error('Something went wrong!');
        }
    }

    useEffect(() => {
        loadBlogData();
    }, []);

    useEffect(() => {
        latestBlogData()
    }, [data])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`);

            if (response.status === 200) {
                message.success('Blog post deleted successfully!');
                loadBlogData();
            } else {
                message.error('Something went wrong!');
            }
        } catch (error) {
            message.error('Failed to delete the post.');
        }
    };

    const excerpt = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + "...";
        }
        return str;
    };

    const onInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (searchValue === "") {
            setData(originalData);
            return;
        }

        const filteredData = originalData.filter((post) => {
            let title = post.title.toLowerCase().includes(searchValue.toLowerCase());
            let description = post.description.toLowerCase().includes(searchValue.toLowerCase());
            let category = post.category.toLowerCase().includes(searchValue.toLowerCase());
            return title || description || category
        });

        setData(filteredData);
    };

    const handleCategory = (options) => {
        const filteredCategory = originalData.filter((post) => {
            let category = post.category.toLowerCase().includes(options.toLowerCase());
            return category
        });

        setData(filteredCategory);
        if (focus.current) {
            focus.current.scrollIntoView({ behavior: 'smooth' })
        }

    }

    return (
        <div className="home-container">
            <SearchBar searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} className="search-bar" />
            <div ref={focus}></div>
            <MDBRow className='xxx'>
                <MDBCol md="9">
                    <MDBContainer>
                        <MDBRow>
                            {data.length === 0 && (
                                <MDBTypography className='no-blogs-message' tag='h2'>
                                    No blogs Found
                                </MDBTypography>
                            )}
                            {data.map((post, index) => (
                                <Blog key={index} {...post} excerpt={excerpt} handleDelete={handleDelete} className="blog-post" />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol md="3">
                    <h4>Latest Blog</h4>
                    {
                        latestBlog?.map((post, index) => {
                            return (
                                <LatestBlog key={index} {...post} />
                            )
                        })
                    }
                    <Category handleCategory={handleCategory} className="category-section" />
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Home;
