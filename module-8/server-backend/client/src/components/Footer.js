import '../index.css';

function Footer() {
  return (
    <footer id="footer" class="justify-around">
      <div class="space-between w-95">
        <span>Copyright: 2024 Super Web Dev</span>
        <span class="footer-contact">
          <span class="footer-email">
            email: <a href="mailto:info@example.com">info@example.com</a>{' '}
          </span>
          <span class="footer-phone"> ph: +1(234)567-8901</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;