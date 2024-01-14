import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Image from "next/image";
import {UilEstate,UilClipboardAlt,UilUsersAlt,UilChart,} from "@iconscout/react-unicons";
import { UilSearch } from '@iconscout/react-unicons';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import Login from "@/components/Login";

const SidebarData = [
  {
    icon: UilChart,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Upload Here",
  },
  {
    icon: UilUsersAlt,
    heading: "Profile",
    link: '/profile',
  },
  {
    icon: UilSearch,
    heading: 'Search',
    link: '/newMovieList',
  },
  {
    icon: UilEstate,
    heading: 'Home',
    link: '/',
  },
];

const Sidebar = ({ selected, setSelected }) => {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [expanded, setExpaned] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <div className="bars relative" style={expanded?{left: '60%'}:{left: '2.5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
      {isClient && (
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <Image src="/Blogo.png" priority={false} alt="logo" width={100} height={100}/>
        <span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            item.link?( <Link href={`${item.link}`} key={index} legacyBehavior>
              <a
                className={selected === index ? "menuItem active" : "menuItem"}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </a>
            </Link>) :
            (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                onClick={() => setSelected(index)}
                key={index}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div> 
            )
          );
        })}
        <div className="menuItem">
        <button onClick={() => signOut()} className="flex flex-row gap-3"><UilSignOutAlt />
                Sign Out
        </button>
        </div>
      </div>
    </motion.div>
    )}
    </>
  );
  
};

export default Sidebar;
