import React from "react";
import ReactStars from 'react-stars';
import request from "../../utils/request";
import Button from "../Elements/Button";

function Car ({ car, onBook, hideBookingButton, setCarToEdit }) {

    const getAverage = (arr) => {
        let sum = 0;
        arr.forEach(i => sum += i.rating);
        return (sum/arr.length)
    }

    const handleDelete = async (car) => {
        const req = await request("car/" + car?._id?._id, {
            method: "DELETE"
        });
        if (!req.error) {
            alert("Deleted")
            window.location.reload();
        }
    }

    return (
        <div className="border-1 p-5 grid grid-cols-4">
            <div>
                <img
                    alt=""
                    src={car?._id?.image || "https://www.aayanauto.com/assets/images/Uploads/201932518145.png"}
                />
            </div>
            <div className="col-span-3 px-5">
                <p className="text-xl font-medium">{car?._id?.title || <i>No title</i>}</p>
                <p>{car?._id?.make} - {car?._id?.year}</p>
                <div className="mt-2" style={{ zIndex: -1 }}>
                    <p className="text-xs font-bold">Rent per day: ${car?._id?.price}</p>
                    <p className="text-xs">{car?.reviews?.length} reviews - {car?.bookings?.length} bookings</p>
                    <ReactStars 
                        count={5}
                        value={getAverage(car?.reviews)}
                        color2={'#ffd700'}
                        size={25}
                    />
                </div>
                <div style={{ position: "absolute", height: 30, marginTop: -30, width: 25 * 5, zIndex: 9999 }} />
                <span className="mt-5">
                    {
                        hideBookingButton ? 
                        <Button onClick={() => onBook(undefined)}>
                            Go Back
                        </Button>
                         :
                    <Button onClick={() => onBook(car)}>
                        Book it
                    </Button>
                    }
                    {
                        hideBookingButton ? null :
                        <span className="ml-1">
                        <Button onClick={() => setCarToEdit(car)}>
                            Edit
                        </Button>
                        </span>
                    }
                    {
                        hideBookingButton ? null :
                        <span className="ml-1">
                        <Button onClick={() => handleDelete(car)}>
                            Delete
                        </Button>
                        </span>
                    }
                </span>
            </div>
        </div>
    );
}

export default Car;
