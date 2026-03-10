/**
 * @typedef {{ default: string }} ModuleWithDefault
 */

/// <reference types="vite/client" />
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import heroBg from "./img_bacground_home/ChatGPT Image 6 mar. 2026, 23_07_15.jpeg";

var CABIN_PHONE = "+40 760 303 031";
var CABIN_EMAIL = "cabanadordealtadata@gmail.com";
var CABIN_FACEBOOK = "https://www.facebook.com/people/Cabana-Dor-De-Altadat%C4%83/61585044550123/";

var C = {
  sunsetDeep: "#1c0e08",
  sunsetDark: "#3b1a0a",
  burgundy: "#6b2033",
  ember: "#b84a1c",
  orange: "#d4741a",
  amber: "#e8a630",
  gold: "#f0c754",
  peach: "#f5d6a8",
  cream: "#fdf6ec",
  warmWhite: "#fefaf4",
  forest: "#2d4a32",
  sage: "#5a8a5e",
  stone: "#8a7b6b",
  bark: "#5c3d2e",
};

// Vite oferă import.meta.globEager pentru a importa fișiere din folder.
// Dacă pagina e deschisă direct din filesystem (file://), browserul nu are această funcție.
/**
 * @param {string} pattern
 * @returns {Record<string, ModuleWithDefault>}
 */

/**
 * Generează un text alternativ din numele fișierului.
 * @param {string} path
 * @returns {string}
 */
function makeAltFromPath(path) {
  var name = path.split("/").pop() || "";
  name = name.replace(/\.[^.]+$/, "");
  name = name.replace(/[_\-\.]+/g, " ");
  name = name.replace(/\s+/g, " ").trim();
  return name || "Imagine";
}

// Vite 5: import.meta.glob cu { eager: true } înlocuiește globEager
const imageModules = import.meta.glob("./imagini/*.{jpg,jpeg,png,webp}", { eager: true });
const videoModules = import.meta.glob("./video/*.{mp4,webm}", { eager: true });

var PHOTOS = Object.keys(imageModules).map(function(path) {
  var mod = /** @type {ModuleWithDefault} */ (imageModules[path]);
  return { src: mod.default, alt: makeAltFromPath(path) };
});

var VIDEO_SOURCES = Object.keys(videoModules).map(function(path) {
  var mod = /** @type {ModuleWithDefault} */ (videoModules[path]);
  return { src: mod.default, label: makeAltFromPath(path) };
});

var aboutTexts = [
  "Totul a pornit din dragostea pentru frumusețea simplă a vieții de altădată. Așa am ajuns să găsim această căbănuță, ascunsă într-un colț de liniște, unde parcă timpul curge mai încet, iar sufletul se așază în tihnă. Foștii proprietari, doi oameni în vârstă, obișnuiau să stea pe șezlongul din fața cabanei și să privească în liniște spre dealurile și vârfurile care se zăresc în depărtare. Parcă întreaga poveste a locului a rămas vie în această imagine simplă și frumoasă.",
  "Cabana este foarte retrasă, înconjurată de liniște și de o frumusețe firească, nealterată. Este locul în care te desprinzi de agitația zilnică și îți amintești cât de bine poate face simplitatea. Aici, totul te îndeamnă să încetinești, să respiri aer curat, să asculți natura și să te bucuri de clipele mici, care ajung să însemne atât de mult.",
  "Camerele din lemn, fiecare cu soba ei, păstrează o căldură aparte, care te duce cu gândul la copilărie și la serile liniștite de odinioară. Lumina focului, mirosul lemnului și atmosfera blândă din interior creează o stare de pace și de bine, greu de descris în cuvinte. Pentru cei care își doresc să se trezească într-un loc cu farmec autentic, unde se mai simte frumusețea vremurilor de altădată, această căbănuță oferă o experiență cu adevărat specială.",
  "În spatele căbănuțelor curge un pârâu limpede, venit din Munții Gurghiului, însoțit de un mic lac, iar la aproximativ 150 de metri se varsă în râul Moldova. Toată această frumusețe completează firesc povestea locului și îi dă un farmec aparte, pe care îl simți din primul moment. Este un loc simplu, cald și plin de suflet. Un loc în care vii ca să te odihnești, dar din care pleci cu inima mai liniștită și mai plină.",
];

var featuresList = [
  { icon: "🌲", title: "Izolare Totală", desc: "Liniște deplină în inima naturii" },
  { icon: "🔥", title: "Sobă de Lemn", desc: "Foc viu în fiecare cameră" },
  { icon: "💧", title: "Pârâu de Munte", desc: "Apă cristalină din munții Hurghiș" },
  { icon: "⛰️", title: "Priveliște", desc: "Vedere panoramică spre vârf" },
];

