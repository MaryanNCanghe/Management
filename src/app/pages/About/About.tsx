"use client"
import React, { useState } from 'react';
import classes from './index.module.scss';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className={classes.about}>
      <div className={classes.title}>
        <h4>ABOUT ME</h4>
      </div>

      <div className={classes.presentation}>
        <p> I'm Maria N'canha an organized, detail-driven administrative professional with experience in advisory, marketing and stock management. Web developer,
           design, UI/UX and branding. Supporting entrepreneurs, 
        ensuring smooth operations and efficiency. I'm proactive, independent, and skilled in handling communication, 
          documentation, project coordination, finances and digital tools with accuracy and professionalism. With a problem-solving mindset, and fluency in multiple languages, 
          I bring structure, clarity, and efficiency to every team I work with.</p>



      </div>

      <hr className={classes.separator} />

      <div className={classes.journey}>
         <div className={classes.title}>
        <h4>EXPERTISE</h4>
      </div>
        <div className={classes.timeline}>
          <div className={classes.square}>Marketing</div>
          <div className={classes.square}>Management</div>
          <div className={classes.square}> Administrative</div>
          {/* <span className={classes.arrow}>→</span> */}
          <div className={classes.square}>Graphic Design</div>

          <div className={classes.square}>Web Developer</div>
        </div>
      </div>

      <hr className={classes.separator} />

      <div className={classes.vision}>
         <div className={classes.title}>
        <h4>VISION</h4>
      </div>
       <div> <p>
         I bring hands on experience in social media management, content creation, 
         and brand storytelling, developed through managing personal and client projects across social media. I create visually cohesive content using digital design tools, 
        ensuring that every post aligns with brand identity and communicates with clarity and aesthetic intention.
        My background in art and design strengthens my visual judgment, allowing me to craft layouts, banners, 
        and graphics that are both modern and engaging. I am comfortable working with content calendars, analytics, 
        and scheduling platforms, including Meta Business Suite and Google tools, allowing me to plan, organize, and evaluate content performance.
        Whether the goal is visibility, engagement, or brand growth, I approach marketing with creativity, strategic thinking, and consistency.
        </p>
        </div>
      </div>
    </section>
  );
};

export default About;
