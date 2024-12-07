import React from "react";
import imgFooter from "../Footer/footer-logo.png";

import '../../index.css';

const Footer = () => {
  return (
    <div className="footer-last">
      <img src={imgFooter} alt="footer-logo" />
      <span style={{ color: "#fff" }}>
        Copyright © 2014-2024 Tokyolife.vn All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
