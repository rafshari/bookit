import Layout from 'components/layout/Layout';
import Home from 'components/Home';
import { wrapper } from 'redux/store';
import { getAllRoom } from 'redux/actions/roomAction';
export default function HomePage() {
    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
    const { page, location, guestCapacity, category } = query;
    await store.dispatch(getAllRoom(req, page, location, guestCapacity, category));
});
