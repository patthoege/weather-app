"use client";

import React from 'react';

function Footer() {
  return (
    <footer className="flex justify-center pb-8 py-4">
       <p className="footer-text text-sm flex items-center gap-1">
        Made by 
        <a 
        href="https://github.com/patthoege/"
        target="_blank"
        className="text-blue-500"
        >Patricia</a>
        &copy; {new Date().getFullYear()}
       </p>
    </footer>
  )
}

export default Footer;
