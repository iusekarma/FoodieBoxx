import React, { useEffect } from "react";
import { useState } from "react";
import LoginForm from "../components/Loginform.jsx";
import axiosInstance from "../../axiosConfig.js";
import DishesCard from "../components/DishesCard.jsx";

export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [dishes, setDishes] = useState([]);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);
    

    const fetchdishes = async () => {
        const response = await axiosInstance.get('getdishes/');
        console.log("getdishes are: ",response);
        const dishes = response.data.data;
        if (dishes) {
            setDishes(dishes);
        }

    }

    useEffect(() => {
        fetchdishes();
    }, [])




    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <div className="fixed flex justify-between top-6 bg-black w-4/5 rounded-full mx-auto p-6 px-10 text-white shadow-lg">
                <div className="w-fit py-2 px-6 text-white font-semibold" style={{ fontSize: '20px' }}>
                    FOODIEBOX.io
                </div>
                <div className="flex gap-4">
                    <div 
                        className="flex justify-center items-center bg-gray-200 py-2 px-6 rounded-full font-bold text-black hover:bg-gray-300 transition duration-300"
                        onClick={openLogin} 
                    >
                        LOGIN
                    </div>
                    <LoginForm isOpen={isLoginOpen} onClose={closeLogin} />
                    <div className="flex justify-center items-center bg-yellow-300 py-2 px-6 rounded-full font-bold text-black hover:bg-yellow-400 transition duration-300">
                        Signup
                    </div>
                </div>
            </div>
            <section className="w-full mt-40 md:mt-60 flex flex-col items-center" style={{ fontFamily: 'DM Serif Text, serif', fontSize: '80px' }} >
                <div className="text-center text-black mb-4 leading-tight">
                    Craving Delicious? <br/> Order Your Favorite Dishes with <span className="text-amber-500 font-semibold" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }} >FOODIEBOX!</span>
                </div>
                <div className="text-center text-lg text-gray-600 leading-relaxed">
                    Experience the convenience of ordering your favorite meals with just a few clicks.
                </div>
            </section>
            <section className="w-full mt-20 flex flex-col items-center"  >
            
            <div className="flex items-center max-md:flex-col justify-center min-h-screen px-2 gap-8">
            {dishes.length > 0 &&
                dishes.map((dish) => (
                    <DishesCard dish={dish} key={dish.id} />
                ))
            }


                <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="max-w-sm mx-auto">
                    <div
                        className="h-[236px]"
                        style={{
                        backgroundImage: 'url(https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=2000&t=st=1678041911~exp=1678042511~hmac=e4aa55e70f8c231d4d23832a611004f86eeb3b6ca067b3fa0c374ac78fe7aba6)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="p-4 sm:p-6">
                        <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                        Spaghetti with shrimp sauce
                        </p>
                        <div className="flex flex-row">
                        <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">MVR 700</p>
                        <p className="text-[17px] font-bold text-[#0FB478]">MVR 700</p>
                        </div>
                        <p className="text-[#7C7C80] text-[15px] mt-6">
                        Our shrimp sauce is made with mozzarella, a creamy taste of shrimp with an extra kick of spices.
                        </p>
                        <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="foodiesapp://food/1001"
                        className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        >
                        Order                                                
                        </a>
                    </div>
                    </div>
                </div>

                <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="max-w-sm mx-auto">
                    <div
                        className="h-[236px]"
                        style={{
                        backgroundImage: 'url(https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=2000&t=st=1678041911~exp=1678042511~hmac=e4aa55e70f8c231d4d23832a611004f86eeb3b6ca067b3fa0c374ac78fe7aba6)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="p-4 sm:p-6">
                        <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                        Spaghetti with shrimp sauce
                        </p>
                        <div className="flex flex-row">
                        <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">MVR 700</p>
                        <p className="text-[17px] font-bold text-[#0FB478]">MVR 700</p>
                        </div>
                        <p className="text-[#7C7C80] text-[15px] mt-6">
                        Our shrimp sauce is made with mozzarella, a creamy taste of shrimp with an extra kick of spices.
                        </p>
                        <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="foodiesapp://food/1001"
                        className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        >
                        Order
                        </a>
                    </div>
                    </div>
                </div>
            </div>

            </section>

        </div>
    );
}
