import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import RoomCard from './room/RoomCard';
import Pagination from 'react-js-pagination';

export default function Home  () {
    const { roomList, filteredRoomsCount, resPerPage, error } = useSelector((state) => state.room);
    const [activePage, setActivePage] = useState(1);
    const router = useRouter();

    const handlePagination = (currentPage) => {
        setActivePage(currentPage);
        router.push({
            pathname: '/',
            query : {...router.query, page: currentPage}
        })
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, []);

    useEffect(() => {
        if (!router.query.page) {
            setActivePage(1);
        } else {
            setActivePage(Number(router.query.page));
        }
    }, [router.query.page]);
    return (
        <>
            <section id='rooms' className='container mt-5'>
                <h2 className='mb-3 ml-2 stays-heading'>{ router.query.location ? `Stays in ${router.query.location}` : 'All Rooms'}</h2>
                <Link href={'/search'} 
                className='ml-2 back-to-search'>
                    
                        <i className='fa fa-arrow-left'></i> Back to Search
                    
                </Link>
                <div className='row'>{roomList && roomList.length === 0 ? <div className='alert alert-danger w-100 text-center mt-5'>No Rooms.</div> : roomList.map((room) => <RoomCard room={room} key={room._id} />)}</div>
            </section>
            {resPerPage < filteredRoomsCount ? (
                <div className='w-100 d-flex justify-content-center mt-5'>
                    <Pagination activePage={activePage} itemsCountPerPage={resPerPage} totalItemsCount={filteredRoomsCount} nextPageText={'Next'} prevPageText={'Prev'} firstPageText={'First'} lastPageText={'Last'} onChange={handlePagination} itemClass='page-item' linkClass='page-link' />
                </div>
            ) : null}
        </>
    );
};

