import Layout from 'components/layout/Layout';
import MyBooking from 'components/booking/MyBooking';
import { getSession } from 'next-auth/react';
import React from 'react';

export default function MyBookingPage  ()  {
    return (
        <>
            <Layout title='My bookings'>
                <MyBooking />
            </Layout>
        </>
    );
};


export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
};
