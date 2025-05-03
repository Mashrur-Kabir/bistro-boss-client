import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Footer = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-[#0B1120] text-white font-quicksand">
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 py-12 bg-[#1D283A]">
        {/* Contact Info */}
        <div data-aos="fade-right" className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-xl mb-3 font-varcon">CONTACT US</h2>
          <p className="text-sm">123 ABS Street, Uni 21, Bangladesh</p>
          <p className="text-sm mt-1">+88 123456789</p>
          <p className="text-sm mt-1">Mon - Fri: 08:00 - 22:00</p>
          <p className="text-sm mt-1">Sat - Sun: 10:00 - 23:00</p>
        </div>

        {/* Social Media */}
        <div data-aos="fade-left" className="text-center md:text-right">
          <h2 className="text-xl mb-3 font-varcon">Follow US</h2>
          <p className="text-sm mb-4">Join us on social media</p>
          <div className="flex justify-center md:justify-end gap-5 text-xl">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <Icon
                key={i}
                className="cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-blue-400"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black text-center text-xs py-4">
        Copyright © CulinaryCloud. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
