import React from "react";
import Layout from "components/layout/Layout";
import RoomDetail from "components/room/RoomDetails";
import { wrapper } from "redux/store";
import { getRoom } from 'redux/actions/roomAction'

export default function RoomPage() {
  return (
    <>
      <Layout>
        <RoomDetail />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoom(req, params.id));
    }
);
