import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import Booking from "./Booking";
import NavBar from "../Elements/Navbar";
import Graph from "../Car/Graph";

function Bookings () {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        request("bookings")
        .then(data => {
            setBookings(data);
            console.log(data);
        });
    }, []);

    return (
        <>
            <NavBar />
            <div className="px-20 py-10">
                <Graph />
            </div>
            <div className="p-20 ">
                <h1 className="p-5 text-4xl font-bold mb-10">Bookings</h1>
                {
                    bookings.map(booking => (
                        <Booking 
                            booking={booking} 
                            car={booking.car[0]}
                            review={booking.review[0]}
                            user={booking.bookedBy[0]}
                        />
                    ))
                }
            </div>
        </>
    )

}

export default Bookings;
