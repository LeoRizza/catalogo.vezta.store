import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full mt-20">
        <img
          src="https://res.cloudinary.com/dxmydmsjl/image/upload/v1768300294/Tecnolog%C3%ADa_para_la_Integridad_y_los_Ensayos_No_Destructivos2_lba96j.png"
          alt="Banner Vezta"
          className="w-full h-36 sm:h-48 md:h-80 object-cover object-bottom-left"
        />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
