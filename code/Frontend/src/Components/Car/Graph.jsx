import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/request";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookings per day',
      },
    },
  };

function Graph () {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        request("bookings")
        .then(data => {
            setBookings(data);
            console.log(data);
        });
    }, []);

    
    const data = useMemo(() => {
        const count = {};
        bookings.forEach(b => {
            if (count[b.day]) {
                count[b.day]++;
            }
            else {
                count[b.day] = 1;
            }
        });
        return {
            labels: Object.keys(count),
            datasets: [{
                label: "Bookings",
                data: Object.keys(count).map(key => count[key]),
                backgroundColor: 'rgba(59, 91, 208, 1)',
            }],
        };
    }, [bookings]);

    console.log("DATA", data);


    return (
        <div style={{ width: "100%", height: 400 }}>
        <Bar 
            data={data}
            options={options}
        />
        </div>
    )
}

export default Graph;
