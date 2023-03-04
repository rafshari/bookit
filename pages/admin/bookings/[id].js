import React from 'react'
import { getSession } from 'next-auth/react'

import BookingDetails from '@/components/booking/BookingDetail'
import Layout from '@/components/layout/Layout'


const BookingDetailsPage = () => {
    return (
        <Layout title='Booking Details'>
            <BookingDetails />
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (!session || session.user.role !== 'admin' ) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return {
        props: {
            
        },
    };
};



export default BookingDetailsPage
