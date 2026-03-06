/**
 * @typedef {{ default: string }} ModuleWithDefault
 */

/// <reference types="vite/client" />
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { images as manifestImages, videos as manifestVideos } from "./asset-manifest.js";
import heroBg from "./img_bacground_home/ChatGPT Image 6 mar. 2026, 23_07_15.png";

var CABIN_PHONE = "+40 760 303 031";
var CABIN_EMAIL = "contact@cabana-dor-de-altadata.ro";
var CABIN_FACEBOOK = "https://www.facebook.com/";

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
function safeGlobEager(pattern) {
  if (typeof import.meta.globEager === "function") {
    return import.meta.globEager(pattern);
  }
  // Debug information: if you're running this via `file://` the Vite runtime is not present.
  console.warn("import.meta.globEager is not available. Are you running via Vite dev server?", {
    pattern,
    importMeta: {
      url: import.meta.url,
      env: import.meta.env ? { ...import.meta.env } : "<no env>",
      hasGlobEager: typeof import.meta.globEager === "function",
    },
  });
  return {};
}

// Încărcăm imagini din folderul /imagini via Vite glob.
// Numele fișierelor devin alt text simplificat.
const imageModules = safeGlobEager("./imagini/*.{jpg,jpeg,png,webp}");

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

var PHOTOS = (Object.keys(imageModules).length ? Object.keys(imageModules).map(
  /** @param {string} path */
  function(path) {
    var mod = /** @type {ModuleWithDefault} */ (imageModules[path]);
    return { src: mod.default, alt: makeAltFromPath(path) };
  }
) : []);

// Fallback: dacă globEager nu e disponibil (de ex. când deschizi pagina direct `file://`),
// adaugăm imaginile detectate în manifest.
if (PHOTOS.length === 0 && manifestImages && manifestImages.length) {
  PHOTOS = manifestImages.map(function(src) {
    return { src: src, alt: makeAltFromPath(src) };
  });
}

// Încărcăm video din folderul /video.
const videoModules = safeGlobEager("./video/*.{mp4,webm}");
var VIDEO_SOURCES = (Object.keys(videoModules).length ? Object.keys(videoModules).map(
  /** @param {string} path */
  function(path) {
    var mod = /** @type {ModuleWithDefault} */ (videoModules[path]);
    return { src: mod.default, label: makeAltFromPath(path) };
  }
) : []);

// Fallback pentru video (dacă nu există globEager). Permite rularea direct din filesystem/file://
if (VIDEO_SOURCES.length === 0 && manifestVideos && manifestVideos.length) {
  VIDEO_SOURCES = manifestVideos.map(function(src) {
    return { src: src, label: makeAltFromPath(src) };
  });
}

var aboutTexts = [
  "Totul a pornit din dragostea de traiul de alta data. S-a ivit ocazia sa o gasesc cabanuta. Vechii proprietari erau batrani si se asezau pe sezlong in fata cabanei \u2014 de acolo se vedea foarte bine taramul cu varful lui.",
  "Cabana este foarte izolata, foarte linistita. Singurul deranj este, din cand in cand, trenul care trece prin vale.",
  "Camerele din lemn, fiecare cu soba de lemn, aduc cu drag aminte copilaria noastra. Se vede lumina focului in camera. Cine doreste sa se trezeasca in atmosfera timpului de alta data, aici are posibilitatea.",
  "In spatele cabanutelor exista un parau care vine din muntii Hurghis, acompaniat de un mic lac, si se revarsa la circa 150 m in raul Moldova.",
];

