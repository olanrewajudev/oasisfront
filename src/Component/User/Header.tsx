
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import { useState } from "react";
import Sidebar from "../Utils/Sidebar";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { fbLink, igLink, xLink, tiktokLink } from "../Utils/Utils";

const Header = () => {
    const [view, setView] = useState(false);

    const toggleView = () => {
        setView(prevView => !prevView);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header>
            {view && <Sidebar closeView={toggleView} />}

            <nav className="fixed w-full bg-light z-10 border-b lg:px-20 px-10 flex justify-between items-center text-navy">
                <Link to="/" onClick={scrollToTop}>
                    <img src={logo} alt="Logo" className="w-24" />
                </Link>
                <div className="lg:flex hidden font-semibold text-white gap-5">
                    <Link to="/" className='flex items-center gap-1'><div onClick={scrollToTop}>Home</div></Link>
                    <Link to="/service" className='flex items-center gap-1'><div onClick={scrollToTop}>Services</div></Link>
                    <Link to="/price" className='flex items-center gap-1'><div onClick={scrollToTop} >Price List</div></Link>
                    <Link to="/booking" className='flex items-center gap-1'><div onClick={scrollToTop} >Booking</div></Link>
                    <Link to="/testimonial" className='flex items-center gap-1'><div onClick={scrollToTop}>Testimonial</div></Link>
                    <Link to="/about" className='flex items-center gap-1'><div onClick={scrollToTop}>About Us</div></Link>
                    <Link to="/contact" className='flex items-center gap-1'><div onClick={scrollToTop}>Contacts</div></Link>
                </div>
                <div className="lg:flex hidden items-center text-white text-lg gap-5">
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
                <div className="lg:hidden cursor-pointer text-white">
                    <SlMenu onClick={toggleView} />
                </div>
            </nav>
            <div className="lg:h-2"></div>
        </header>
    );
};

export default Header;
