import Link from "next/link";
import { FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa"; // Import ikon dari react-icons

export const Footer = () => {
    return (
        <footer className="footer footer-center bg-black/80 text-base-content px-10 pb-16 pt-12 rounded-t-full">
            {/* Navigation Links */}
            <nav className="grid grid-flow-col gap-4">
                <Link href="/about_us" className="text-white hover:text-deflixRed transition-all duration-150">
                    About us
                </Link>
                <Link href="/contact" className="text-white hover:text-deflixRed transition-all duration-150">
                    Contact us
                </Link>
                <Link href="/jobs" className="text-white hover:text-deflixRed transition-all duration-150">
                    help center
                </Link>
            </nav>

            {/* Social Media Icons */}
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-deflixRed hover:scale-125 transition-all duration-300">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="https://www.youtube.com/@defawardhana5384" target="_blank" rel="noopener noreferrer" className="text-white hover:text-deflixRed hover:scale-125 transition-all duration-300">
                        <FaYoutube size={24} />
                    </a>
                    <a href="https://github.com/defaaryawar" target="_blank" rel="noopener noreferrer" className="text-white hover:text-deflixRed hover:scale-125 transition-all duration-300">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.instagram.com/defaaryawar_13" target="_blank" rel="noopener noreferrer" className="text-white hover:text-deflixRed hover:scale-125 transition-all duration-300">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://wa.me/6281219147116?text=Halo%2C%20saya%20tertarik%20untuk%20tau%20lebih%20lanjut%20tentang%20Anda." target="_blank" rel="noopener noreferrer" className="text-white hover:text-deflixRed hover:scale-125 transition-all duration-300">
                        <FaWhatsapp size={24} />
                    </a>
                </div>
            </nav>

            {/* Footer Copyright */}
            <aside>
                <p className="text-white">
                    Copyright © {new Date().getFullYear()} - All right reserved by ACME
                    Industries Ltd
                </p>
            </aside>
        </footer>
    );
};