/**
 * Observa un element DOM și semnalează dacă este în viewport.
 * @param {number} [threshold]
 * @returns {[import("react").RefObject<HTMLDivElement>, boolean]}
 */
function useInView(threshold) {
  var t = threshold || 0.15;
  var ref = /** @type {import("react").RefObject<HTMLDivElement>} */ (useRef(/** @type {unknown} */ (null)));
  // Start visible so content is shown even if IntersectionObserver doesn't fire immediately.
  var [visible, setVisible] = useState(true);
  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(
      function(entries) { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: t }
    );
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, [t]);
  return [ref, visible];
}

/**
 * Iconiță telefon.
 * @param {{size?: number, color?: string}} props
 */
function PhoneIcon(props) {
  var s = props.size || 16;
  var c = props.color || "currentColor";
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

/**
 * Iconiță email.
 * @param {{size?: number, color?: string}} props
 */
function MailIcon(props) {
  var s = props.size || 16;
  var c = props.color || "currentColor";
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/**
 * Iconiță Facebook.
 * @param {{size?: number, color?: string}} props
 */
function FacebookIcon(props) {
  var s = props.size || 16;
  var c = props.color || "currentColor";
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/**
 * @param {{light?: boolean, children?: import('react').ReactNode}} props
 */
function SectionLabel(props) {
  var light = props.light;
  return (
    <div style={{
      display: "inline-block",
      padding: "6px 22px",
      borderRadius: 50,
      border: light ? "1px solid rgba(240,199,84,0.35)" : "1px solid rgba(184,74,28,0.25)",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      color: light ? C.peach : C.ember,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 16,
    }}>
      {props.children}
    </div>
  );
}

var headingStyle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(32px, 5vw, 52px)",
  fontWeight: 700,
  color: C.sunsetDark,
  margin: "8px 0 0",
  lineHeight: 1.2,
};

function TopBar() {
  var [scrolled, setScrolled] = useState(false);
  var [menuOpen, setMenuOpen] = useState(false);

  useEffect(function() {
    function h() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", h, { passive: true });
    return function() { window.removeEventListener("scroll", h); };
  }, []);

  /** @param {string} id */
  function navTo(id) {
    setMenuOpen(false);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="topbar" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(28,14,8,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
      borderBottom: scrolled ? "1px solid rgba(232,166,48,0.2)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }} className="topbar-inner">
        <a href="#" onClick={(e) => { e.preventDefault(); navTo("hero"); }} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20, fontWeight: 700, color: C.gold,
          textDecoration: "none", letterSpacing: 1,
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0,
        }}>
          <SunIcon /> Dor de Altădată
        </a>

        {/* Hamburger button – visible only on mobile via CSS */}
        <button
          className="hamburger"
          onClick={function() { setMenuOpen(function(o) { return !o; }); }}
          style={{
            display: "none", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: 5, width: 40, height: 40,
            background: "transparent", border: "none", cursor: "pointer", padding: 4,
          }}
          aria-label="Meniu"
        >
          <span className={"ham-line" + (menuOpen ? " open1" : "")} style={{ display: "block", width: 22, height: 2, background: C.gold, borderRadius: 2, transition: "all 0.3s" }} />
          <span className={"ham-line" + (menuOpen ? " open2" : "")} style={{ display: "block", width: 22, height: 2, background: C.gold, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span className={"ham-line" + (menuOpen ? " open3" : "")} style={{ display: "block", width: 22, height: 2, background: C.gold, borderRadius: 2, transition: "all 0.3s" }} />
        </button>

        <nav className={"nav-links" + (menuOpen ? " nav-open" : "")} style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Despre", "Foto", "Video", "Contact"].map(function(s) {
            return (
              <a key={s} href="#" onClick={(e) => { e.preventDefault(); navTo(s.toLowerCase()); }} style={{
                color: C.cream, textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                letterSpacing: 1.5, textTransform: "uppercase",
                fontWeight: 500, transition: "color 0.3s", cursor: "pointer",
              }}
                onMouseEnter={function(e) { e.currentTarget.style.color = C.amber; }}
                onMouseLeave={function(e) { e.currentTarget.style.color = C.cream; }}
              >{s}</a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  var loadState = useState(false);
  var loaded = loadState[0];
  var setLoaded = loadState[1];

  useEffect(function() {
    var t = setTimeout(function() { setLoaded(true); }, 200);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
      overflow: "hidden",
    }}>
      {/* Overlay subtil doar pentru lizibilitate text */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.18)",
      }} />

      <div style={{
        textAlign: "center", zIndex: 2, padding: "0 24px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{
          display: "inline-block", padding: "8px 28px", borderRadius: 50,
          border: "1px solid rgba(240,199,84,0.6)", marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700,
          textShadow: "0 2px 12px rgba(240,199,84,0.4)",
        }}>
          Refugiu în Natură
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(42px, 7vw, 90px)",
          color: C.cream, fontWeight: 700, lineHeight: 1.08,
          margin: "0 0 20px",
          textShadow: "0 4px 40px rgba(28,14,8,0.5), 0 0 80px rgba(232,166,48,0.15)",
        }}>
          Dor de<br />
          <span style={{
            background: "linear-gradient(135deg, #f0c754, #e8a630, #d4741a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontStyle: "italic",
          }}>Altădată</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(16px, 2vw, 20px)",
          color: C.gold, maxWidth: 540, margin: "0 auto 44px",
          lineHeight: 1.7, fontWeight: 600,
          textShadow: "0 2px 16px rgba(240,199,84,0.35)",
        }}>
          O cabană izolată în munți, unde timpul stă pe loc și natura vorbește în culori de apus.
        </p>

        <a href="#" className="hero-cta" onClick={(e) => { e.preventDefault(); var el = document.getElementById("despre"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 44px", borderRadius: 50,
          background: "linear-gradient(135deg, #f0c754, #e8a630, #d4741a)",
          color: C.sunsetDeep, fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: 1,
          boxShadow: "0 8px 36px rgba(232,166,48,0.35)",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        }}
          onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 14px 50px rgba(232,166,48,0.5)"; }}
          onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(232,166,48,0.35)"; }}
        >
          Descoperă Povestea
        </a>
      </div>
    </section>
  );
}

