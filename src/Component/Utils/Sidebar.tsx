import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaFacebook, FaInstagram, FaTiktok, FaTimes, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import { FaCircleInfo } from 'react-icons/fa6';
import { GrServices } from 'react-icons/gr';
import { IoHome } from 'react-icons/io5';
import { MdRateReview } from 'react-icons/md';
import { PiListFill } from 'react-icons/pi';
import { RiContactsBook3Fill } from 'react-icons/ri';
import { fbLink, igLink, tiktokLink, xLink } from './Utils';

interface Props {
  closeView: () => void;
}

const Sidebar: React.FC<Props> = ({ closeView }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeView();
    }, 300);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5 }}
          className="backdrop-filter backdrop-blur-2xl fixed  top-0 z-[99] left-0 w-[100%] h-screen"
        >
          <div className=" mb-8 border-b ">
            <div className="flex items-center z-50 justify-between">
              <div className="">
                <img src={logo} alt="Logo" className="w-32 ml-10" />
              </div>
              <div className="mr-10 text-2xl text-navy">
                <FaTimes className="cursor-pointer" onClick={handleClose} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 leading-1 mx-10 font-medium gap-3 text-white text-lg">
            <Link to="/" className='flex text-xl font-semibold items-center gap-2'><IoHome /><div onClick={scrollToTop}>Home</div></Link>
            <Link to="/service" className='flex text-xl font-semibold items-center gap-2'><GrServices /><div>Services</div></Link>
            <Link to="/price" className='flex text-xl font-semibold items-center gap-2'><PiListFill /><div onClick={scrollToTop} >Price List</div></Link>
            <Link to="/booking" className='flex text-xl font-semibold items-center gap-2'><FaCalendarCheck /><div onClick={scrollToTop} >Booking</div></Link>
            <Link to="/testimonial" className='flex text-xl font-semibold items-center gap-2'><MdRateReview /><div onClick={scrollToTop}>Testimonial</div></Link>
            <Link to="/about" className='flex text-xl font-semibold items-center gap-2'><FaCircleInfo /><div onClick={scrollToTop}>About Us</div></Link>
            <Link to="/contact" className='flex text-xl font-semibold items-center gap-2'><RiContactsBook3Fill /><div onClick={scrollToTop}>Contacts</div></Link>
          </div>
          <div className="flex justify-center mt-10 text-white text-lg items-center gap-5">
          <a href={fbLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2.5 border ">
                <FaFacebook />
            </a>
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2.5 border ">
                <FaInstagram />
            </a>
            <a href={xLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2.5 border ">
                <FaTwitter />
            </a>
            <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="bg-light p-2.5 border ">
                <FaTiktok />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
