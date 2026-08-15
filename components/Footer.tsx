import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="brand">
              <span className="brand__mark">S</span>
              <span className="brand__name">
                {site.name}
                <small>{site.tagline}</small>
              </span>
            </div>
            <p>
              Practical POPIA and data-privacy consulting for South African
              businesses of every size. We make compliance clear, achievable and
              sustainable.
            </p>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get started</h4>
            <ul>
              <li><Link href="/assessment">Free POPIA Test</Link></li>
              <li><Link href="/contact">Book a consultation</Link></li>
              <li><Link href="/services">Gap assessment</Link></li>
              <li><Link href="/services">Staff training</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>{site.locations}</li>
              <li>{site.coverage}</li>
              <li>{site.hours}</li>
              <li><Link href="/contact">Send us a message →</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} (Pty) Ltd. All rights
            reserved.
          </span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
            <Link href="/paia">PAIA Manual</Link> · General information, not
            legal advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