function Despre() {
  var [ref, vis] = useInView();

  return (
    <section id="despre" className="sec" style={{
      padding: "100px 24px", background: C.warmWhite,
      position: "relative", overflow: "hidden",
      scrollMarginTop: 70,
    }}>
      {/* Model discret de puncte calde */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.035,
        backgroundImage: "radial-gradient(#b84a1c 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Strălucire caldă în colț */}
      <div style={{
        position: "absolute", top: -200, right: -200,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,166,48,0.08), transparent 70%)",
      }} />

      <div ref={ref} style={{
        maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1s cubic-bezier(.4,0,.2,1)",
      }}>
        <SectionLabel>Despre Noi</SectionLabel>
        <h2 style={headingStyle}>Povestea Cabanei</h2>

        <div style={{
          display: "grid", gridTemplateColumns: "6px 1fr",
          gap: 28, marginTop: 48,
        }}>
          <div style={{
            background: "linear-gradient(to bottom, #f0c754, #d4741a, #6b2033)",
            borderRadius: 4,
          }} />
          <div>
            {aboutTexts.map(function(p, i) {
              return (
                <p key={i} className="about-text" style={{
                  fontFamily: "'Lora', Georgia, serif", fontSize: 19,
                  fontWeight: 700, lineHeight: 1.95, color: "#2a1a0e", margin: "0 0 24px",
                  opacity: vis ? 1 : 0,
                  transform: vis ? "translateX(0)" : "translateX(30px)",
                  transition: "all 0.8s cubic-bezier(.4,0,.2,1) " + (0.3 + i * 0.15) + "s",
                }}>
                  {i === 0 && (
                    <span style={{
                      fontSize: 48, fontFamily: "'Playfair Display', serif",
                      color: C.ember, float: "left", lineHeight: 1,
                      marginRight: 10, marginTop: 4,
                    }}>{"\u201E"}</span>
                  )}
                  {p}
                </p>
              );
            })}
          </div>
        </div>

        <div className="features-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20, marginTop: 52,
        }}>
          {featuresList.map(function(f, i) {
            return (
              <div key={i} style={{
                background: "white", borderRadius: 16,
                padding: "28px 22px", textAlign: "center",
                boxShadow: "0 4px 24px rgba(184,74,28,0.07)",
                border: "1px solid rgba(232,166,48,0.12)",
                transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(30px)",
                transitionDelay: (0.5 + i * 0.1) + "s",
                cursor: "default",
              }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(232,166,48,0.18)";
                  e.currentTarget.style.borderColor = "rgba(232,166,48,0.3)";
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(184,74,28,0.07)";
                  e.currentTarget.style.borderColor = "rgba(232,166,48,0.12)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.icon}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 17,
                  fontWeight: 700, color: C.sunsetDark, marginBottom: 6,
                }}>{f.title}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.stone,
                }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Foto() {
  var [ref, vis] = useInView();
  var [current, setCurrent] = useState(0);
  var [direction, setDirection] = useState(/** @type {"left"|"right"} */ ("right"));
  var [selected, setSelected] = useState(/** @type {number|null} */ (null));

  function goPrev() {
    setDirection("left");
    setCurrent(function(c) { return (c - 1 + PHOTOS.length) % PHOTOS.length; });
  }

  function goNext() {
    setDirection("right");
    setCurrent(function(c) { return (c + 1) % PHOTOS.length; });
  }

  var navBtnStyle = {
    flexShrink: 0, width: 48, height: 48, borderRadius: 999,
    border: "none", background: "rgba(0,0,0,0.55)",
    color: "white", cursor: "pointer", fontSize: 24,
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
    transition: "background 0.2s, transform 0.15s",
  };

  return (
    <section id="foto" className="sec" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #1c0e08 0%, #3b1a0a 50%, #1c0e08 100%)",
      position: "relative",
      scrollMarginTop: 70,
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(212,116,26,0.08), transparent 70%)",
      }} />

      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(.4,0,.2,1)",
      }}>
        <SectionLabel light>Galerie</SectionLabel>
        <h2 style={{ ...headingStyle, color: C.peach }}>Foto</h2>

        {PHOTOS.length === 0 ? (
          <div style={{
            marginTop: 48, padding: 24, borderRadius: 16,
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(232,166,48,0.25)",
            textAlign: "center", color: C.cream,
          }}>
            <strong>Nu s-au găsit imagini.</strong>
          </div>
        ) : (
          <>
            {/* ── Poza principala + sageti ── */}
            <div className="gallery-outer" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 48 }}>
              <button type="button" onClick={goPrev} className="nav-btn" style={navBtnStyle}
                onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(232,166,48,0.25)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; e.currentTarget.style.transform = "scale(1)"; }}
              >◀</button>

              {/* Cadrul foto */}
              <div style={{
                flex: 1, position: "relative", borderRadius: 18, overflow: "hidden",
                aspectRatio: "3/2", cursor: "pointer",
                boxShadow: "0 20px 70px rgba(0,0,0,0.55), 0 0 100px rgba(232,166,48,0.07)",
                border: "1px solid rgba(232,166,48,0.2)",
              }} onClick={function() { setSelected(current); }}>
                <img
                  key={current}
                  src={PHOTOS[current].src}
                  alt={PHOTOS[current].alt}
                  className={direction === "right" ? "photo-slide-right" : "photo-slide-left"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Gradient jos pentru lizibilitate badge-uri */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                  background: "linear-gradient(to top, rgba(8,3,1,0.75), transparent)",
                  pointerEvents: "none",
                }} />
                {/* Counter */}
                <div style={{
                  position: "absolute", bottom: 14, right: 16,
                  background: "rgba(28,14,8,0.8)", backdropFilter: "blur(8px)",
                  color: C.amber, fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(11px,1.5vw,13px)", fontWeight: 600,
                  padding: "5px 14px", borderRadius: 20, letterSpacing: 1,
                  border: "1px solid rgba(232,166,48,0.3)",
                }}>
                  {current + 1} / {PHOTOS.length}
                </div>
                {/* Hint fullscreen */}
                <div style={{
                  position: "absolute", bottom: 14, left: 16,
                  background: "rgba(28,14,8,0.8)", backdropFilter: "blur(8px)",
                  color: C.peach, fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(10px,1.3vw,12px)",
                  padding: "5px 14px", borderRadius: 20,
                  border: "1px solid rgba(232,166,48,0.2)", opacity: 0.85,
                }}>
                  ↗ Fullscreen
                </div>
              </div>

              <button type="button" onClick={goNext} className="nav-btn" style={navBtnStyle}
                onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(232,166,48,0.25)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; e.currentTarget.style.transform = "scale(1)"; }}
              >▶</button>
            </div>

            {/* Bara de progres */}
            <div style={{ marginTop: 18, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: "linear-gradient(90deg, #f0c754, #d4741a)",
                width: ((current + 1) / PHOTOS.length * 100) + "%",
                transition: "width 0.45s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>

          </>
        )}
      </div>

      {/* ── Lightbox fullscreen ── */}
      {selected !== null && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200,
          background: "rgba(28,14,8,0.95)", backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }} onClick={function() { setSelected(null); }}>
          <div className="fullscreen-row" style={{
            display: "flex", alignItems: "center", gap: 24, cursor: "default",
          }} onClick={function(e) { e.stopPropagation(); }}>
            <button
              type="button"
              onClick={function(e) {
                e.stopPropagation();
                setSelected(function(prev) {
                  var idx = prev ?? 0;
                  var next = (idx - 1 + PHOTOS.length) % PHOTOS.length;
                  setCurrent(next);
                  return next;
                });
              }}
              className="nav-btn" style={navBtnStyle}
            >◀</button>

            <img
              key={"fs-" + selected}
              src={PHOTOS[selected].src}
              alt={PHOTOS[selected].alt}
              className="photo-slide-right"
              style={{
                maxWidth: "80vw", maxHeight: "80vh", borderRadius: 14,
                boxShadow: "0 24px 90px rgba(0,0,0,0.7), 0 0 60px rgba(232,166,48,0.1)",
                border: "1px solid rgba(232,166,48,0.2)",
                display: "block",
              }}
            />

            <button
              type="button"
              onClick={function(e) {
                e.stopPropagation();
                setSelected(function(prev) {
                  var next = ((prev ?? 0) + 1) % PHOTOS.length;
                  setCurrent(next);
                  return next;
                });
              }}
              className="nav-btn" style={navBtnStyle}
            >▶</button>
          </div>

          {/* Counter fullscreen */}
          <div style={{
            marginTop: 16, color: C.amber, fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, letterSpacing: 1, opacity: 0.8,
          }}>
            {(selected ?? 0) + 1} / {PHOTOS.length}
          </div>

          <div
            onClick={function(e) { e.stopPropagation(); setSelected(null); }}
            style={{
              marginTop: 12, color: C.peach, fontSize: 32, fontWeight: 300,
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer", lineHeight: 1,
            }}
          >✕</div>
        </div>
      )}
    </section>
  );
}

