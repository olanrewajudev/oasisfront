import { Link } from 'react-router-dom';

import Header from "../../Component/User/Header";
import hair from '../../assets/hair.png'
import hair2 from '../../assets/hair2.png'
import makeup from '../../assets/makeup3.png'
import nail from '../../assets/nails.png'
import office from '../../assets/office.png'
import about from '../../assets/makeup.png'
import icon1 from '../../assets/icon4.svg'
import icon2 from '../../assets/icon1.svg'
import icon3 from '../../assets/icon3.svg'
import icon4 from '../../assets/icon2.svg'
import Package from '../../assets/hair3.png'
import hairdesign from '../../assets/image4.png'
import haircolor from '../../assets/haircolor.png'
import makeups from '../../assets/image2.png'
import makeup2 from '../../assets/makeup2.png'
import makeup4 from '../../assets/makeup4.png'
import manicure from '../../assets/nails5.png'
import pedicure from '../../assets/nail3.png'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/hair4.png'
import image3 from '../../assets/image3.png'
import image4 from '../../assets/tools.png'
import image5 from '../../assets/tools1.png'
import image6 from '../../assets/nails4.png'
import image7 from '../../assets/image.png'
import Footer from '../../Component/User/Footer';
import Slider from 'react-slick';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { settings } from '../../Component/Utils/Utils';

interface SpeacilizeItem {
    image: string;
    text: string;
    link: string;
}

interface PackageItem {
    text: string;
    droptext: string;
    id: number;
}
interface ServiceItem {
    image: string;
    text: string;
    link: string;
    linktext: string;
    droptext: string;
    id: number;
}

interface AboutItem {
    image: string;
    text: string;
    paragraph: string;
}

const Speacilize: SpeacilizeItem[] = [
    { image: hair, text: 'Hair', link: 'View More' },
    { image: makeup, text: 'Makeup', link: 'View More' },
    { image: nail, text: 'Nails', link: 'View More' },
];

const Service: ServiceItem[] = [
    { image: hairdesign, droptext: `Whether you have a specific haircut & style in mind or need a professional to help pick the one that suits you the best, we've got you covered! Our experienced hair stylists are here to create the look that compliments your uniqueness`, text: 'Hair Design', linktext: 'Learn More', link: '', id: 1 },
    { image: haircolor, droptext: `Here at Finesse Oasis, you will get your coloring right the first trial. Our experts are happy to give their advice on the perfect all-over color, highlights or balayage that suit your hairstyle and skin tone and make you stand out.`, text: 'Hair Colouring', linktext: 'Learn More', link: '', id: 2 },
    { image: makeups, droptext: `Our makeup artists are excited to take your look to the next level while still making you feel like you. We use a wide range of popular and high-end makeup brands. You can stay with your preferred makeup or let our team experiment.`, text: 'Makeup', linktext: 'Learn More', link: '', id: 3 },
    { image: manicure, droptext: `Get your nails done in one of the best manicure salons in the Heart of Lekki! We offer a variety of manicure services and treatments, including Shellac manicure, Hot Oil manicure, SPA nail treatment, Acrylic manicure, Japanese manicure, etc. `, text: 'Manicure', linktext: 'Learn More', link: '', id: 4 },
    { image: pedicure, droptext: 'Get the ultimate treatment for your feet at Beauty Parlour! With our services, your feet will always look clean, pretty, and healthy. We offer pedicure with gel polish, jelly pedicure, and a number of luxurious SPA treatments.', text: 'Pedicure', linktext: 'Learn More', link: '', id: 5 },
];
const Packages: PackageItem[] = [
    {
        droptext: `Whether you have a specific haircut & style in mind or need a professional to help pick the one that suits you the best, we've got you covered! Our experienced hair stylists are here to create the look that compliments your uniqueness`,
        text: 'Beauty Escape',
        id: 1
    },
    {
        droptext: `Here at Finesse Oasis Beauty Parlour, you will get your coloring right at first trial. Our experts are happy to give their advice on the perfect over all color. Highlights or balayage that suit your hairstyle and skin tone and make you stand out.`,
        text: 'Express Beauty',
        id: 2
    },
    {
        droptext: `Our makeup artists are excited to take your look to the next level while still making you feel like you. We use a wide range of popular and high-end makeup brands. You can stay with your preferred makeup or let our team experiment.`,
        text: 'Beauty Energy',
        id: 3
    },
];

