import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookingDetail } from 'redux/actions/bookingAction';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingDetail  ()  {
    const { myBookingDetails } = useSelector((state) => state.booking);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getMyBookingDetail(router.query.id));
    }, [router.query.id]);

    return (
        <>
            {!!Object.keys(myBookingDetails).length && (
                <div className='container'>
                    <div className='row d-flex justify-content-between'>
                        <div className='col-12 col-lg-8 mt-5 booking-details'>
                            <h2 className='my-5'>Booking # {myBookingDetails?._id}</h2>

                            <h4 className='mb-4'>User Info: </h4>
                            <p>
                                <b>Name:</b> {myBookingDetails?.user?.name}
                            </p>
                            <p>
                                <b>phone Number:</b> {myBookingDetails?.user?.phoneNumber}
                            </p>
                            <p>
                                <b>Email:</b> {myBookingDetails?.user?.email}
                            </p>
                            <p>
                                <b>Amount:</b> ${myBookingDetails?.amountPaid || 0}
                            </p>

                            <hr />

                            <h4 className='mb-4'>Booking Info</h4>
                            <p>
                                <b>Check In:</b> {new Date(myBookingDetails?.checkInDate).toLocaleString('en-US')}
                            </p>
                            <p>
                                <b>Check Out:</b> {new Date(myBookingDetails?.checkOutDate).toLocaleString('en-US')}
                            </p>
                            <p>
                                <b>Days of Stay:</b> {myBookingDetails?.daysOfStay}
                            </p>

                            <hr />

                            <h4 className='my-4'>Payment Status</h4>
                            <p className='greenColor'>
                                <b>Paid</b>
                            </p>

                            <h4 className='mt-5 mb-4'>Booked Room:</h4>

                            <hr />
                            <div className='cart-item my-1'>
                                <div className='row my-5'>
                                    <div className='col-4 col-lg-2'>
                                        <Image src={myBookingDetails.room.images[0].url} alt={myBookingDetails.room.name} height={45} width={65} />
                                    </div>

                                    <div className='col-5 col-lg-5'>
                                        <Link href={`/room/${myBookingDetails?._id}`}>
                                            {myBookingDetails?.room?.name}
                                        </Link>
                                    </div>

                                    <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                                        <p>${myBookingDetails?.room?.pricePerNight}</p>
                                    </div>

                                    <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                                        <p>{myBookingDetails?.daysOfStay} Day(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

