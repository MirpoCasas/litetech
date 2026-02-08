import { LogoIcon, LinkedInIcon, FacebookIcon, XIcon } from './icons';

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-14">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="bg-[#9C73F7] px-6 md:px-14 py-16 flex flex-col gap-14 md:gap-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-14 md:gap-0">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <LogoIcon width={28} height={28} className="flex-shrink-0" />
              <span className="font-semibold text-xl text-white">lite-tech</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {/* LinkedIn */}
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <LinkedInIcon color="white" />
              </a>
              {/* Facebook */}
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <FacebookIcon color="white" />
              </a>
              {/* Twitter/X */}
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <XIcon color="white" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 md:gap-0 md:flex-row md:justify-start">
            <div className="text-white text-sm font-normal leading-[150%] text-center md:text-left">
              © Copyright Lite-Tech.
            </div>
            <div className="text-white text-sm font-normal leading-[150%] text-center md:text-left md:ml-1">
              All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
