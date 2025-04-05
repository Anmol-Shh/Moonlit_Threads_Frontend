import React from 'react';
import '../index.css';
import BgLogo from '../assets/Moonlit_Threads.png';
import { useNavigate } from 'react-router';

function Footer() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/ContactUs'); // Navigate to categories page on logo click
    };
    return (
        <footer className="footer">
            {/* Upper Section */}
            <div className="footer__upper">
                <div className="footer__graphic">
                    <img src={BgLogo} alt="Illustration" />
                </div>
                <div className="footer__message">
                    <h1>LOVE WHAT WE DO?</h1>
                    <p>We believe that with the right tools, anyone can turn their passion into an empire. So we made them.</p>
                    <button onClick={handleClick} className="footer__demo-button">
                        CONTACT US <span className="footer__arrow">→</span>
                    </button>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="footer__nav">
                <ul>
                    <li>ABOUT</li>
                    <li>THEMES</li>
                    <li>INSPIRATION</li>
                </ul>
                <ul>
                    <li>INSTAGRAM</li>
                    <li>TWITTER</li>
                    <li>LINKEDIN</li>
                </ul>
                <ul>
                    <li>FAQ</li>
                    <li>HELP CENTRE</li>
                    <li>CONTACT</li>
                </ul>
            </div>

            {/* Bottom Section */}
            <div className="footer__line"></div>

            <div className="footer__bottom">
            <ul className="footer__links">
                <li>CREATOR TERMS</li>
                <li>PRIVACY POLICY</li>
                <li>COOKIES POLICY</li>
            </ul>
            <div className="marquee">
                <div className="marquee__inner">
                    <span>CREATE AND SELL ANY EXPERIENCE ON EASOL'S POWERFUL, PURPOSE-BUILT PLATFORM.</span>
                    <span> TRANSFORM YOUR PASSION INTO AN EMPIRE WITH THE RIGHT TOOLS.</span>
                    <span> JOIN US AND DISCOVER THE FUTURE OF EX-COMMERCE.</span>
                    <span> YOUR JOURNEY TO SUCCESS STARTS HERE.</span>
                    <span>CREATE AND SELL ANY EXPERIENCE ON EASOL'S POWERFUL, PURPOSE-BUILT PLATFORM.</span>
                    <span> TRANSFORM YOUR PASSION INTO AN EMPIRE WITH THE RIGHT TOOLS.</span>
                    <span> JOIN US AND DISCOVER THE FUTURE OF EX-COMMERCE.</span>
                    <span> YOUR JOURNEY TO SUCCESS STARTS HERE.</span>
                    <span>CREATE AND SELL ANY EXPERIENCE ON EASOL'S POWERFUL, PURPOSE-BUILT PLATFORM.</span>
                    <span> TRANSFORM YOUR PASSION INTO AN EMPIRE WITH THE RIGHT TOOLS.</span>
                    <span> JOIN US AND DISCOVER THE FUTURE OF EX-COMMERCE.</span>
                    <span> YOUR JOURNEY TO SUCCESS STARTS HERE.</span>
                    <span>CREATE AND SELL ANY EXPERIENCE ON EASOL'S POWERFUL, PURPOSE-BUILT PLATFORM.</span>
                    <span> TRANSFORM YOUR PASSION INTO AN EMPIRE WITH THE RIGHT TOOLS.</span>
                    <span> JOIN US AND DISCOVER THE FUTURE OF EX-COMMERCE.</span>
                    <span> YOUR JOURNEY TO SUCCESS STARTS HERE.</span>
                    <span>CREATE AND SELL ANY EXPERIENCE ON EASOL'S POWERFUL, PURPOSE-BUILT PLATFORM.</span>
                    <span> TRANSFORM YOUR PASSION INTO AN EMPIRE WITH THE RIGHT TOOLS.</span>
                    <span> JOIN US AND DISCOVER THE FUTURE OF EX-COMMERCE.</span>
                    <span> YOUR JOURNEY TO SUCCESS STARTS HERE.</span>
                </div>
            </div>
        </div>
</footer>


    );
}

export default Footer;
