import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { guestOptions, roomTypeOptions } from 'config/roomConfig'; 

export default function Search  ()  {
    const router = useRouter();
    const [searchData, setSearchData] = useState({
        location: '',
        guestCapacity: '',
        category: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchData((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push({
            query:{ ...searchData},
            pathname: '/',
        });
    };
    return (
        <>
            <div className='container container-fluid'>
                <div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg' onSubmit={handleSubmit}>
                            <h2 className='mb-3'>Search Rooms</h2>
                            <div className='form-group'>
                                <label htmlFor='location_field'>Location</label>
                                <input type='text' className='form-control' id='location_field' placeholder='new york' name='location' value={searchData.location} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='guest_field_id'>No. of Guests</label>
                                <select className='form-control' id='guest_field_id' name='guestCapacity' value={searchData.guestCapacity} onChange={handleChange}>
                                <option value=''>Select No. of guest</option>
                                    {guestOptions.map((guest) => (
                                        <option key={guest.id} value={guest.value}>
                                            {guest.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='room_type_field'>Room Type</label>
                                <select className='form-control' id='room_type_field' name='category' value={searchData.category} onChange={handleChange}>
                                    <option value=''>Select Room Type</option>
                                    {roomTypeOptions.map((room) => (
                                        <option key={room.id} value={room.value}>
                                            {room.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type='submit' className='btn btn-block py-7'>
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

