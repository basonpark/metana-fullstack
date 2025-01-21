import './Footer.css';
import { CONTACT_EMAIL, CONTACT_PHONE, COPYRIGHT_INFO } from '../config.js';

function Footer() {
  return (
    <footer id="footer" className="justify-around">
      <div className="space-between w-95">
        <span>Copyright: {COPYRIGHT_INFO}</span>
        <span className="footer-contact">
          <span className="footer-email">
            email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
          </span>
          <span className="footer-phone"> ph: {CONTACT_PHONE}</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
