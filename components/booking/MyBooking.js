import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import { clearErrors, getMyBookings } from 'redux/actions/bookingAction';
import easyinvoice from 'easyinvoice';

const MyBooking = () => {
    const dispatch = useDispatch();
    const {  loader, error, myBookings } = useSelector((state) => state.booking);

    useEffect(() => {
        console.log(myBookings)
        dispatch(getMyBookings())
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
          }

    }, []);

    const setBooking = () => {
        const data = {
            columns: [
                { label: 'Booking ID', field: 'id', sort: 'asc' },
                { label: 'Check In', field: 'checkin', sort: 'asc' },
                { label: 'Check Out', field: 'checkout', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: !!myBookings.length
                ? myBookings.map((booking) => ({
                      id: booking._id,
                      checkin: new Date(booking.checkInDate).toLocaleString('en-us'),
                      checkout: new Date(booking.checkOutDate).toLocaleString('en-us'),
                      amount: `$${booking.amountPaid || 0}`,
                      actions: (
                          <>
                              <Link href={`/bookings/${booking._id}`} className='btn btn-primary'>
                                  
                                      <i className='fa fa-eye'></i>
                                  
                              </Link>
                              {/* <button className='btn btn-success mx-2' onClick={() => downloadInvoice(booking)}>
                                  <i className='fa fa-download'></i>
                              </button> */}
                          </>
                      ),
                  }))
                : [],
        };
        return data;
    };
    const downloadInvoice = async (booking) => {
        const data = {
            documentTitle: 'Booking INVOICE', //Defaults to INVOICE
            currency: 'USD',
            taxNotation: 'vat', //or gst
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            logo: 'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png',
            sender: {
                company: 'Book IT',
                address: '13th Street. 47 W 13th St',
                zip: '10001',
                city: 'New York',
                country: 'United States',
            },
            client: {
                company: `${booking.user.name}`,
                address: `${booking.user.email}`,
                phoneNumber: `${booking.user.phoneNumber}`,
                zip: '',
                city: `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                country: `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`,
            },
            invoiceNumber: `${booking._id}`,
            invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
            products: [
                {
                    quantity: `${booking.daysOfStay}`,
                    description: `${booking.room.name}`,
                    tax: 0,
                    price: booking.room.pricePerNight,
                },
            ],
            bottomNotice: 'This is auto generated Invoice of your booking on Book IT.',
        };
        const result = await easyinvoice.createInvoice(data);
        console.log(result.pdf)
        await easyinvoice.download(`invoice_${booking_id}.pdf`, result.pdf);
    };
    return (
        <>
            <div className='container container-fluid'>
                <h1 className='my-5'>My Bookings</h1>
                <MDBDataTable data={setBooking()} className='px-3' bordered striped hover />
            </div>
        </>
    );
};

export default MyBooking