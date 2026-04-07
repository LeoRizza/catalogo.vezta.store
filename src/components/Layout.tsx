import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="relative w-full mt-20 h-36 sm:h-48 md:h-80">

        <img
          src="https://res.cloudinary.com/dxmydmsjl/image/upload/q_auto/f_auto/v1775580692/banner2_zitqwf.png"
          alt="Banner Vezta"
          className="absolute inset-0 w-full h-full object-cover object-left-middle"
        />

        <div className="absolute inset-0 bg-white/70" />

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 md:bottom-10 md:left-32 z-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black drop-shadow-xl/50 tracking-wide">
            VEZTA
          </h1>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium text-black drop-shadow-xl/50 mt-1">
            Tecnología para la Integridad <br />
            y los Ensayos No Destructivos
          </p>
        </div>

      </div>

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}