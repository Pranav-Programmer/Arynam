import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Image from "next/image";
import FileUpload from '@/components/FileUpload'

const MainDash = ({selected, setSelected}) => {
  return (
    <div className="MainDash">
      <div className="flex flex-row gap-3"><Image className="mt-2" src="/logo.png" alt="Logo" width={150} height={150}/><h1 className="font-extrabold text-2xl">Dashboard</h1></div>
      <Cards />
      {selected!=1 && <Table />}
      {selected==1 && 
      <div>
        <h3 className="font-bold text-xl mb-2">Upload Movie</h3>
      <div className="overflow-auto h-screen sm:h-screen scrollbar-hide mb-1" style={{ height: 'calc(55vh)'}}>
              <FileUpload setSelected={setSelected}/>
      </div>
      </div>}

    </div>
  );
};

export default MainDash;
