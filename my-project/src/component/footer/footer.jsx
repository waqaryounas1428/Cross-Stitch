
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="perks">
        <div className="perk">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path d="M3 7h11v9H3z" />
            <path d="M14 10h4l3 3v3h-7z" />
            <circle cx="7" cy="18" r="1.5" />
            <circle cx="17" cy="18" r="1.5" />
          </svg>
          <span>Worldwide Shipping</span>
        </div>

        <div className="divider"></div>

        <div className="perk">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path d="M3 7h11v9H3z" />
            <path d="M14 10h4l3 3v3h-7z" />
            <circle cx="7" cy="18" r="1.5" />
            <circle cx="17" cy="18" r="1.5" />
            <path d="M9 5l-1.5 2M9 5l1.5 2" />
          </svg>
          <span>
            No Questions Asked
            <br />
            Exchange Policy
          </span>
        </div>

        <div className="divider"></div>

        <div className="perk">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <rect x="3" y="6" width="18" height="13" rx="1" />
            <path d="M3 10h18" />
            <circle cx="17" cy="15" r="1" />
          </svg>
          <span>Safe Payment</span>
        </div>
      </div>

      <div className="columns">
        <div className="col">
          <h4>CONTACT US</h4>

          <div className="contact-item">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <p>
              45-50 Gulberg III Industrial Area Lahore, Pakistan
              <br />
              Sheikhupura Textile Mills Ltd
            </p>
          </div>

          <div className="contact-item">
            <svg viewBox="0 0 24 24">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2.3z" />
            </svg>

            <p>
              Help Line
              <br />
              042-111-111-006
              <br />
              (10am to 5.30pm) Mon to Sat
            </p>
          </div>

          <div className="contact-item whatsapp">
            <svg viewBox="0 0 24 24">
              <path d="M20.5 3.5a11 11 0 0 0-17.4 13.2L2 22l5.5-1.4A11 11 0 1 0 20.5 3.5z" />

              <path
                d="M8.5 8.5c-.3 1 .1 2.4 1.5 3.9 1.5 1.5 2.9 1.8 3.9 1.5.6-.2 1-.9.9-1.5l-1.6-1-1 .6a5 5 0 0 1-2.3-2.3l.6-1-1-1.6c-.6-.1-1.3.2-1.5.9z"
                fill="currentColor"
                stroke="none"
              />
            </svg>

            <p>
              WhatsApp
              <br />
              +92 302 8141555
              <br />
              (10am to 5.30pm) Mon to Sat
            </p>
          </div>

          <div className="contact-item">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="1" />
              <path d="M2 6l10 7 10-7" />
            </svg>

            <p>sales@crossstitch.pk</p>
          </div>

          <div className="stay-in-touch">Stay In Touch</div>

          <div className="subscribe-row">
            <input type="email" placeholder="Email address" />
            <button type="button">SUBSCRIBE</button>
          </div>
        </div>

        <div className="col">
          <h4>CUSTOMER CARE</h4>

          <ul>
            <li>
              <a href="/faqs">FAQs</a>
            </li>

            <li>
              <a href="/exchange-return-policy">Exchange &amp; Return Policy</a>
            </li>

            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="col">
          <h4>INFORMATION</h4>

          <ul>
            <li>
              <a href="#">About Us</a>
            </li>

            <li>
              <a href="/detail-pics">Detail Pictures</a>
            </li>

            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>

            <li>
              <a href="/payments">Payments</a>
            </li>
            <li>
              <a href="/store-locations">Store Locations</a>
            </li>
          </ul>

          {/* SOCIAL MEDIA */}
          <div className="socials">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/crossstitchpakistan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="facebook"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 3h-2a5 5 0 0 0-5 5v2H6v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/crossstitch_official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="instagram"
            >
              <svg viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.6"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="3.8"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.6"
                />

                <circle cx="17.2" cy="6.8" r="1.1" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCNBNOA-ULqQOqO2qMSZfZPA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="youtube"
            >
              <svg viewBox="0 0 24 24">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="4"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.6"
                />

                <path d="M10 9l6 3-6 3z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@crossstitchofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="tiktok"
            >
              <svg viewBox="0 0 24 24">
                <path d="M14 3v10.5a2.5 2.5 0 1 1-2.5-2.5c.2 0 .3 0 .5.03V8.9a5 5 0 1 0 4.5 5V8.5a6 6 0 0 0 3.5 1.1V7.5a4 4 0 0 1-2.5-1 4 4 0 0 1-1-3z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="payment-icons">
          <span>shopify</span>
          <span>AMEX</span>
          <span>Pay</span>
          <span>MC</span>
          <span>VISA</span>
        </div>

        <div className="copyright">
          &copy; 2000-2026, Cross Stitch. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
