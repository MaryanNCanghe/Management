import React from 'react';
import classes from './index.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.name}>Maria N'Canghe</p>
        <p className={classes.email}>
          <a href="mailto:mariancanghe@icloud.com">mariancanghe@icloud.com</a>
        </p>
        <div className={classes.socialLinks}>
          <a href="https://www.instagram.com/_maryancanghe/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://github.com/MaryanNCanghe" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <p className={classes.copyright}>
          &copy; {new Date().getFullYear()} Maria N'canghe. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
