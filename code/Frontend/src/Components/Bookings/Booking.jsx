import moment from 'moment';
import React, { useRef, useState } from 'react';
import ReactStars from 'react-stars';
import fdtojson from '../../utils/fdtojson';
import request from '../../utils/request';
import Button from '../Elements/Button';
import Input from '../Elements/Input';
import Label from '../Elements/Label';

function Booking ({ booking, car, review, user, giveRating, rerender }) {

    const [editBooking, setEditBooking] = useState(false);
    const [reviewEditing, setReviewEditing] = useState(false);
    const ratingRef = useRef();

    if (!car) {
        return;
    }

    const handleReview = async (e) => {
        e.preventDefault();

        const body = fdtojson(e.target);
        const res = await request(`reviews`, {
            method: "POST",
            body,
        });

        if (res.error) {
            alert(res.error);
        }

        alert("Reviewd!!");

        console.log(res);

    }

    const handleBookingUpdate = async (e) => {
        e.preventDefault();
        const body = fdtojson(e.target);

        await request(`bookings/${body.id}`, {
            method: "PUT",
            body,
        });

        window.location.reload();
    }

    const deleteBooking = async (id) => {
        await request(`bookings/${id}`, { method: "Delete" });
        window.location.reload();
    }

    const editReview = async (id, feedback) => {
        const newFeedback = window.prompt("Your feedback", feedback);
        await request(`reviews/${id}`, {
            method: "PUT",
            body: {
                feedback: newFeedback,
            }
        });
        window.location.reload();
    }

    const deleteReview = async (id) => {
        await request(`reviews/${id}`, { method: "DELETE" });
        window.location.reload();
    }

    return (
        <div className='border-1 p-5 grid grid-cols-4'>
            <div>
                <img
                    alt=""
                    src={car?.image || "https://www.aayanauto.com/assets/images/Uploads/201932518145.png"}
                />
            </div>
            <div className="col-span-3 px-5">
                <p className="text-xl font-medium">{car?.title || <i>No title</i>}</p>
                <p>{car?.make} - {car?.year}</p>
                {
                    editBooking ?
                        <form onSubmit={handleBookingUpdate}>
                        <input
                            value={booking?._id}
                            name="id"
                            type="hidden"
                        />
                        <Label>Date</Label>
                        <Input 
                            type="date"
                            name="day"
                            defaultValue={booking?.day}
                        />

                        <Label>No of days</Label>
                        <Input 
                            type="number"
                            name="noOfDays"
                            defaultValue={booking?.noOfDays}
                        />

                        <Button 
                            type="submit"
                        >
                            Update
                        </Button>
                        <span className='ml-2'/>
                        <Button 
                            type="button"
                            onClick={() => setEditBooking(false)}
                        >
                            Cancel
                        </Button>
                    </form>
                    : <> 
                    <p>
                        Booking started from {moment(new Date(booking.day)).format("MMMM DD, YY")} 
                        for {booking.noOfDays} days by {user?.username}
                    </p>
                    <div>
                        <span 
                            className='cursor-pointer text-xs underline'
                            onClick={() => setEditBooking(true)}
                        >Edit</span>
                        <span 
                            className='cursor-pointer text-xs underline ml-2'
                            onClick={() => deleteBooking(booking?._id)}
                        >Delete Booking</span>
                    </div>
                    </>
                }
                {
                    review ?
                    <div className='mt-5'>
                    { review?.feedback ? <i>“{review?.feedback}”</i> : null }
                    {
                        review?.feedback && 
                        <div>
                            <span 
                                className='cursor-pointer text-xs underline'
                                onClick={() => editReview(review?._id, review?.feedback)}
                            >Edit</span>
                            <span 
                                className='cursor-pointer text-xs underline ml-2'
                                onClick={() => deleteReview(review?._id)}
                            >Delete Review</span>
                        </div>
                    }
                    <br/>
                    {review?.rating} stars
                    </div> : 
                    giveRating ?
                    <div className='mt-5'>
                        <form onSubmit={handleReview}>
                            <input type="hidden" name="bookingId" value={booking._id} />
                            <ReactStars 
                                count={5}
                                size={25}
                                onChange={(e) => {
                                    if (ratingRef?.current) {
                                        ratingRef.current.value = e;
                                    }
                                }}
                            />
                            <div className='mt-4' />
                            <input type="hidden" name="rating" ref={ratingRef} />
                            <Input 
                                placeholder="Your feedback"
                                name="feedback"
                            />
                            <Button>
                                Review
                            </Button>
                        </form>
                    </div>
                    : null
                }
            </div>
        </div>
    )

}

export default Booking;
