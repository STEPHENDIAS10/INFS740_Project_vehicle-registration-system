import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import NavBar from "../Elements/Navbar";
import AddEditCar from "./AddEditCar";
import Booking from "./Booking";
import Car from "./Car";

function ViewCars () {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toBook, setToBook] = useState();
    const [toEdit, setToEdit] = useState();

    useEffect(() => {
        request("car")
        .then(res => {
            res.forEach(car => {
                car.reviews = car.reviews.flat();
            });
            setCars(res);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return "Loading ..."
    }

    if (toEdit) {
        return (<>
            <AddEditCar 
                prefill={toEdit?._id}
                onDone={(data) => {
                    const index = cars.findIndex(c => c._id === data._id);
                    cars[index] = data;
                    setCars([...cars]);
                    setToEdit(undefined)
                }}
            />
        </>);
    }

    if (toBook) {
        return (
            <>
        <NavBar />
            <div className="px-20">
                <h1 className="p-5 text-4xl font-bold">Book car</h1>
                <Car 
                    car={toBook}
                    onBook={(car) => setToBook(car)}
                    hideBookingButton
                />
                <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                <Booking 
                    car={toBook} 
                    done={() => setToBook(undefined)} 
                />
            </div>
            </>
        )
    }

    return (
        <>
        <NavBar />
        <div className="px-20">
            <h1 className="p-5 text-4xl font-bold">Cars</h1>
            {
                cars.map(car => (
                    <Car 
                        car={car} 
                        onBook={(car) => setToBook(car)}
                        setCarToEdit={() => setToEdit(car)}
                    />
                ))
            }
        </div>
        <div className="px-20">
            <h1 className="p-5 text-4xl font-bold">Bikes</h1>
            {
                cars.map(car => (
                    <Car 
                        car={car} 
                        onBook={(car) => setToBook(car)}
                        setCarToEdit={() => setToEdit(car)}
                    />
                ))
            }
        </div>
        </>
    )
}

export default ViewCars;
