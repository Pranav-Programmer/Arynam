import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-6 body-font">
      <div className="container py-4 px-8 flex flex-wrap">
        <div className="lg:w-1/6 md:w-1/2 w-full py-8 px-4 md:ml-4 ml-16">
        <Link href="/">
            <Image
              src="/site-logo.png"
              alt="dp"
              width={80}
              height={80}
              style={{marginTop:'-2rem'}}
              className="cursor-pointer rounded w-24 h-auto mb-2"
            />
          </Link>
          <p className="text-gray-400 text-sm">Arynam © 2024</p>
        </div>

        <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-4">
          <div className="mb-8">
            <i className="fa fa-map-marker text-blue-500"></i>
            <p className="flex leading-relaxed">
            <Image
              src="/location.png"
              alt="Location"
              width={100}
              height={100}
              className="cursor-pointer rounded w-7 h-7 mr-2"
            />
              India
            </p>
          </div>
          <div className="mb-8">
            <Link href="/feedbackPage" className="hover:text-blue-500">
            <p>Feedback Here</p>
            </Link>
          </div>
          <div>
            <i className="fa fa-envelope text-blue-500"></i>
            <p>
              <a href="https://pranav-programmer.github.io/Contact-Form/" target="_blank" className="hover:text-blue-500">
                support@arynam
              </a>
            </p>
          </div>
        </div>

        <div className="lg:flex lg:w-1/2 md:w-1/2 w-full gap-x-40">
          <p className="mb-8 text-gray-400 text-justify">
            Discover curated movie lists on our user-friendly website. Navigate through pages featuring diverse films, and use the search bar for personalized selections. Enjoy a seamless movie-browsing experience with us!
          </p>
          <div className="flex flex-col gap-y-2">
          <a href="https://www.instagram.com/pranav_dharme_/" target='_blank' className="text-blue-500">
            <div className='flex fle-row gap-x-2'><InstagramIcon/>Instagram</div>
            </a>
            <a href="https://www.facebook.com/yogesh.bari.1069/" target='_blank' className="mr-4 text-blue-500">
              <div className='flex fle-row gap-x-2'> <FacebookIcon/>Facebook</div>
            </a>
            <a href="https://twitter.com/pranav_dharme_" target='_blank' className="mr-4 text-blue-500">
              <div className='flex fle-row gap-x-2'> <TwitterIcon/>Twitter</div>
            </a>
            <a href="https://www.linkedin.com/in/pranav-dharme/" target='_blank' className="mr-4 text-blue-500">
            <div className='flex fle-row gap-x-2'>
            <Image
              src="/Linkdin.png"
              alt="Linkdin"
              width={100}
              height={100}
              className="cursor-pointer rounded w-7 h-auto"
            />
            Linkdin
            </div>
            </a>
            <a href="https://www.youtube.com/@beatsbreakers9638" target='_blank' className="text-blue-500">
            <div className='flex fle-row gap-x-2'><YouTubeIcon/>YouTube</div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
