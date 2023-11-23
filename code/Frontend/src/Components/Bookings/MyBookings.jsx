import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import Booking from "./Booking";
import NavBar from "../Elements/Navbar";

function MyBookings () {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        request("user/my-bookings")
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                const myData = data[0];
                myData.cars = myData.cars.flat();
                setBookings(myData || {});
            }
            console.log(data);
        });
    }, []);

    if (bookings.length === 0) {
        return (
            <>
                <NavBar />
                <div className="p-20 ">
                    You dont have any bookings
                </div>
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="p-20 ">
                <h1 className="p-5 text-4xl font-bold mb-10">My Bookings</h1>
                {
                    bookings.bookings.map(booking => (
                        <Booking 
                            booking={booking} 
                            car={bookings.cars.find(c => c._id === booking.carId)}
                            user={{ username: "you" }}
                            allowEdit
                            giveRating
                        />
                    ))
                }
            </div>
        </>
    )

}

export default MyBookings;
