
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LucideShoppingBag, LucideUser, LucideSearch, LucideMenu, LucideX, LucideTrash2, LucidePlus, LucideMinus, LucideHeart, LucideLayoutDashboard, LucideLogOut, LucideSparkles } from 'lucide-react';
import { Product, CartItem, User, Role, Order } from './types';
import { INITIAL_PRODUCTS, CATEGORIES } from './constants';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import AIShoppingAssistant from './components/AIShoppingAssistant';

// Simplified Context Alternative (State Drilling/Props for small demo)
const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('lumiere_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('lumiere_products');
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    localStorage.setItem('lumiere_products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumiere_user');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold tracking-widest uppercase serif">buy zone</Link>
              </div>

              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-sm font-medium hover:text-[#C5A059] transition-colors">Home</Link>
                <Link to="/shop" className="text-sm font-medium hover:text-[#C5A059] transition-colors">Shop</Link>
                <Link to="/shop?category=Apparel" className="text-sm font-medium hover:text-[#C5A059] transition-colors">Apparel</Link>
                <Link to="/shop?category=Watches" className="text-sm font-medium hover:text-[#C5A059] transition-colors">Watches</Link>
              </div>

              <div className="flex items-center space-x-5">
                {user?.role === Role.ADMIN && (
                  <Link to="/admin" className="p-2 hover:text-[#C5A059] transition-colors" title="Admin Dashboard">
                    <LucideLayoutDashboard size={20} />
                  </Link>
                )}
                {user ? (
                  <button onClick={logout} className="p-2 hover:text-red-500 transition-colors" title="Logout">
                    <LucideLogOut size={20} />
                  </button>
                ) : (
                  <Link to="/auth" className="p-2 hover:text-[#C5A059] transition-colors">
                    <LucideUser size={20} />
                  </Link>
                )}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:text-[#C5A059] transition-colors relative"
                >
                  <LucideShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#C5A059] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <div className="md:hidden">
                  <LucideMenu size={20} />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} total={cartTotal} setOrders={setOrders} setCart={setCart} />} />
            <Route path="/admin/*" element={<AdminDashboard products={products} setProducts={setProducts} orders={orders} />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-neutral-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl serif italic mb-6">buy zone</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dedicated to the preservation of craftsmanship and the pursuit of timeless elegance since 1924.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/shop">New Arrivals</Link></li>
                <li><Link to="/shop">Best Sellers</Link></li>
                <li><Link to="/shop">Collections</Link></li>
                <li><Link to="/shop">The Atelier</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Service</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>Care Guide</li>
                <li>Bespoke Requests</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Join our inner circle for exclusive updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-transparent border-b border-gray-700 py-2 focus:outline-none flex-grow text-sm"
                />
                <button className="text-xs font-bold uppercase tracking-widest ml-4 hover:text-[#C5A059] transition-colors">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-500">
            <p>© 2024 buy zone. All Rights Reserved. <span className="ml-2 opacity-50">made by muhammad siddique</span></p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies</span>
            </div>
          </div>
        </footer>

        {/* AI Shopping Assistant Widget */}
        <AIShoppingAssistant products={products} />

        {/* Side Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl serif font-semibold">Shopping Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <LucideX size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <LucideShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Your bag is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex space-x-4 pb-6 border-b border-gray-50 border-dotted">
                      <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                            <LucideTrash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><LucideMinus size={12} /></button>
                            <span className="px-3 text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><LucidePlus size={12} /></button>
                          </div>
                          <p className="text-sm font-semibold">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 uppercase tracking-widest">Subtotal</span>
                    <span className="text-lg font-bold">${cartTotal}</span>
                  </div>
                  <Link 
                    to="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-[#1a1a1a] text-white text-center py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                  >
                    Checkout Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </Router>
  );
};

export default App;
