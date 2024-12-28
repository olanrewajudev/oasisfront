import { FaGreaterThan } from "react-icons/fa"
import about from '../../assets/shampoo.png'
import barber from '../../assets/barber.png'
import quote from '../../assets/quote.png'
import { Link } from "react-router-dom"


import image1 from '../../assets/laroche.svg'
import image2 from '../../assets/loreal.svg'
import image3 from '../../assets/schwar.svg'
import image4 from '../../assets/nyx.svg'
import Layout from "../../Component/User/Layout"

const imageSlider = [
  { image: image1, text: 'LA ROCHE POSAY' },
  { image: image2, text: `L'OREAL` },
  { image: image3, text: 'SCHWARZKOPF' },
  { image: image4, text: 'NYX' },
]
const About = () => {
  return (
    <div>
      <Layout>
        <div className="">
          <div className="bg-light text-white py-20">
            <div className="text-center text-4xl font-bold my-4">ABOUT US</div>
            <div className="flex items-center justify-center text-center">
              <span className="font-semibold text-base mx-2">HOME</span>
              <FaGreaterThan />
              <span className="underline font-semibold text-base mx-2">ABOUT US</span>
            </div>
          </div>
         
          <div className="mb-20">
            <div className=" mt-20">
              <div className="lg:flex items-center gap-10 mx-5">
                <div className="text-navy px-">
                  <h6 className='font-semibold italic my-5'>ABOUT US</h6>
                  <p className='text-4xl font-bold my-3'>F.A FINESSE OASIS</p>
                  <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                  <p className='text-xl mb-5 font-semibold'>We strive to enhance your natural beauty with every visit.</p>
                  <p className='mb-6 text-lg font-medium leading-6'>Welcome to F.A Finesse Oasis Beauty Parlour, where beauty meets passion! A luxurious beauty parlor is dedicated to providing an unparalleled beauty and relaxation experience.
                    We are a team of skilled beauty professionals dedicated to providing excellent services in a warm and welcoming environment.
                  </p>
                  <p className="mb-6 text-lg font-medium leading-6">
                    Our story began with a passion for helping people look and feel their best. Our team of expert stylists, therapists, and technicians is dedicated to providing exceptional service, enhancing your natural beauty, boosting your confidence, making sure you feel like the best version of yourself, and ensuring that every guest feels pampered, relaxed, and rejuvenated.
                  </p>
                  <p className="text-lg font-medium leading-6">
                    Join us on a journey of transformation and discovery, as we help you unlock your full beauty potential. Visit us today and experience beauty, relaxation, and rejuvenation.
                  </p>
                </div>
                <img src={about} alt="about" className="lg:w-[40rem] lg:h-[40rem] h-[20rem] mt-10 lg:mt-0 w-full object-cover" />
              </div>
            </div>
            <div className="border my-16 lg:hidden bg-primary"></div>
          </div>

          <div className="">
            <div className="lg:w-[80rem] w-[90%] text-navy mx-auto">
              <div className="lg:flex items-center justify-between">
                <h5 className="text-2xl font-extrabold">Brands we use</h5>
                <p className="text-lg font-semibold">We use the best vegan and organic cosmetics brands.</p>
              </div>
              <div className="mt-10">
                <div className="lg:flex items-center justify-center gap-20 ">
                  {imageSlider.map((item, i) => (
                    <div className=" lg:w-[20rem] h-[12rem] mb-5 bg-light" key={i}>
                      <span className="flex items-center justify-center pt-10"><img src={item.image} alt="" className="w-[10rem] " /></span>
                      {/* <p className="text-center pt-10">{item.text}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border my-16 lg:hidden bg-primary"></div>
          </div>

          <div className="mt-20">
            <div>
              <div className="lg:my-[10rem] mt-20">
                <div className="lg:flex lg:items-start items-center lg:w-[75%] lg:gap-16 gap-5 mx-10 lg:mx-auto justify-center">
                  <img src={barber} alt="about" className="lg:w-[40rem] lg:h-[25rem] mb-10 w-full h-[20rem] object-top object-cover" />
                  <div className="text-navy px-">
                    <div className="mb-5"> <img src={quote} alt="quote" className="w-12" /> </div>
                    <p className="lg:text-2xl text-xl font-semibold">Taking time out for a nice haircut or styling is no longer a luxury but a necessity of modern urban lifestyle.</p>
                    <p className="lg:text-base text-lg mt-6 font-semibold">The path to becoming the best version of yourself starts with taking care of yourself. At Finesse Oasis, we strive to help you maintain your sense of well-being and enhance your beauty.</p>
                    <div className="mt-14"> <Link to='/booking' className="border p-4 text-lg font-semibold">Book a Visit</Link> </div>
                  </div>
                </div>
              </div>
              <div className="border my-16 lg:hidden bg-primary"></div>
            </div>
          </div>

        </div>
      </Layout>
    </div>
  )
}

export default About
