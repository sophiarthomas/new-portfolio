import { useState, useRef, useEffect } from "react";
import '../App.css'

const NAV_LINKS = ["HOME", "PROJECTS", "EXPERIENCE", "CONTACT"];

export default function RibbitNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("HOME");
  const menuRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState(0);

  // Measure the natural width of the menu so we can animate to it
  useEffect(() => {
    if (menuRef.current) {
      // Temporarily make it visible to measure
      menuRef.current.style.width = "max-content";
      menuRef.current.style.opacity = "0";
      menuRef.current.style.pointerEvents = "none";
      setMenuWidth(menuRef.current.scrollWidth);
      menuRef.current.style.width = "";
      menuRef.current.style.opacity = "";
    }
  }, []);

  useEffect(() => {
    const observers = []; 

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.toLowerCase()); 
      if (!el) return; 

      const observer = new IntersectionObserver (
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePage(link); 
          }
        }, 
        {
          threshold: 0.3, 
          rootMargin: "-60px 0px 0px 0px", 
        }
      ); 

      observer.observe(el); 
      observers.push(observer); 
    }); 
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      
      <nav className="ribbit-nav">
        <button
          className="ribbit-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="ribbit-logo-text">sophia thomas</span>
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </div>
        </button>

        <div className={`ribbit-divider ${isOpen ? "visible" : ""}`} />

        <div
          ref={menuRef}
          className={`ribbit-menu ${isOpen ? "open" : ""}`}
          style={{ width: isOpen && menuWidth ? `${menuWidth}px` : undefined }}
          role="menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={link === activePage ? "active" : ""}
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
