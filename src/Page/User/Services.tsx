import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";
import hairdesign from '../../assets/image4.png'
import haircolor from '../../assets/haircolor.png'
import makeups from '../../assets/image2.png'
import manicure from '../../assets/nails5.png'
import pedicure from '../../assets/nail3.png'
import Layout from "../../Component/User/Layout";

const Services = () => {

    return (
        <div>
            <Layout>
                <div className="bg-light text-white py-32 lg:py-20">
                    <div className="text-center text-4xl font-bold my-4">SERVICES</div>
                    <div className="flex items-center justify-center text-center">
                        <span className="font-semibold text-base mx-2">HOME</span>
                        <FaGreaterThan />
                        <span className="underline font-semibold text-base mx-2">SERVICES</span>
                    </div>
                </div>
             
                <div className="mt-20">
                    <div className="mx-auto w-[90%] lg:w-[80%]">
                        <div className="lg:flex items-center mb-8 border gap-6">
                            <img src={hairdesign} alt="" className="w-[180rem] object-cover h-[15rem] lg:h-[28rem]" />
                            <div className="text-navy pb-9 px-10">
                                <p className='text-3xl font-bold my-3'>Hair Design & Style</p>
                                <div className="border p-0.5 w-20 my-5 rounded-full bg-light border-none"></div>
                                <p className='text-lg mb-5 font-semibold'>Whether you have a specific haircut & style in mind or you are looking for a professional to help pick the one that suits you the best, we've got you covered! Our experienced hair stylists are here to create the unique look for you.</p>
                                <Link to='/booking'> <button className='border hover:bg-light lg:mt-10 hover:text-white py-2 text-base font-semibold px-5' type="button">Book Now</button> </Link>
                            </div>
                        </div>

                        <div className="lg:flex items-center mb-8 border gap-6">
                            <img src={haircolor} alt="" className="w-[180rem] lg:hidden object-cover h-[15rem] lg:h-[28rem]" />
                            <div className="text-navy pb-9 px-10">
                                <p className='text-3xl font-bold my-3'>Hair Coloring</p>
                                <div className="border p-0.5 w-20 my-5 rounded-full bg-light border-none"></div>
                                <p className='text-lg mb-5 font-semibold'>Here at Finesse Oasis Beauty Parlour, you will get your coloring right the first trial. Our experts are happy to give their advice on the perfect over all color, highlights or balayage that suit your hairstyle and skin tone and make you stand out.</p>
                                <Link to='/booking'> <button className='border hover:bg-light lg:mt-10 hover:text-white py-2 text-base font-semibold px-5' type="button">Book Now</button> </Link>
                            </div>
                            <img src={haircolor} alt="" className="w-[180rem] hidden lg:flex object-cover h-[15rem] lg:h-[28rem]" />
                        </div>

                        <div className="lg:flex items-center mb-8 border gap-6">
                            <img src={makeups} alt="" className="w-[180rem] object-cover h-[15rem] lg:h-[28rem]" />
                            <div className="text-navy pb-9 px-10">
                                <p className='text-3xl font-bold my-3'>Makeup</p>
                                <div className="border p-0.5 w-20 my-5 rounded-full bg-light border-none"></div>
                                <p className='text-lg mb-5 font-semibold'>Our makeup artists are excited to take your look to the next level while still making you feel like you. We use only popular and high-end makeup brands. You can keep your preferred makeup or let us experiment with new colors & styles.</p>
                                <Link to='/booking'> <button className='border hover:bg-light lg:mt-10 hover:text-white py-2 text-base font-semibold px-5' type="button">Book Now</button> </Link>
                            </div>
                        </div>

                        <div className="lg:flex items-center mb-8 border gap-6">
                            <img src={manicure} alt="" className="w-[180rem] lg:hidden object-cover h-[15rem] lg:h-[28rem]" />
                            <div className="text-navy pb-9 px-10">
                                <p className='text-3xl font-bold my-3'>Manicure</p>
                                <div className="border p-0.5 w-20 my-5 rounded-full bg-light border-none"></div>
                                <p className='text-lg mb-5 font-semibold'>Get your nails done in one of the best manicure salon in the Heart of Lekki! We offer a variety of manicure services and treatments, including Shellac manicure, Hot Oil manicure, SPA nail treatment, Acrylic manicure, Japanese manicure, etc.</p>
                                <Link to='/booking'> <button className='border hover:bg-light lg:mt-10 hover:text-white py-2 text-base font-semibold px-5' type="button">Book Now</button> </Link>
                            </div>
                            <img src={manicure} alt="" className="w-[180rem] hidden lg:flex object-cover h-[15rem] lg:h-[28rem]" />
                        </div>

                        <div className="lg:flex items-center mb-32 border gap-6">
                            <img src={pedicure} alt="" className="w-[180rem] object-cover h-[15rem] lg:h-[28rem]" />
                            <div className="text-navy pb-9 px-10">
                                <p className='text-3xl font-bold my-3'>Pedicure</p>
                                <div className="border p-0.5 w-20 my-5 rounded-full bg-light border-none"></div>
                                <p className='text-lg mb-5 font-semibold'>Get the ultimate treatment for your feet at Finesse Oasis Beauty Parlour! With our services, your feet will always look clean, pretty, and healthy. We offer pedicure with gel polish, jelly pedicure, and a number of luxurious SPA treatments.</p>
                                <Link to='/booking'> <button className='border hover:bg-light lg:mt-10 hover:text-white py-2 text-base font-semibold px-5' type="button">Book Now</button> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </div>
    )
}

export default Services
