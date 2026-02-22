import React from 'react';
import classes from './index.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>11
        <p className={classes.name}>Maria N'Canha</p>
        <p className={classes.email}>
          <a href="mailto:hello@mariancanha.com">hello@mariancanha.com</a>
        </p>
        <p className={classes.email}>
          <a href="">+47 968 40 648</a>
        </p>
        <div className={classes.socialLinks}>
          <a href="https://www.instagram.com/_maryancanghe/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
           <a href="https://www.linkedin.com/in/maria-n-canha-77232a27a/" target="_blank" rel="noopener noreferrer">
            Linkedin
          </a>
          
        </div>
        <p className={classes.copyright}>
          &copy; {new Date().getFullYear()} Maria N'canha. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
