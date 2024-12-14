
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './App.css'; 
// import './Components/Frontpages/HomePages/About.css'
// import './Components/Frontpages/frontPage.css'
// import NavBar from './Components/Frontpages/HomePages/NavBar'; //

// import LoginUser from './Components/Frontpages/LoginUser' //
// import LoginManager from './Components/Frontpages/LoginManager' //
// import LoginAdmin from './Components/Frontpages/LoginAdmin' //

// import Profile from './Components/Pages/ProfileManager';
// import ForgotPassword from './Components/Frontpages/ForgotPassword' //
// import About from './Components/Frontpages/HomePages/About' //
// import Contact from './Components/Frontpages/HomePages/Contact'

// import EditProfile from './Components/Frontpages/HomePages/EditUserDetails';
// import Homepage from './Components/Frontpages/Homepage'; //

// import Userlist from './Components/Frontpages/HomePages/UserList'; //
// import UserRegistration from './Components/Frontpages/UserRegistration'; //
// import ManagerRegistration from './Components/Frontpages/ManagerRegistration'; //
// import ProfileAdmin from './Components/Pages/ProfileAdmin';
// import ProfileManager from './Components/Pages/ProfileManager'; //
// import ViewProfileUser from './Components/Pages/ProfileUser';
// import AddTurf from './Components/Turf/AddTurf'; //
// import ViewTurf from './Components/Turf/ManagerViewTurf';
// import EditTurf from './Components/Turf/EditTurf';
// import ProfileUser from './Components/Pages/ProfileUser';
// import ViewTurfList from './Components/Turf/UserViewTurfList';
// import ViewSingleTurf from './Components/Turf/ViewSingleTurf'; //
// import BookingTurf from './Components/Booking/BookingTurf'; //
// import ViewBooking from './Components/Booking/ViewBooking'; //
// import PaymentForm from './Components/Payment/PaymentForm'; //
// import PaymentDetails from './Components/Payment/PaymentDetails';
// import EditUserDetails from './Components/Frontpages/HomePages/EditUserDetails';
// import UserViewTurfList from './Components/Turf/UserViewTurfList'; //
// import ManagerViewTurf from './Components/Turf/ManagerViewTurf';
// import ManagerListUnderAdmin from './Components/Frontpages/HomePages/ManagerListUnderAdmin'; //
// import EditProfileMangerAdmin from './Components/Frontpages/HomePages/EditProfileMangerAdmin'; //
// import ViewTurfAdmin from './Components/Frontpages/HomePages/ViewTurfAdmin'; 
// import Feedback from './Components/Feedback/Feedback.js'; //
// import ViewBookingByManager from './Components/Booking/ViewBookingByManager';

// function App() {
//   return ( 
//     <BrowserRouter>
//       <div className="App">
//         <NavBar />
//         <Switch>
//           <Route path="/userregister" component={UserRegistration}></Route>
//           <Route path="/managerregister" component={ManagerRegistration}></Route>
//           <Route path="/addturf" component={AddTurf}></Route>
//           <Route path="/viewturf" component={ManagerViewTurf}></Route>
//           <Route path="/turf/viewsingleturf/:turfId" component={ViewSingleTurf}></Route>
//           <Route path="/viewturflist" component={UserViewTurfList}></Route>
//           <Route path="/turf/edit/:turfId" component={EditTurf}></Route>
         
//           <Route path="/loginuser" component={LoginUser}></Route>
//           <Route path="/loginmanager" component={LoginManager}></Route>
//           <Route path="/loginadmin" component={LoginAdmin}></Route>
//           <Route path="/feedback" component={Feedback}></Route>
//           <Route path="/userprofileview" component={ViewProfileUser}></Route>
//           <Route path="/profile/manager" component={ProfileManager} />
//           <Route path="/profile/admin" component={ProfileAdmin} />
//           <Route path="/profile/user" component={ProfileUser} />
//           <Route path="/booking" component={BookingTurf} />
//           <Route path="/bookinghistory" component={ViewBooking}/>
//           <Route path="/profile/edit/:userId" component={EditUserDetails} />

//           <Route path="/viewbookingbymanager" component={ViewBookingByManager}/>

   
//           <Route path="/profile/userlist" component={Userlist}></Route>
//           <Route path="/profile/edit/:userId" component={EditProfile} />
//           <Route path="/forgotpassword" component={ForgotPassword}></Route>
//           <Route path="/" component={Homepage} exact />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//           <Route path="/paymentform" component={PaymentForm}/>
//           <Route path="/paymentlist" component={PaymentDetails}/>
          
//           <Route path="/edit" component={EditProfile}></Route>
          
