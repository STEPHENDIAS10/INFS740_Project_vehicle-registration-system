import React, { useMemo } from "react";

function NavBar() {

    const isLoggedIn = useMemo(() => {
        const user = localStorage.getItem("user");
        return !!user;
    }, []);

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Car-Steering-Wheel-Transparent.png"
            class="h-8 mr-3"
            alt=""
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Vehicle Booking
          </span>
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">
            <li>
              <a
                href="/"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Vehicles
              </a>
            </li>
          
            <li>
              <a
                href="/add-car"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Add a Vehicle
              </a>
            </li>
            
            <li>
              <a
                href="/my-bookings"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                My Bookings
              </a>
            </li>
            <li>
              <a
                href="/all-bookings"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                All Bookings
              </a>
            </li>
            {
                isLoggedIn ?
                <>

            <li>
              <a
                href="settings"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Settings
              </a>
            </li>

                <li>
              <a
                onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                }}
                href="#logout"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Log Out
              </a>
            </li>
            </>
                : <>
                    <li>
              <a
                href="/login"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/signup"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Signup
              </a>
            </li>
                </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
