import React, { useState} from 'react'
import MainDash from '@/components/Dashboard/MainDash/MainDash';
import RightSide from '@/components/Dashboard/RigtSide/RightSide';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Profile from '../profile';

const Admin = () => {
  const { data: session } = useSession();
  const [selected, setSelected] = useState(0);
  const allowedAdminEmails = ["beatsbreakers@gmail.com", "pranavdharme10@gmail.com"];
  const isAdmin = session && allowedAdminEmails.includes(session.user.email);
  if (!isAdmin) {
    return <Profile/>;
  }  
  return (
        <div className="App">
          <div className="AppGlass" style={{display:'grid', height:'97%', width:'97%', background:'#313336', borderRadius:'2rem', gap:'1rem', gridTemplateColumns:'11rem autom 20rem', overflow:'hidden', margin:'1.5%'}}>
            <Sidebar selected={selected} setSelected={setSelected}/>
            <MainDash selected={selected} setSelected={setSelected}/>
            <RightSide/>
          </div>
        </div>
      );
}

export default Admin