//           <Route path="/admin/edit/:managerId" component={EditProfileMangerAdmin}/>
//           <Route path="/admin/managerlist" component={ManagerListUnderAdmin}></Route>
//           <Route path="/turflist" component={ViewTurfAdmin}></Route>
         
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


// App.js
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'; 
import './Components/Frontpages/HomePages/About.css';
import './Components/Frontpages/frontPage.css';

// Layout Components
import NavBar from './Components/Frontpages/HomePages/NavBar';

// Authentication Pages
import LoginUser from './Components/Frontpages/LoginUser';
import LoginManager from './Components/Frontpages/LoginManager';
import LoginAdmin from './Components/Frontpages/LoginAdmin';
import ForgotPassword from './Components/Frontpages/ForgotPassword';
import UserRegistration from './Components/Frontpages/UserRegistration';
import ManagerRegistration from './Components/Frontpages/ManagerRegistration';

// Profile Pages
import ProfileAdmin from './Components/Pages/ProfileAdmin';
import ProfileManager from './Components/Pages/ProfileManager';
import ProfileUser from './Components/Pages/ProfileUser';
import ViewProfileUser from './Components/Pages/ProfileUser';
import EditUserDetails from './Components/Frontpages/HomePages/EditUserDetails';
import EditProfileMangerAdmin from './Components/Frontpages/HomePages/EditProfileMangerAdmin';

// Turf Management
import AddTurf from './Components/Turf/AddTurf';
import ViewTurf from './Components/Turf/ManagerViewTurf';
import EditTurf from './Components/Turf/EditTurf';
import ViewTurfList from './Components/Turf/UserViewTurfList';
import ViewSingleTurf from './Components/Turf/ViewSingleTurf';
import ViewTurfAdmin from './Components/Frontpages/HomePages/ViewTurfAdmin';
import ManagerViewTurf from './Components/Turf/ManagerViewTurf';

// Booking and Payment
import BookingTurf from './Components/Booking/BookingTurf';
import ViewBooking from './Components/Booking/ViewBooking';
import ViewBookingByManager from './Components/Booking/ViewBookingByManager';
import ViewAllBookings from './Components/Booking/ViewAllBookings'; // Add this import
import PaymentForm from './Components/Payment/PaymentForm';
import PaymentDetails from './Components/Payment/PaymentDetails';

// User Management
import Userlist from './Components/Frontpages/HomePages/UserList';
import ManagerListUnderAdmin from './Components/Frontpages/HomePages/ManagerListUnderAdmin';

// Other Pages
import Homepage from './Components/Frontpages/Homepage';
import About from './Components/Frontpages/HomePages/About';
import Contact from './Components/Frontpages/HomePages/Contact';
import Feedback from './Components/Feedback/Feedback';

function App() {
  return ( 
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          {/* Public Routes */}
          <Route path="/" component={Homepage} exact />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Authentication Routes */}
          <Route path="/userregister" component={UserRegistration} />
          <Route path="/managerregister" component={ManagerRegistration} />
          <Route path="/loginuser" component={LoginUser} />
          <Route path="/loginmanager" component={LoginManager} />
          <Route path="/loginadmin" component={LoginAdmin} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          {/* Admin Routes */}
          <Route path="/profile/admin" component={ProfileAdmin} />
          <Route path="/admin/bookings" component={ViewAllBookings} /> {/* New Route */}
          <Route path="/admin/managerlist" component={ManagerListUnderAdmin} />
          <Route path="/admin/edit/:managerId" component={EditProfileMangerAdmin} />
          <Route path="/turflist" component={ViewTurfAdmin} />
          <Route path="/profile/userlist" component={Userlist} />

          {/* Manager Routes */}
          <Route path="/profile/manager" component={ProfileManager} />
          <Route path="/addturf" component={AddTurf} />
          <Route path="/viewturf" component={ManagerViewTurf} />
          <Route path="/turf/edit/:turfId" component={EditTurf} />
          <Route path="/viewbookingbymanager" component={ViewBookingByManager} />

          {/* User Routes */}
          <Route path="/profile/user" component={ProfileUser} />
          <Route path="/userprofileview" component={ViewProfileUser} />
          <Route path="/profile/edit/:userId" component={EditUserDetails} />
          <Route path="/viewturflist" component={ViewTurfList} />
          <Route path="/turf/viewsingleturf/:turfId" component={ViewSingleTurf} />
          
          {/* Booking and Payment Routes */}
          <Route path="/booking" component={BookingTurf} />
          <Route path="/bookinghistory" component={ViewBooking} />
          <Route path="/paymentform" component={PaymentForm} />
          <Route path="/paymentlist" component={PaymentDetails} />
          
          {/* Other Routes */}
          <Route path="/feedback" component={Feedback} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;