const About: AboutItem[] = [
    { image: icon1, text: 'Online Booking', paragraph: 'See free time slots in our calendar and book your visit online.' },
    { image: icon2, text: 'Express Packages', paragraph: `Are you in a hurry? We'll make you look brilliant in just 1 hour.` },
    { image: icon3, text: '100% Organic Cosmetics', paragraph: 'We use the best vegan and organic cosmetics brands.' },
    { image: icon4, text: 'Perfect Makeup', paragraph: 'Our makeup artists will help you find your best makeup style.' },
];

const imageSlider = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
    { image: image5 },
    { image: image6 },
    { image: image7 },
]
const Home = () => {
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});

    const toggleService = (id: number) => {
        setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };


    return (
        <div>

            <div className="">
                <div>
                    <Header />
                </div>

                <div className="">
                    <div className="banner w-full h-[35rem] text-center">
                        <div className="lg:pt-32 text-white pt-24 lg:mx-32 mx-6 font-bold">
                            <p className="lg:text-5xl text-3xl my-3">Welcome To F.A Finesse Oasis</p>
                            <p className="lg:text-lg">We're thrilled to have you here! Book your escape to tranquility with us today. Our luxurious spa treatments, soothing massages, and rejuvenating facials are just a few clicks away. Let our expert therapists pamper you and help you feel your best. Start your journey to relaxation now by booking your appointment online.</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="">
                <div className="lg:mb-32 mb-20 mt-10 lg:mt-20">
                    <div className="lg:mx-32 mx-10 text-navy">
                        <p className="text-sm font-semibold">FINESSE OASIS BEAUTY PARLOUR</p>
                        <span className="lg:flex items-center justify-between">
                            <h2 className='lg:text-5xl text-3xl my-5 font-bold'>ENHANCE YOUR BEAUTY AND UNIQUENESS</h2>
                            <Link to=''> <button className='border my-4 y py-5 text-lg font-semibold px-7' type="button">Book a Visit</button> </Link>
                        </span>
                        <p className="text-xl font-semibold">Let our beauty experts make you feel and look your best!</p>
                    </div>
                </div>
                <div className="border my-6 lg:hidden"></div>
            </div>

            <div>
                <div className="lg:mb-[8rem] mb-20">
                    <div className="grid lg:flex lg:mx-32 mx-10 items-center justify-center sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-hidden ">
                        {Speacilize.map((item, i) => (
                            <div key={i} className="transform lg:hover:scale-105 relative group">
                                <img src={item.image} alt={item.text} className="w-full object-cover lg:h-[25rem] h-[15rem] transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:brightness-75" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center lg:opacity-0 group-hover:opacity-100 bg-black/75 duration-300">
                                    <span className="text-white text-2xl">{item.text}</span>
                                    <Link to='/service' className='border py-2 mt-4 text-lg font-semibold px-4 text-white'>
                                        {item.link}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border my-10 lg:hidden bg-primary"></div>
            </div>
            
            <div>
                <div className="lg:my-[10rem] mt-20">
                    <div className="lg:flex lg:items-start items-center lg:w-[75%] lg:gap-20 gap-5 mx-10 lg:mx-auto justify-center">
                        <img src={about} alt="about" className="lg:w-[30rem] w-[29rem] object-cover" />
                        <div className="text-navy px-">
                            <h6 className='font-semibold italic my-5'>ABOUT US</h6>
                            <p className='text-4xl font-bold my-3'>A PLACE WHERE YOU FEEL MAGICAL AND PEACEFUL</p>
                            <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                            <p className='text-xl mb-5 font-semibold'>Blending both creativity, flawless technique, and dedication.</p>
                            <p className='mb-6 text-lg font-medium leading-5'>Finesse Oasis Beauty Parlour provides clients with beauty services of the highest quality. We are second to none when it comes to professionalism and understanding of beauty trends.</p>
                            <p className='text-lg font-medium leading-5'>Our skilled and passionate makeup artists and hair stylists are at your service to make you feel and look your best. Finesse Oasis Beauty Parlour  is committed to customer satisfaction, hygiene, cleanliness, latest equipment, high-quality products, and services.</p>
                        </div>
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>
            </div>

            <div>
                <div className="text-navy">
                    <div className="lg:flex items-center justify-center lg:mx-32 mx-10 gap-10">
                        {About.map((item, i) => (
                            <div key={i} className="mb-9">
                                <img src={item.image} alt="" className="w-16" />
                                <span className="">
                                    <p className='text-xl font-bold mt-4'>{item.text}</p>
                                    <div className="border p-0.5 w-16 my-3 rounded-full bg-primary border-none"></div>
                                </span>
                                <p className="text-lg"> {item.paragraph} </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>
            </div>

            <div>
                <div className="lg:my-[7rem] mt-20">
                    <div className="lg:flex lg:items-start items-center lg:w-[75%] lg:gap-20 gap-5 mx-10 lg:mx-auto justify-center">
                        <div className="text-navy">
                            <h6 className='font-semibold italic my-5'>HOW WE WORK</h6>
                            <p className='text-4xl font-bold my-3'>WORKING HOURS</p>
                            <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                            <p className='text-xl mb-5 font-semibold'>We are open every day from the very morning. If you want to get any beauty services, please book your visit in advance.</p>
                            <p className='text-xl mb-5 font-medium'><b>Monday to Friday:</b> 08:00 - 22:00</p>
                            <p className='mb-6 text-lg font-medium leading-5'><b>Saturday:</b> 08:00 - 20:00</p>
                            <p className='text-lg font-medium leading-5'><b>Sunday:</b> 08:00 - 20:00</p>
                            <Link to=''> <button className='border hover:bg-primary mt-10 hover:text-navy py-2 text-lg font-semibold px-5' type="button">Book a Visit</button> </Link>
                        </div>
                        <img src={office} alt="about" className="lg:w-[35rem] mt-10 w-[29rem] object-cover" />
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>
            </div>

            <div>
                <div className="text-navy">
                    <div className="text-center">
                        <span className="">
                            <h6 className='font-semibold italic text-xl my-5'>Services</h6>
                            <p className='text-5xl font-bold my-3'>WHAT WE OFFER</p>
                        </span>
                        <div className="flex items-center justify-center"> <div className='border p-0.5 w-16 my-4 rounded-full bg-primary border-none'></div> </div>
                        <p className='text-xl font-medium'>From splendid makeups to gorgeous hairstyles — we've got you covered.</p>
                    </div>

                    <div className="w-[85%] mx-auto mt-20">
                        <Slider {...settings}>
                            {Service.map((item) => (
                                <div className="text-navy" key={item.id}>
                                    <div className="">
                                        <span className=""> <img src={item.image} alt="" className="lg:w-[20rem] w-full object-cover h-[27rem]" /> </span>
                                        <div onClick={() => toggleService(item.id)} className="flex items-center mt-10 justify-between">
                                            <p className='text-3xl  font-semibold'>{item.text}</p>
                                            <button className='p-1.5'>{isOpen[item.id] ? <FaMinus /> : <FaPlus />}</button>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen[item.id] && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2.5 mt-2">
                                                <span className=" p-2 text-lg font-medium">{item.droptext}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="my-10">
                                        <Link to={item.link} className='border py-3 my-[20rem] text-lg font-semibold px-4 text-navy'>
                                            {item.linktext}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>

            </div>

            <div>
                <div className="lg:my-[10rem] mt-20">
                    <div className="lg:flex lg:items-start items-center lg:w-[75%] lg:gap-20 gap-5 mx-10 lg:mx-auto justify-center">
                        <img src={Package} alt="about" className="lg:w-[40rem] w-[29rem] object-cover" />
                        <div className="text-navy px-">
                            <h6 className='font-semibold italic my-5'>PACKAGES</h6>
                            <p className='text-4xl font-bold my-3'>BEAUTY PACKAGES</p>
                            <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                            <p className='text-xl mb-5 font-semibold'>Come to experience your beauty becoming a work of art in a relaxing, warm, and inviting atmosphere!</p>
                            <p className='mb-6 text-lg font-medium leading-5'>We have a variety of beauty packages that will help you look perfect always! Hair styling, Hair cut, Braids, Pedicure and Manicure, Makeup, Spa and Lash care.</p>
                            {Packages.map((item) => (
                                <div key={item.id} className="">
                                    <div className="">
                                        <div onClick={() => toggleService(item.id)} className="flex items-center mt-10 justify-between">
                                            <p className='text-3xl  font-semibold'>{item.text}</p>
                                            <button className='p-1.5'>{isOpen[item.id] ? <FaMinus /> : <FaPlus />}</button>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen[item.id] && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2.5 mt-2">
                                                <span className="bg-primary-50 p-2 text-lg font-medium">{item.droptext}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className=" border w-full my-5"></div>

                                </div>

                            ))}
                        </div>
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>
            </div>

            <div className="w-[85%] mx-auto mb-20 mt-20">
                <Slider {...settings}>
                    {imageSlider.map((item, i) => (
                        <div className="" key={i}>
                            <div className="">
                                <span className=""> <img src={item.image} alt="" className="lg:w-[20rem] w-full object-cover h-[17rem]" /> </span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="lg:mx-32 mx-10 mt-[10rem]">
                <div className="lg:flex items-start gap-10 justify-center">
                    <div className="text-navy">
                        <h6 className='font-semibold mb-5 text-lg'>COME TO FINESSE OASIS</h6>
                        <p className="text-4xl mb-6 font-bold">YOUR SECRET PLACE OF BEAUTY AND RELAXATION</p>
                        <p className="text-xl lg:hidden leading-6 mb-12 font-semibold">When at Finesse Oasis, you can take time off stress and routine, escape the rush of the city life, relax and recharge. A friendly, gracious and peaceful atmosphere embraces each client as they experience hair, makeup, nail, and other beauty services.</p>
                        <img src={makeup2} alt="" className="h-[35rem] object-cover" />
                        <span className="text-lg font-medium leading-6">
                            <p className="mt-6">Finesse Oasis is one of those Lagos salons where you can forget about the noise of the big city, stress, and rush. Treat yourself to the luxury of going to a sophisticated salon where stylists and hair artists will create a new look for you in an inviting atmosphere.</p>
                            <p className="mt-6">Our beauty artists are not only the true artisans — they are people of passion who love their job and enjoy making their clients happy.</p>
                        </span>
                    </div>
                    <div className="text-navy">
                        <p className="text-xl hidden lg:flex leading-6 mb-12 font-semibold">When at Finesse Oasis, you can take time off stress and routine, escape the rush of the city life, relax and recharge. A friendly, gracious and peaceful atmosphere embraces each client as they experience hair, makeup, nail, and other beauty services.</p>
                        <span className='font-medium leading-6 text-lg'>
                            <p className="mb-6">For us, a beauty salon is more than just a place you come to get all dolled up. It’s a beauty temple that we share with our staff and clients. Our primary goal is to fulfill your unique vision, meet all your expectations, and ensure that each customer leaves us with the desired look.</p>
                            <p className="mb-5">Aside from stellar results, what draws clients to Finesse Oasis Beauty Parlour is the warm, positive energy and excellent customer experience.</p>
                        </span>
                        <img src={hair2} alt="" className='h-[35rem] w-full object-cover' />
                    </div>
                </div>
            </div>

            <div>
                <div className="lg:my-[10rem] mt-20">
                    <div className="lg:flex lg:items-start items-center lg:w-[75%] lg:gap-20 gap-5 mx-10 lg:mx-auto justify-center">
                        <img src={makeup4} alt="about" className="lg:w-[35rem] w-[29rem] object-cover" />
                        <div className="text-navy">
                            <h6 className='font-semibold italic my-5'>CONTACT US</h6>
                            <p className='text-4xl font-bold my-3'>GET IN TOUCH</p>
                            <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                            <p className='text-xl mb-5 font-semibold'>Please make sure to book your visit in advance as we have all artists fully booked as a rule. Contact us to make a reservation!</p>
                            <p className='text-xl mb-5 font-medium'><b>Phone number:</b> +234 705 082 1589</p>
                            <p className='mb-6 text-xl font-medium leading-5'><b>E-mail:</b> f.afinnesseoasis@gmail.com</p>
                            <p className='text-xl font-medium leading-5'><b>Location:</b> 27 Grande Mall opposite Buena Vista Estates, Orchid road, Lekki, Lagos State, Nigeria</p>
                        </div>
                    </div>
                </div>
                <div className="border my-16 lg:hidden bg-primary"></div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