var featuresList = [
  { icon: "\uD83C\uDF32", title: "Izolare Totala", desc: "Liniste deplina in inima naturii" },
  { icon: "\uD83D\uDD25", title: "Soba de Lemn", desc: "Foc viu in fiecare camera" },
  { icon: "\uD83D\uDCA7", title: "Parau de Munte", desc: "Apa cristalina din muntii Hurghis" },
  { icon: "\u26F0\uFE0F", title: "Priveliste", desc: "Vedere panoramica spre varf" },
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
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];

  useEffect(function() {
    function h() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", h, { passive: true });
    return function() { window.removeEventListener("scroll", h); };
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(28,14,8,0.93)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
      borderBottom: scrolled ? "1px solid rgba(232,166,48,0.2)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); var el = document.getElementById("hero"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20, fontWeight: 700, color: C.gold,
          textDecoration: "none", letterSpacing: 1,
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
        }}>
          <SunIcon /> Dor de Altadata
        </a>

        <nav style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          {["Despre", "Foto", "Video", "Contact"].map(function(s) {
            return (
              <a key={s} href="#" onClick={(e) => { e.preventDefault(); var el = document.getElementById(s.toLowerCase()); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
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
          border: "1px solid rgba(240,199,84,0.35)", marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.peach, letterSpacing: 3, textTransform: "uppercase",
        }}>
          Refugiu in Natura
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
          }}>Altadata</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(16px, 2vw, 20px)",
          color: C.peach, maxWidth: 540, margin: "0 auto 44px",
          lineHeight: 1.7, opacity: 0.85,
        }}>
          O cabana izolata in munti, unde timpul sta pe loc si natura vorbeste in culori de apus.
        </p>

        <a href="#" onClick={(e) => { e.preventDefault(); var el = document.getElementById("despre"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
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
          Descopera Povestea
        </a>
      </div>
    </section>
  );
}

function Despre() {
  var [ref, vis] = useInView();

  return (
    <section id="despre" style={{
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
                <p key={i} style={{
                  fontFamily: "'Lora', Georgia, serif", fontSize: 18,
                  lineHeight: 1.9, color: C.bark, margin: "0 0 22px",
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

        <div style={{
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
  var [selected, setSelected] = useState(/** @type {number|null} */ (null));
  var galleryRef = useRef(/** @type {HTMLDivElement|null} */ (null));

  /**
   * Scroll the gallery container by a given offset.
   * @param {number} offset
   */
  function scrollGallery(offset) {
    var el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <section id="foto" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #1c0e08 0%, #3b1a0a 50%, #1c0e08 100%)",
      position: "relative",
      scrollMarginTop: 70,
    }}>
      {/* Strălucire caldă ambientală */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(212,116,26,0.08), transparent 70%)",
      }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel light>Galerie</SectionLabel>
        <h2 style={{ ...headingStyle, color: C.peach }}>Foto</h2>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 48 }}>
          <button
            type="button"
            onClick={function() { scrollGallery(-440); }}
            style={{
              flexShrink: 0, width: 48, height: 48, borderRadius: 999,
              border: "none", background: "rgba(0,0,0,0.4)",
              color: "white", cursor: "pointer", fontSize: 24,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >◀</button>

          <div ref={galleryRef} className="galleryScroll" style={{
            flex: 1, display: "flex",
            gap: 20,
            overflowX: "auto",
            padding: "0 0 16px",
            scrollSnapType: "x mandatory",
          }}>
          {PHOTOS.length === 0 ? (
            <div style={{
              minWidth: 300, padding: 24, borderRadius: 16,
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(232,166,48,0.25)",
              textAlign: "center", color: C.cream,
            }}>
              <strong>Nu s-au găsit imagini.</strong><br />
              Asigură-te că rulezi aplicația prin serverul Vite și accesezi <code>http://localhost:5173</code>.
            </div>
          ) : (
            PHOTOS.map(function(p, i) {
              return (
                <div key={i} style={{
                  position: "relative", borderRadius: 16, overflow: "hidden",
                  minWidth: 320, maxWidth: 420, aspectRatio: "3/2", cursor: "pointer",
                  opacity: vis ? 1 : 0,
                  transform: vis ? "scale(1)" : "scale(0.9)",
                  transition: "all 0.7s cubic-bezier(.4,0,.2,1) " + (i * 0.05) + "s",
                  border: "1px solid rgba(232,166,48,0.15)",
                  scrollSnapAlign: "center",
                  flex: "0 0 auto",
                }}
                  onClick={function() { setSelected(i); }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.borderColor = "rgba(232,166,48,0.4)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,166,48,0.2)";
                    var ov = /** @type {HTMLElement|null} */ (e.currentTarget.querySelector("[data-overlay]"));
                    if (ov) ov.style.opacity = "1";
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(232,166,48,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    var ov = /** @type {HTMLElement|null} */ (e.currentTarget.querySelector("[data-overlay]"));
                    if (ov) ov.style.opacity = "0";
                  }}
                >
                  <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div data-overlay="true" style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    background: "linear-gradient(to top, rgba(28,14,8,0.85), transparent 60%)",
                    opacity: 0, transition: "opacity 0.4s",
                  }} />
                </div>
              );
            })
          )}
        </div>

          <button
            type="button"
            onClick={function() { scrollGallery(440); }}
            style={{
              flexShrink: 0, width: 48, height: 48, borderRadius: 999,
              border: "none", background: "rgba(0,0,0,0.4)",
              color: "white", cursor: "pointer", fontSize: 24,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >▶</button>
        </div>
        <div style={{
          marginTop: 16, textAlign: "center",
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)",
        }}>
          Folosește săgețile pentru a naviga prin galerie →
        </div>
      </div>

      {selected !== null && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200,
          background: "rgba(28,14,8,0.92)", backdropFilter: "blur(10px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }} onClick={function() { setSelected(null); }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 24,
            cursor: "default",
          }} onClick={function(e) { e.stopPropagation(); }}>
            <button
              type="button"
              onClick={function(e) { e.stopPropagation(); setSelected(function(prev) { var idx = prev ?? 0; return (idx - 1 + PHOTOS.length) % PHOTOS.length; }); }}
              style={{
                flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                border: "none", background: "rgba(0,0,0,0.4)",
                color: "white", cursor: "pointer", fontSize: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >◀</button>

            <img
              src={PHOTOS[selected].src}
              alt={PHOTOS[selected].alt}
              style={{
                maxWidth: "80vw", maxHeight: "80vh", borderRadius: 14,
                boxShadow: "0 20px 80px rgba(0,0,0,0.6), 0 0 60px rgba(232,166,48,0.1)",
                border: "1px solid rgba(232,166,48,0.2)",
                display: "block",
              }}
            />

            <button
              type="button"
              onClick={function(e) { e.stopPropagation(); setSelected(function(prev) { var idx = prev ?? 0; return (idx + 1) % PHOTOS.length; }); }}
              style={{
                flexShrink: 0, width: 48, height: 48, borderRadius: 999,
                border: "none", background: "rgba(0,0,0,0.4)",
                color: "white", cursor: "pointer", fontSize: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >▶</button>
          </div>

          <div
            onClick={function(e) { e.stopPropagation(); setSelected(null); }}
            style={{
              marginTop: 24, color: C.peach, fontSize: 32, fontWeight: 300,
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
    <section id="video" style={{
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
        <SectionLabel>Experienta</SectionLabel>
        <h2 style={headingStyle}>Video</h2>

        <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12 }}>
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
                  onClick={function() { setFullSelected(selected); }}
                  style={{ width: "100%", height: "100%", display: "block", cursor: "pointer", objectFit: "cover", background: "#111" }}
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
            <div style={{
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
                style={{
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
                style={{
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
          Descopera atmosfera unica a cabanei noastre prin ochii celor care au fost aici.
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
    <section id="contact" style={{
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
        <SectionLabel light>Rezervari</SectionLabel>
        <h2 style={{ ...headingStyle, color: C.peach }}>Contact</h2>

        <p style={{
          fontFamily: "'Lora', serif", fontSize: 18, color: C.peach,
          marginTop: 20, lineHeight: 1.8, opacity: 0.8,
        }}>
          Pentru rezervari si informatii, nu ezitati sa ne contactati. Va asteptam cu drag!
        </p>

        <div style={{
          display: "flex", flexDirection: "column", gap: 20,
          marginTop: 48, alignItems: "center",
        }}>
          <a href={"tel:" + CABIN_PHONE} style={cardSt} onMouseEnter={hIn} onMouseLeave={hOut}>
            <div style={iconBox}><PhoneIcon size={22} color={C.sunsetDeep} /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Telefon</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.cream, fontWeight: 600 }}>{CABIN_PHONE}</div>
            </div>
          </a>

          <a href={"mailto:" + CABIN_EMAIL} style={cardSt} onMouseEnter={hIn} onMouseLeave={hOut}>
            <div style={iconBox}><MailIcon size={22} color={C.sunsetDeep} /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.stone, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Email</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.cream, fontWeight: 600 }}>{CABIN_EMAIL}</div>
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
            <FacebookIcon size={20} /> Viziteaza-ne pe Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "32px 24px", background: C.sunsetDeep,
      borderTop: "1px solid rgba(232,166,48,0.12)", textAlign: "center",
    }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.stone }}>
        2025 Dor de Altadata - Cabana de munte. Toate drepturile rezervate.
      </p>
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
        "*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; } " +
        "html { scroll-behavior: smooth; } " +
        "body { background: #fefaf4; } " +
        "img { display: block; } " +
        ".galleryScroll { -ms-overflow-style: none; scrollbar-width: none; } " +
        ".galleryScroll::-webkit-scrollbar { display: none; } " +
        "::selection { background: rgba(232,166,48,0.3); color: #1c0e08; } " +
        "@keyframes heroFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.04); } }"
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
