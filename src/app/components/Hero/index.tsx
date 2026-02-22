"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import classes from "./index.module.scss";

// Import images from src (for rendering, not for download)
import profile from "@/app/assets/img/profile.jpg";

// Array of background images
const images = [profile];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={classes.hero}>
      <Image
        src={images[currentImageIndex]}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className={classes.heroImage}
      />
      <div className={classes.content}> 
         <h1>Maria N'canha</h1>
        <h4>Advisory and management</h4>
      

        <div className={classes.buttonContainer}>
         <a
            href="/resume.png" 
            download
           className={classes.cvButton}
          >
            download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
