import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/navbar.jsx';
import Lookbook from './component/lookbook.jsx';
import UnstitchedCards from './component/hero1/UnstitchedCards.jsx';
import Hero2 from './component/hero2/hero2.jsx';
import Video from './component/video/video.jsx';
import Footer from './component/footer/footer.jsx';
import CustomCare from "./component/Customer Care/CustomCare.jsx";
import StoreLocations from './component/StoreLocations/StoreLocations.jsx';
import ContactPage from './component/Contact Us/Contactpage.jsx';
import AuthPage from './component/loginpage/Authapp.jsx';
import BagsPage from './component/Bags/Bags.jsx';
import UnstitchedPage from './component/Unstitched/Unstitched.jsx';
import ReadyToWearPage from './component/ReadyToWear/ReadyToWear.jsx';
import FragrancesPage from './component/FRAGRANCES/FRAGRANCES.jsx';
import FootwearPage from './component/Footwear/Footwear.jsx';
import AccessoriesPage from './component/Accessories/Accessories.jsx';
import LookbookPage from './component/LookbookPage/LookbookPage.jsx';
import DetailPicsPage from './component/DetailPicsPage/DetailPicsPage.jsx';
import ProductDetail from './component/ProductDetail/ProductDetail.jsx';
import CartPage from './component/Cart/CartPage.jsx';
import CheckoutPage from './component/Checkout/CheckoutPage.jsx';
import PaymentPage from './component/Payment/PaymentPage.jsx';
import SearchResultsPage from './component/Search/SearchResultsPage.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Main Home Page Component
const HomePage = () => {
  return (
    <>
      <Lookbook />
      <UnstitchedCards />
      <Hero2 />
      <Video />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Main home page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Customer Care pages - exactly matching sidebar */}
            <Route path="/shipping-policy" element={<CustomCare pageType="shipping" />} />
            <Route path="/international-shipping" element={<CustomCare pageType="international" />} />
            <Route path="/privacy-policy" element={<CustomCare pageType="privacy" />} />
            <Route path="/faqs" element={<CustomCare pageType="faqs" />} />
            <Route path="/payments" element={<CustomCare pageType="payments" />} />
            <Route path="/exchange-return-policy" element={<CustomCare pageType="exchange" />} />
            <Route path="/refund-policy" element={<CustomCare pageType="refund" />} />
            <Route path="/terms-conditions" element={<CustomCare pageType="terms" />} />
            <Route path="/cookies-policy" element={<CustomCare pageType="cookies" />} />
            <Route path="/covid-policy" element={<CustomCare pageType="covid" />} />
            
            {/* Store Locations page */}
            <Route path="/store-locations" element={<StoreLocations />} />
            
            {/* Contact Us page */}
            <Route path="/contact-us" element={<ContactPage />} />
            
            {/* Login/Register page */}
            <Route path="/login" element={<AuthPage />} />
            
            {/* Bags Collection page */}
            <Route path="/bags" element={<BagsPage />} />
            
            {/* Unstitched Collection pages */}
            <Route path="/unstitched" element={<UnstitchedPage />} />
            <Route path="/unstitched/mahiri-embroidered" element={<UnstitchedPage />} />
            <Route path="/unstitched/chikankari-lawn" element={<UnstitchedPage />} />
            <Route path="/unstitched/daily-wear" element={<UnstitchedPage />} />
            <Route path="/unstitched/premium-lawn" element={<UnstitchedPage />} />
            <Route path="/unstitched/luxe-atelier" element={<UnstitchedPage />} />
            <Route path="/unstitched/wedding-collection" element={<UnstitchedPage />} />
            
            {/* Ready To Wear Collection pages */}
            <Route path="/ready-to-wear" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/exclusive-pret" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/coords" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/everyday-essentials" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/luxury-pret" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/wedding-collection" element={<ReadyToWearPage />} />
            <Route path="/ready-to-wear/bottoms" element={<ReadyToWearPage />} />
            
            {/* Fragrances page */}
            <Route path="/fragrances" element={<FragrancesPage />} />
            
            {/* Footwear page */}
            <Route path="/footwear" element={<FootwearPage />} />
            
            {/* Accessories Collection pages */}
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/collections/bags" element={<AccessoriesPage />} />
            <Route path="/collections/dupatta" element={<AccessoriesPage />} />
            <Route path="/collections/fragrance" element={<AccessoriesPage />} />
            
            {/* Lookbook page */}
            <Route path="/lookbook" element={<LookbookPage />} />
            
            {/* Detail Pictures page */}
            <Route path="/detail-pics" element={<DetailPicsPage />} />
            
            {/* Product Detail Pages */}
            <Route path="/unstitched/product/:id" element={<ProductDetail />} />
            <Route path="/ready-to-wear/product/:id" element={<ProductDetail />} />
            
            {/* Cart page */}
            <Route path="/cart" element={<CartPage />} />
            
            {/* Checkout page */}
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* Payment page */}
            <Route path="/payment" element={<PaymentPage />} />
            
            {/* Search results page */}
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;