import roomDetails from '@/components/room/roomDetails'
import Layout from '@/components/layout/Layout'
import { getRoomDetails } from '@/redux/actions/roomActions'
import { wrapper } from '@/redux/store'

export default function roomDetailsPage() {
  return (
    <Layout>
      <roomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id))
    }
)
