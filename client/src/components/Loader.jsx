import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

import { PropagateLoader } from "react-spinners";

function Success() {
  const { navigate } = useContext(AppContext);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000);
    }
  }, [nextUrl]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PropagateLoader />
    </div>
  );
}

export default Success;
