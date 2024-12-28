import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa"
import { fbLink, igLink, tiktokLink, xLink } from "../Utils/Utils"

const Footer = () => {
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className=" bg-light text-white py-5">
            <div className="lg:flex items-start gap-32 my-10 justify-center">
                <div className="text-center mb-10">
                    <p className='text-lg font-bold my-3'>FINESSE OASIS</p>
                    <p className='text-lg mb-5 font-medium'>High-grade professional beauty <br /> and care services tailored to <br /> your needs.</p>
                    <div className="lg:flex hidden items-center text-white text-base gap-5">
                        <div className="flex justify-center items-center hover gap-5">
                            <a href={fbLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2 border">
                                <FaFacebook />
                            </a>
                            <a href={igLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2 border">
                                <FaInstagram />
                            </a>
                            <a href={xLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2 border">
                                <FaTwitter />
                            </a>
                            <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2 border">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <p className='text-lg font-bold my-3'>WORKING HOURS</p>
                    <div className="flex items-center justify-center"> <div className='border p-0.5 w-16 my-1 rounded-full bg-primary border-none'></div> </div>
                    <p className='text-base font-semibold mb-2'>We welcome you every day:</p>
                    <p className='text-base mb-4 font-medium'>Monday to Friday: 08:00 - 22:00</p>
                    <p className='mb-6 text-base font-medium leading-4'>Saturday: 08:00 - 20:00</p>
                    <p className='text-base font-medium leading-4'>Sunday: 08:00 - 20:00</p>
                </div>

                <div className="text-center mb-10 ">
                    <p className='text-lg font-bold my-3'>Navigation</p>
                    <div className="flex items-center justify-center"> <div className='border p-0.5 w-16 my-1 rounded-full bg-primary border-none'></div> </div>
                    <div className="flex flex-col">
                        <Link to='/about' className="text-base font-medium leading-5 py-2">About</Link>
                        <Link to='/service' className="text-base font-medium leading-5 py-2">Services</Link>
                        <Link to='/' className="text-base font-medium leading-5 py-2">Home</Link>
                    </div>
                </div>
                <div className="text-center lg:mt-0 mt-10">
                    <p className='text-lg font-bold my-3'>Important</p>
                    <div className="flex items-center justify-center"> <div className='border p-0.5 w-16 my-1 rounded-full bg-primary border-none'></div> </div>
                    <div className="flex flex-col">
                        <Link to='/price' className="text-base font-medium leading-5 py-2"> <div className="" onClick={scrollToTop}>Pricing</div> </Link>
                        <Link to='/testimonial' className="text-base font-medium leading-5 py-2"> <div className="" onClick={scrollToTop}>Testimonials</div> </Link>
                        <Link to='/contact' className="text-base font-medium leading-5 py-2"> <div className="" onClick={scrollToTop}>Contacts</div> </Link>
                    </div>
                </div>
            </div>
            <div className="mx-20 text-sm">
                <div className="border my-5 "></div>
                <div className="lg:flex items-center text-center font-medium justify-between gap-32">
                    <p className="">© CREATED BY OLA CODES</p>
                    <p className="">ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
