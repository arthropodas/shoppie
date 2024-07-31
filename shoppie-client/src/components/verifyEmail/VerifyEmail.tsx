"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';// Updated import for client components
import { vendorService } from '@/src/services/apiUrls';
import Swal from "sweetalert2";

export default function VerifyEmail() {
    const [email, setEmail] = useState<string>('');

    const token = useParams();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        // Validate email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }   

        try {
            console.log(" token is availabel",email); 
            const verifyData = {
                email: email,
                token:token.token
            }
          
            const response = await vendorService.verifyEmail( verifyData); 
            console.log("Response is", response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "succesfully verified",
                showConfirmButton: false,
                timer: 1500,
              });
        } catch (error:any) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
          
     
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen border border-red-600 p-6">
            <p className="font-semibold mb-4">
                Click here to verify
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Verify
                </button>
            </form>
        </div>
    );
}
