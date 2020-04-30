import React from "react";

import Navbar from "js/components/Navbar";
import Footer from "js/components/Footer";
import Doggo from "js/img/doggo.png";

function my404() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="mt-8 text-2xl font-light text-center">
          Uhh. Hi. I think you're lost.
        </div>
        <img
          className="my-4"
          alt="Friendly Doggy"
          src={Doggo}
          style={{ height: "400px", width: "400px" }}
        />
        <div className="mb-8 text-2xl font-light text-center">
          There's nothing here, except me.
        </div>
      </div>

      <Footer />
    </>
  );
}

export default my404;