function VideoSection() {
  var [ref, vis] = useInView();
  var [selected, setSelected] = useState(0);
  var [fullSelected, setFullSelected] = useState(/** @type {number|null} */ (null));
  var videoNavRef = useRef(/** @type {HTMLDivElement|null} */ (null));


  var currentVideo = VIDEO_SOURCES[selected] || VIDEO_SOURCES[0] || null;

  return (
    <section id="video" className="sec" style={{
      padding: "100px 24px",
      background: C.warmWhite,
      position: "relative", overflow: "hidden",
      scrollMarginTop: 70,
    }}>
      {/* Model discret de puncte calde */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.035,
        backgroundImage: "radial-gradient(#b84a1c 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <div style={{
        position: "absolute", top: -200, left: -200,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,166,48,0.08), transparent 70%)",
      }} />

      <div ref={ref} style={{
        maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(.4,0,.2,1)",
      }}>
        <SectionLabel>Experiență</SectionLabel>
        <h2 style={headingStyle}>Video</h2>

        <div className="gallery-outer" style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12 }}>
          {VIDEO_SOURCES.length > 1 && (
            <button
              type="button"
              onClick={function() { setSelected(function(s) { return (s - 1 + VIDEO_SOURCES.length) % VIDEO_SOURCES.length; }); }}
              style={{
                flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                border: "none", background: "rgba(0,0,0,0.4)",
                color: "white", cursor: "pointer", fontSize: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >◀</button>
          )}

          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(184,74,28,0.07)",
              border: "1px solid rgba(232,166,48,0.12)",
              background: "white",
              width: "100%", maxWidth: 420,
              aspectRatio: "3/2",
            }}>
              {currentVideo ? (
                <video
                  key={currentVideo.src}
                  controls
                  src={currentVideo.src}
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", background: "#111" }}
                />
              ) : (
                <div style={{ padding: 48, textAlign: "center", color: C.bark }}>
                  Nu s-au găsit clipuri video.
                </div>
              )}
            </div>
          </div>

          {VIDEO_SOURCES.length > 1 && (
            <button
              type="button"
              onClick={function() { setSelected(function(s) { return (s + 1) % VIDEO_SOURCES.length; }); }}
              style={{
                flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                border: "none", background: "rgba(0,0,0,0.4)",
                color: "white", cursor: "pointer", fontSize: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >▶</button>
          )}
        </div>

        {VIDEO_SOURCES.length > 1 && (
          <div ref={videoNavRef} className="galleryScroll" style={{
            marginTop: 16, display: "flex", gap: 12,
            justifyContent: "center", overflowX: "auto", padding: "0 0 8px",
          }}>
            {VIDEO_SOURCES.map(function(video, i) {
              var active = i === selected;
              return (
                <button key={video.src} onClick={function() { setSelected(i); }} style={{
                  padding: "10px 16px", borderRadius: 999,
                  border: active ? "1px solid " + C.ember : "1px solid rgba(184,74,28,0.2)",
                  background: active ? "rgba(184,74,28,0.1)" : "white",
                  color: active ? C.ember : C.bark, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  transition: "all 0.2s", flex: "0 0 auto",
                }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(184,74,28,0.08)"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = active ? "rgba(184,74,28,0.1)" : "white"; }}
                >
                  {video.label}
                </button>
              );
            })}
          </div>
        )}

        {fullSelected !== null && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200,
            background: "rgba(28,14,8,0.92)", backdropFilter: "blur(10px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }} onClick={function() { setFullSelected(null); }}>
            <div className="fullscreen-row" style={{
              display: "flex", alignItems: "center", gap: 24, cursor: "default",
            }} onClick={function(e) { e.stopPropagation(); }}>
              <button
                type="button"
                onClick={function(e) {
                  e.stopPropagation();
                  var idx = fullSelected ?? 0;
                  var next = (idx - 1 + VIDEO_SOURCES.length) % VIDEO_SOURCES.length;
                  setFullSelected(next); setSelected(next);
                }}
                className="nav-btn" style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                  border: "none", background: "rgba(0,0,0,0.4)",
                  color: "white", cursor: "pointer", fontSize: 24,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >◀</button>

              <video
                key={VIDEO_SOURCES[fullSelected ?? 0].src}
                controls
                src={VIDEO_SOURCES[fullSelected ?? 0].src}
                style={{
                  maxWidth: "80vw", maxHeight: "80vh", borderRadius: 14,
                  boxShadow: "0 20px 80px rgba(0,0,0,0.6), 0 0 60px rgba(232,166,48,0.1)",
                  border: "1px solid rgba(232,166,48,0.2)",
                }}
              />

              <button
                type="button"
                onClick={function(e) {
                  e.stopPropagation();
                  var idx = fullSelected ?? 0;
                  var next = (idx + 1) % VIDEO_SOURCES.length;
                  setFullSelected(next); setSelected(next);
                }}
                className="nav-btn" style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                  border: "none", background: "rgba(0,0,0,0.4)",
                  color: "white", cursor: "pointer", fontSize: 24,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >▶</button>
            </div>

            <div
              onClick={function(e) { e.stopPropagation(); setFullSelected(null); }}
              style={{
                marginTop: 24, color: C.peach, fontSize: 32, fontWeight: 300,
                fontFamily: "'DM Sans', sans-serif", cursor: "pointer", lineHeight: 1,
              }}
            >✕</div>
          </div>
        )}

        <p style={{
          fontFamily: "'Lora', serif", fontSize: 16, color: C.stone,
          textAlign: "center", marginTop: 24, fontStyle: "italic",
        }}>
          Descoperă atmosfera unică a cabanei noastre prin ochii celor care au fost aici.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  var [ref, vis] = useInView();

  var cardSt = {
    display: "flex", alignItems: "center", gap: 16,
    padding: "20px 36px", borderRadius: 16,
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(240,199,84,0.18)",
    textDecoration: "none", width: "100%", maxWidth: 400,
    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
  };

  var iconBox = {
    width: 48, height: 48, borderRadius: 12,
    background: "linear-gradient(135deg, #f0c754, #d4741a)",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  };

/** @param {import('react').MouseEvent<HTMLAnchorElement>} e */
  function hIn(e) {
    e.currentTarget.style.background = "rgba(232,166,48,0.12)";
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.borderColor = "rgba(240,199,84,0.4)";
  }
  /** @param {import('react').MouseEvent<HTMLAnchorElement>} e */
  function hOut(e) {
    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.borderColor = "rgba(240,199,84,0.18)";
  }

  return (
    <section id="contact" className="sec" style={{
      padding: "100px 24px",
      background: "linear-gradient(165deg, #1c0e08, #3b1a0a, #6b2033)",
      position: "relative", overflow: "hidden",
      scrollMarginTop: 70,
    }}>
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,166,48,0.06), transparent 60%)",
      }} />

      <div ref={ref} style={{
        maxWidth: 700, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1s cubic-bezier(.4,0,.2,1)",
      }}>
        <SectionLabel light>Rezervări</SectionLabel>
        <h2 style={{ ...headingStyle, color: C.peach }}>Contact</h2>

        <p style={{
          fontFamily: "'Lora', serif", fontSize: 18, color: C.peach,
          marginTop: 20, lineHeight: 1.8, opacity: 0.8,
        }}>
          Pentru rezervări și informații, nu ezitați să ne contactați. Vă așteptăm cu drag!
        </p>

        <div style={{
          display: "flex", flexDirection: "column", gap: 20,
          marginTop: 48, alignItems: "center",
        }}>
          <a href={"tel:" + CABIN_PHONE} className="contact-card" style={cardSt} onMouseEnter={hIn} onMouseLeave={hOut}>
            <div style={iconBox}><PhoneIcon size={22} color={C.sunsetDeep} /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Telefon</div>
              <div className="contact-card-value" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.cream, fontWeight: 600 }}>{CABIN_PHONE}</div>
            </div>
          </a>

          <a href="https://wa.me/40760303031" target="_blank" rel="noreferrer" className="contact-card" style={cardSt} onMouseEnter={hIn} onMouseLeave={hOut}>
            <div style={{ ...iconBox, background: "linear-gradient(135deg, #25d366, #128c7e)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={C.sunsetDeep}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.886a.5.5 0 0 0 .611.611l6.024-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.376l-.36-.214-3.724.912.929-3.626-.234-.373A9.818 9.818 0 1 1 12 21.818z"/></svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>WhatsApp</div>
              <div className="contact-card-value" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.cream, fontWeight: 600 }}>{CABIN_PHONE}</div>
            </div>
          </a>

          <a href={"mailto:" + CABIN_EMAIL} className="contact-card" style={cardSt} onMouseEnter={hIn} onMouseLeave={hOut}>
            <div style={iconBox}><MailIcon size={22} color={C.sunsetDeep} /></div>
            <div style={{ textAlign: "left", minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Email</div>
              <div className="contact-card-value" style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.cream, fontWeight: 600, wordBreak: "break-all" }}>{CABIN_EMAIL}</div>
            </div>
          </a>

          <a href={CABIN_FACEBOOK} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 40px", borderRadius: 50, marginTop: 12,
            background: "linear-gradient(135deg, #f0c754, #e8a630, #d4741a)",
            color: C.sunsetDeep, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: 15, textDecoration: "none",
            boxShadow: "0 8px 32px rgba(232,166,48,0.3)",
            transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          }}
            onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 14px 50px rgba(232,166,48,0.5)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,166,48,0.3)"; }}
          >
            <FacebookIcon size={20} /> Vizitează-ne pe Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  var year = new Date().getFullYear();
  return (
    <footer style={{
      padding: "40px 24px", background: C.sunsetDeep,
      borderTop: "1px solid rgba(232,166,48,0.12)", textAlign: "center",
    }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.stone, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(232,166,48,0.1)" }}>
        © {year} Dor de Altădată – Cabană de munte. Toate drepturile rezervate.
      </p>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
          Proiectat &amp; Dezvoltat de
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: C.amber, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Anton Ovidiu Gabriel
          <a href="https://wa.me/40759337248" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(37,211,102,0.3)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "rgba(37,211,102,0.15)"; }}
            title="WhatsApp: 0759 337 248"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.886a.5.5 0 0 0 .611.611l6.024-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.376l-.36-.214-3.724.912.929-3.626-.234-.373A9.818 9.818 0 1 1 12 21.818z"/></svg>
          </a>
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.stone, fontStyle: "italic" }}>
          Inginer Software · Arhitect de Sisteme de Inteligență Artificială
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(function() {
    console.log("PHOTOS detected:", PHOTOS.length, "videos detected:", VIDEO_SOURCES.length);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{
        /* ── Reset & base ─────────────────────────────────── */
        "*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; } " +
        "html { scroll-behavior: smooth; } " +
        "body { background: #fefaf4; } " +
        "img { display: block; } " +
        ".galleryScroll { -ms-overflow-style: none; scrollbar-width: none; } " +
        ".galleryScroll::-webkit-scrollbar { display: none; } " +
        "::selection { background: rgba(232,166,48,0.3); color: #1c0e08; } " +
        "@keyframes heroFloat { 0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-30px) scale(1.04);}} " +
        "@keyframes photoSlideInRight { " +
        "  0%   { transform: translateX(90px) scale(0.93); opacity: 0; filter: blur(6px); } " +
        "  60%  { filter: blur(0); } " +
        "  100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); } " +
        "} " +
        "@keyframes photoSlideInLeft { " +
        "  0%   { transform: translateX(-90px) scale(0.93); opacity: 0; filter: blur(6px); } " +
        "  60%  { filter: blur(0); } " +
        "  100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); } " +
        "} " +
        ".photo-slide-right { animation: photoSlideInRight 0.6s cubic-bezier(.4,0,.2,1) both; } " +
        ".photo-slide-left  { animation: photoSlideInLeft  0.6s cubic-bezier(.4,0,.2,1) both; } " +

        /* ── Fluid sizing – scalare continua cu clamp() ─── */

        /* Sectiuni: padding vertical + orizontal fluid */
        ".sec { padding: clamp(52px,8vw,100px) clamp(14px,3.5vw,24px) !important; } " +

        /* Topbar inner */
        ".topbar-inner { padding: clamp(10px,1.4vw,14px) clamp(16px,3vw,28px) !important; } " +

        /* Nav desktop – gap si font fluid */
        ".nav-links { gap: clamp(16px,2.4vw,28px) !important; } " +
        ".nav-links a { font-size: clamp(11px,1.3vw,14px) !important; } " +

        /* Butoane ◀▶ – dimensiune si font fluid */
        ".nav-btn { " +
        "  width:  clamp(34px,5vw,48px) !important; " +
        "  height: clamp(34px,5vw,48px) !important; " +
        "  font-size: clamp(14px,2.8vw,24px) !important; " +
        "  flex-shrink: 0 !important; " +
        "} " +

        /* Gallery outer row (buton + scroll + buton) */
        ".gallery-outer { " +
        "  gap: clamp(6px,1.2vw,12px) !important; " +
        "  margin-top: clamp(28px,4.5vw,48px) !important; " +
        "} " +

        /* Gap intre poze in galerie */
        ".gallery-inner { gap: clamp(10px,2vw,20px) !important; } " +

        /* Dimensiunea fiecarei poze */
        ".gallery-photo { " +
        "  min-width: clamp(180px,42vw,320px) !important; " +
        "  max-width: clamp(220px,52vw,420px) !important; " +
        "} " +

        /* Gap intre butoane si media in fullscreen */
        ".fullscreen-row { gap: clamp(6px,1.8vw,24px) !important; } " +

        /* Buton CTA hero */
        ".hero-cta { " +
        "  padding: clamp(12px,1.8vw,16px) clamp(22px,4vw,44px) !important; " +
        "  font-size: clamp(12px,1.5vw,15px) !important; " +
        "} " +

        /* Text Despre */
        ".about-text { " +
        "  font-size: clamp(14px,3.2vw,18px) !important; " +
        "  line-height: 1.85 !important; " +
        "} " +

        /* Grid features */
        ".features-grid { " +
        "  gap: clamp(12px,2vw,20px) !important; " +
        "  grid-template-columns: repeat(auto-fit, minmax(clamp(150px,28vw,200px), 1fr)) !important; " +
        "} " +

        /* Contact cards */
        ".contact-card { " +
        "  padding: clamp(14px,2.4vw,20px) clamp(16px,3.2vw,36px) !important; " +
        "} " +
        ".contact-card-value { " +
        "  font-size: clamp(13px,2.8vw,20px) !important; " +
        "  word-break: break-all; " +
        "} " +

        /* ── Hamburger menu (numai sub 640px) ────────────── */
        ".hamburger { display: none !important; } " +

        "@media (max-width: 640px) { " +
        "  .hamburger { display: flex !important; } " +
        "  .nav-links { " +
        "    display: none !important; position: absolute; top: 100%; left: 0; right: 0; " +
        "    flex-direction: column !important; gap: 0 !important; " +
        "    background: rgba(20,10,5,0.98); backdrop-filter: blur(16px); " +
        "    border-bottom: 1px solid rgba(232,166,48,0.15); padding: 8px 0; " +
        "  } " +
        "  .nav-links.nav-open { display: flex !important; } " +
        "  .nav-links a { " +
        "    padding: 14px 24px !important; font-size: 14px !important; " +
        "    letter-spacing: 1.5px !important; " +
        "    border-bottom: 1px solid rgba(255,255,255,0.06) !important; " +
        "    width: 100%; " +
        "  } " +
        "  .topbar-inner { position: relative; } " +
        "}"
      }</style>
      <TopBar />
      <Hero />
      <Despre />
      <Foto />
      <VideoSection />
      <Contact />
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
