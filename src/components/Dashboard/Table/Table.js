import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import "./Table.css";
import AllMovieList from "@/components/AllMovieList";

export default function BasicTable() {
  return (
      <div className="Table pb-1">
      <h3 className="font-bold text-xl mb-2">Recent Uploads</h3>
        <TableContainer
          className="overflow-auto scrollbar-hide"
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", background:'#313336',height: 'calc(55vh)'}}
        >
          <AllMovieList/>
          <p className="text-gray-400 text-center" style={{marginTop:'-1.8rem'}}>Arynam © 2024</p>
        </TableContainer>
      </div>
  );
}
