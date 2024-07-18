import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = ({ handleSearch, searchValue, onInputChange }) => {
    const onSearch = () => handleSearch();

    return (
        <Search
            className='searchForm'
            placeholder="Search Your Blog"
            allowClear
            enterButton="Search"
            size="medium"
            value={searchValue}
            type='search'
            onChange={(e) => onInputChange(e)}
            onSearch={onSearch}
        />
    );
}

export default SearchBar;
