import { FaGreaterThan } from "react-icons/fa"
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import Layout from "../../Component/User/Layout";

const Contact = () => {
  return (
    <div>
      <Layout>
        <div className="">
          <div className="bg-light text-white py-20">
            <div className="text-center text-4xl font-bold my-4">CONTACT US</div>
            <div className="flex items-center justify-center text-center">
              <span className="font-semibold text-base mx-2">HOME</span>
              <FaGreaterThan />
              <span className="underline font-semibold text-base mx-2">CONTACT US</span>
            </div>
          </div>
         
          <div className="w-[80%] my-20  mx-auto">
            <div className="lg:flex text-navy items-start gap-10">
              <div className="">
                <h6 className='font-semibold italic my-5'>CONTACT US</h6>
                <p className='text-4xl font-bold my-3'>YOU'RE ALWAYS WELCOME!</p>
                <div className="border p-0.5 w-20 my-5 rounded-full bg-primary border-none"></div>
                <p className='text-xl mb-5 font-semibold'>Feel free to give us a call to schedule a consultation or appointment. Our experienced and friendly staff will provide you with the best haircut or style you dreamed of.</p>
                <p className='text-lg font-medium leading-6'>F.A. Finesse Oasis will become your favorite place to go for excellent haircuts, stunning hair stylings, manicures and pedicures of any type, hair coloring, SPA treatments, and many more. Whenever you feel that you need time for yourself, our sophisticated salon in the heart of Lekki will welcome you. Treat yourself to some relaxation!</p>
                <div className="flex items-center gap-6 mt-5">
                  <span className="text-lg font-bold">FOLLOW US:</span>
                  <div className="flex items-center gap-3">
                    <span className="bg-light p-2 border text-white">
                      <FaFacebook />
                    </span>
                    <span className="bg-light p-2 border text-white">
                      <FaInstagram />
                    </span>
                    <span className="bg-light p-2 border text-white">
                      <FaTwitter />
                    </span>
                    <span className="bg-light p-2 border text-white">
                      <FaTiktok />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex mt-10 flex-col">
                <span className="mb-1">
                  <h4 className='text-2xl font-bold'>Address</h4>
                  <p className="text-lg font-medium">Grande mall opposite Buena Vista Estates orchid road Lekki, Lagos, Nigeria</p>
                </span>

                <span className="mb-1">
                  <h4 className='text-2xl font-bold my-2'>Phone</h4>
                  <p className="text-lg font-medium">+234 705 082 1589</p>
                </span>

                <span className="mb-1">
                  <h4 className='text-2xl font-bold my-2'>E-mail</h4>
                  <p className="text-lg font-medium">f.afinnesseoasis@gmail.com</p>
                </span>

                <span className="mb-1">
                  <h4 className='text-2xl font-bold my-3'>Working Hours</h4>
                  <p className='text-xl font-medium'>Monday to Friday: 08:00 - 22:00</p>
                  <p className='text-lg font-medium'>Saturday: 08:00 - 20:00</p>
                  <p className='text-lg font-medium'>Sunday: 08:00 - 20:00</p>
                </span>
              </div>
            </div>
          </div>
          <div className="mb-32">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.3498485669247!2d3.553419638418712!3d6.432608163714918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7a69e1a31c7%3A0x5761e8d2acbab91a!2sBuena%20Vista%20Estate!5e0!3m2!1sen!2sng!4v1717439397509!5m2!1sen!2sng"
              width="90%"
              height="450"
              style={{ border: '0', margin: 'auto' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>

          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Contact
