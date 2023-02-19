import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import RoomFeature from './RoomFeature'
import DatePicker from 'react-datepicker'
import axios from 'axios'

import { toast } from 'react-toastify'

export default function RoomDetail() {
  const { roomDetail } = useSelector((state) => state.room)
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
      <Head>
        <title>{roomDetail.name} -bookit</title>
      </Head>
      <div className='container container-fluid'>
        <h2 className='mt-5'>{roomDetail.name}</h2>
        <p>{roomDetail.address}</p>
        <div className='ratings mt-auto mb-3'>
          <div className='rating-outer'>
            <div
              className='rating-inner'
              style={{ width: `${(roomDetail.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id='no_of_reviews'>({roomDetail.numOfReviews} Reviews)</span>
        </div>

        <Carousel>
          {roomDetail?.images?.map((image) => (
            <Carousel.Item key={image.public_id}>
              <div style={{ width: '100px', height: '440px' }}>
                <Image
                  className='m-auto display-block'
                  src={image.url}
                  alt={roomDetail.name}
                  layout='fill'
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className='row my-5'>
          <div className='col-12 col-md-6 col-lg-8'>
            <h3>Description</h3>
            <p>{roomDetail.description}</p>

            <RoomFeature roomDetail={roomDetail} />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <div className='booking-card shadow-lg p-4'>
              <p className='price-per-night'>
                <b>${roomDetail.pricePerNight}</b> / night
              </p>
              <hr />
              <p className='mt-5 mb-3'>Pick Check In & Check Out Date</p>
            </div>
          </div>
        </div>
        <div className='reviews w-75'>
          <h3>Reviews:</h3>
          <hr />
        </div>
      </div>
    </>
  )
}
