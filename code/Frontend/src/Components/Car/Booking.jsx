import React from "react";
import fdtojson from "../../utils/fdtojson";
import request from "../../utils/request";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Label from "../Elements/Label";

function Booking ({ car, done, allowEdit }) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = fdtojson(e.target);
        const res = await request(`bookings/book`, {
            method: "POST",
            body,
        });
        if (res.data) {
            window.alert("Booked");
            done()
        }
        else if (res.error) {
            alert(res.error);
        }
        else {
            alert("unknown error");
        }
    }

    return (
        <div className="mt-10 w-1/2">
            <form onSubmit={handleSubmit}>
                <input
                    value={car?._id?._id}
                    name="carId"
                    type="hidden"
                />
                <Label>Date</Label>
                <Input 
                    type="date"
                    name="day"
                />

                <Label>No of days</Label>
                <Input 
                    type="number"
                    name="noOfDays"
                />

                <Button 
                    type="submit"
                >
                    Book Now
                </Button>
            </form>
        </div>
    )
}

export default Booking;
