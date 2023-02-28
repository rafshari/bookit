import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { getAdminRooms, deleteRoom, clearErrors } from '@/redux/actions/roomAction'
import { ALL_ROOM_ADMIN, DELETE_ROOM} from '@/redux/constants/roomConstant'


const AllRooms = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loader, error, roomList:rooms } = useSelector(state => state.room)
    const { error: deleteError, isDeleted } = useSelector(state => state.room.roomDelete)
    
    useEffect(() => {
      dispatch(getAdminRooms())
      return () => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
         if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            dispatch({ type: DELETE_ROOM.reset })
            router.push('/admin/rooms')
        }
      }
    }, [dispatch, deleteError, isDeleted])
    




    const setRooms = () => {
        const data = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        rooms && rooms.forEach(room => {
            data.rows.push({
                id: room._id,
                name: room.name,
                price: `$${room.pricePerNight}`,
                category: room.category,
                actions:
                    <>
                        <Link href={`/admin/rooms/${room._id}`} className="btn btn-primary">
                            
                                <i className="fa fa-pencil"></i>
                          
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteRoomHandler(room._id)}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }

    const deleteRoomHandler = (id) => {
        dispatch(deleteRoom(id))
    }


    return (
        <div className='container container-fluid'>
            {loader.includes(ALL_ROOM_ADMIN.pending) ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${rooms && rooms.length} Rooms`}

                        <Link href='/admin/rooms/new' className="mt-0 btn text-white float-right new-room-btn">
                            Create Room
                        </Link>

                    </h1>


                    <MDBDataTable
                        data={setRooms()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />

                </>
            }
        </div>
    )
}

export default AllRooms
