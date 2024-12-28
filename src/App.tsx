import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/User/Home';
import About from './Page/User/About';
import Contact from './Page/User/Contact';
import Services from './Page/User/Services';
import Testimonial from './Page/User/Review/Testimonial';
import Price from './Page/User/Price/Price';
import Loader from './Component/User/Loader';
import ManageCategory from './Page/Admin/Category/ManageCategory';
import AdminHome from './Page/Admin/AdminHome';
import EditService from './Page/Admin/Service/EditService';
import NewService from './Page/Admin/Service/NewService';
import AdminService from './Page/Admin/Service/AdminService';
import ManageBooking from './Page/Admin/Booking/ManageBooking';
import Booking from './Page/User/Bookings/Booking';
import Admin from './Private/Admin';
import Login from './Page/Form/Login';
import Signup from './Page/Form/Signup';
import User from './Private/User';
import NewPriceForm from './Page/Admin/Price/NewPriceForm';
import AllPrice from './Page/Admin/Price/AllPrices';
import EditPriceForm from './Page/Admin/Price/EditPriceForm';
import NotFound from './Component/Utils/NotFound';
import AllReview from './Page/Admin/Review/AllReview';
import EditReview from './Page/Admin/Review/EditReview';
import AllSection from './Page/Admin/Section/AllSection';
import EditSection from './Page/Admin/Section/EditSection';
import NewSection from './Page/Admin/Section/NewSection';
import NewProfessional from './Page/Admin/Professional/NewProfessional';
import AllProfessional from './Page/Admin/Professional/AllProfessional';
import EditProfessional from './Page/Admin/Professional/EditProfessional';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<User><Loader><Home /></Loader></User>} />
          <Route path="/about" element={<User><Loader><About /></Loader></User>} />
          <Route path="/contact" element={<User><Loader><Contact /></Loader></User>} />
          <Route path="/login" element={<User><Loader><Login /></Loader></User>} />
          <Route path="/signup" element={<User><Loader><Signup /></Loader></User>} />
          <Route path="/service" element={<User><Loader><Services /></Loader></User>} />
          <Route path="/testimonial" element={<User><Loader><Testimonial /></Loader></User>} />
          <Route path="/price" element={<User><Loader><Price /></Loader></User>} />
          <Route path="/booking" element={<User><Loader><Booking /></Loader></User>} />
//
          <Route path="/auth/admin/category/manage" element={<Admin><Loader><ManageCategory /></Loader></Admin>} />
          <Route path="/auth/admin" element={<Admin><Loader><AdminHome /></Loader></Admin>} />
          <Route path="/auth/admin/service/new" element={<Admin><Loader><NewService /></Loader></Admin>} />
          <Route path="/auth/admin/service" element={<Admin><Loader><AdminService /></Loader></Admin>} />
          <Route path="/auth/admin/service/edit/:id" element={<Admin><Loader><EditService /></Loader></Admin>} />
          <Route path="/auth/admin" element={<Admin><Loader><AdminHome /></Loader></Admin>} />

          <Route path="/auth/admin/professional/new" element={<Admin><Loader><NewProfessional /></Loader></Admin>} />
          <Route path="/auth/admin/professional" element={<Admin><Loader><AllProfessional /></Loader></Admin>} />
          <Route path="/auth/admin/professional/edit/:id" element={<Admin><Loader><EditProfessional /></Loader></Admin>} />

          
          <Route path="/auth/admin/price/new" element={<Admin><Loader><NewPriceForm /></Loader></Admin>} />
          <Route path="/auth/admin/price" element={<Admin><Loader><AllPrice /></Loader></Admin>} />
          <Route path="/auth/admin/price/edit/:id" element={<Admin><Loader><EditPriceForm /></Loader></Admin>} />
          
          <Route path="/auth/admin/booking" element={<Admin><Loader><ManageBooking /></Loader></Admin>} />
          <Route path="/auth/admin/review" element={<Admin><Loader><AllReview /></Loader></Admin>} />
          <Route path="/auth/admin/review/edit/:id" element={<Admin><Loader><EditReview /></Loader></Admin>} />
          <Route path="/auth/admin/section" element={<Admin><AllSection /></Admin>} />
          <Route path="/auth/admin/section/new" element={<Admin><NewSection /></Admin>} />
          <Route path="/auth/admin/section/edit/:id" element={<Admin><EditSection /></Admin>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
