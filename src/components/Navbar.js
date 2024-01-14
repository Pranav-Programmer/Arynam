import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { BiSearch } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { Menu as MenuIcon } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useSession } from 'next-auth/react';
import Modal from './Modal';
import Login from "@/components/Login";
import SearchBar from './SearchBar';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const allowedAdminEmails = ["beatsbreakers@gmail.com", "pranavdharme10@gmail.com"];
  const isAdmin = session && allowedAdminEmails.includes(session.user.email);
  const [scrolling, setScrolling] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNotificationDialog, setopenNotificationDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const currentRoute = router.pathname;
  const allowedRoutes = ['/newMovieList'];
  const searchIconColor = allowedRoutes.includes(currentRoute) ? 'gray' : 'white';
  const searchIconCursor = searchIconColor === 'white' ? 'cursor-pointer' : 'gray';

  const handleKidsClick = () => {
    setOpenDialog(true);
  };

  const handleNotificationClick = () => {
    setopenNotificationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setopenNotificationDialog(false);
  };

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    if (!allowedRoutes.includes(currentRoute)) {
      router.push('/newMovieList');
    } 
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleSearch = (searchQuery) => {
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!session) {
    if (!session) return <Login />;
  }

  const { user } = session;

  return (
    <nav
      className={`transition-all duration-300 ease-in-out ${
        scrolling ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="dp"
              width={120}
              height={120}
              className="cursor-pointer rounded w-40 h-auto"
            />
          </Link>

          <ul className={`space-x-4 md:flex ${anchorEl ? 'bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-72 p-4 rounded' : 'hidden'}`}>
            <li className={`headerLink ${router.pathname === '/' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
              <Link href="/">
              {anchorEl && (
                <IconButton color="inherit">
                  <PlayCircleFilledIcon />
                </IconButton>
                )}
                {anchorEl && (<span className="ml-2 mr-8">Home</span>)}
                {!anchorEl && (<span className="ml-2">Home</span>)}
              </Link>
            </li>

            <li className={`headerLink ${router.pathname === '/newMovieList' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
              <Link href="/newMovieList">
              {anchorEl && (
                <IconButton color="inherit">
                  <PlayCircleFilledIcon />
                </IconButton>
              )}
                <span className="ml-2">New & Popular</span>
              </Link>
            </li>

            <li className={`headerLink ${router.pathname === '/webSeriesList' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
              <Link href="/webSeriesList">
              {anchorEl && (
                <IconButton color="inherit" >
                  <PlayCircleFilledIcon/>
                </IconButton>
              )}
                {anchorEl && (<span className={`ml-2 ${anchorEl ? 'mr-6' : ''}`}>Web Series</span>)}
                {!anchorEl && (<span className="ml-2" >Web Series</span>)}
              </Link>
            </li>

            <li className={`headerLink ${router.pathname === '/moviesList' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
              <Link href="/moviesList">
              {anchorEl && (
                <IconButton color="inherit">
                  <PlayCircleFilledIcon />
                </IconButton>
              )}
                {anchorEl && (<span className="ml-2 mr-12">Movies</span>)}
                {!anchorEl && (<span className="ml-2">Movies</span>)}
              </Link>
            </li>

            <li className={`headerLink ${router.pathname === '/animeList' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
              <Link href="/animeList">
              {anchorEl && (
                <IconButton color="inherit">
                  <PlayCircleFilledIcon />
                </IconButton>
              )}
                {anchorEl && (<span className="ml-2 mr-12">Anime</span>)}
                {!anchorEl && (<span className="ml-2">Anime</span>)}
              </Link>
            </li>

            {isAdmin && (
              <li className={`headerLink ${router.pathname === '/admin' ? 'cursor-pointer font-semibold text-white hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                <Link href="/admin">
                  {anchorEl && (
                    <IconButton color="inherit">
                      <PlayCircleFilledIcon />
                    </IconButton>
                  )}
                  {anchorEl && (<span className="ml-2 mr-12">Admin</span>)}
                  {!anchorEl && (<span className="ml-2">Admin</span>)}
                </Link>
              </li>
            )}

          </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
          <BiSearch color={searchIconColor} className={`h-6 w-6 ${searchIconCursor}`} onClick={handleSearchClick} />
          {searchOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <SearchBar onClose={handleCloseSearch} onSearch={handleSearch} />
        </div>
      )}
          <p onClick={handleKidsClick} className="hidden cursor-pointer lg:inline font-medium">KIDS</p>
          <BsBellFill onClick={handleNotificationClick} className="sm cursor-pointer hidden h-6 w-6 sm:inline" />
          <Link href="/profile">
            <Image
              src={user.image}
              alt="dp"
              width={20}
              height={20}
              className="cursor-pointer rounded-2xl w-auto h-auto"
            />
          </Link>
          <div className="md:hidden cursor-pointer" >
          <IconButton color="inherit" onClick={handleMenuToggle}>
          {anchorEl ? "" : <MenuIcon />}
          </IconButton>
        </div>

        {anchorEl && (
          <div className="absolute top-3 right-2">
            <IconButton color="inherit" onClick={handleCloseMenu}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
          </div>
      </div>

      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        title="Only for Kids 🐣"
        contentText="You are too early here, go and do your homework! 🤣"
        buttonText="Close"
      />
      <Modal
        open={openNotificationDialog}
        onClose={handleCloseDialog}
        title="Notification 🔔"
        contentText="You don't have any notification today"
        buttonText="Close"
      />
    </nav>
  );
};

export default Navbar;
