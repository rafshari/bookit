import room from 'models/room';
import React from 'react';

export default function RoomFeature  ({ roomDetail })  {
    return (
        <>
            <div className='features mt-5'>
                <h3 className='mb-4'>Features:</h3>
                <div className='room-feature'>
                    <i className='fa fa-cog fa-fw fa-users' aria-hidden='true'></i>
                    <p>{roomDetail.guestCapacity} Guests</p>
                </div>

                <div className='room-feature'>
                    <i className='fa fa-cog fa-fw fa-bed' aria-hidden='true'></i>
                    <p>{roomDetail.numOfBeds} Beds</p>
                </div>

                <div className='room-feature'>
                    <i className={roomDetail.breakfast ? 'fa fa-check text-success': 'fa fa-times text-danger'} aria-hidden='true'></i>
                    <p>Breakfast</p>
                </div>

                <div className='room-feature'>
                    <i className={roomDetail.internet ? 'fa fa-check text-success': 'fa fa-times text-danger'} aria-hidden='true'></i>
                    <p>Internet</p>
                </div>
                
                <div className='room-feature'>
                    <i className={roomDetail.airCondition ? 'fa fa-check text-success': 'fa fa-times text-danger'} aria-hidden='true'></i>
                    <p>Air conditioned</p>
                </div>

                <div className='room-feature'>
                    <i className={roomDetail.petsAllowed ? 'fa fa-check text-success': 'fa fa-times text-danger'} aria-hidden='true'></i>
                    <p>Pets Allowed</p>
                </div>
            </div>
        </>
    );
};

