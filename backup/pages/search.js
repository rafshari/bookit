import Layout from 'components/layout/Layout';
import Search from 'components/Search';
import React from 'react';

const SearchPage = () =>  {
    return (
        <>
            <Layout title='search room'>
                <Search />
            </Layout>
        </>
    );
};

export default SearchPage

