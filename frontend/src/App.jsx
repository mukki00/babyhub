import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import GiftRegistry from './pages/GiftRegistry.jsx';
import InternationalShipping from './pages/InternationalShipping.jsx';
import Locations from './pages/Locations.jsx';
import Loyalty from './pages/Loyalty.jsx';
import Returns from './pages/Returns.jsx';
import Shipping from './pages/Shipping.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pages/about" element={<About />} />
          <Route path="/pages/contact" element={<Contact />} />
          <Route path="/pages/faq" element={<Faq />} />
          <Route path="/pages/gift-registry" element={<GiftRegistry />} />
          <Route path="/pages/international-shipping" element={<InternationalShipping />} />
          <Route path="/pages/locations" element={<Locations />} />
          <Route path="/pages/loyalty" element={<Loyalty />} />
          <Route path="/pages/returns" element={<Returns />} />
          <Route path="/pages/shipping" element={<Shipping />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
