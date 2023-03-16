import Layout from 'components/layout/Layout'
import { wrapper } from 'redux/store'
import { getRoom } from 'redux/actions/roomAction'
import RoomDetail from 'components/room/RoomDetail'

const RoomPage = () => {
  return (
  
      <Layout>
        <RoomDetail />
      </Layout>
    
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoom(req, params.id))
    }
)

export default RoomPage