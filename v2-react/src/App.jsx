import { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const [lang, setLang] = useState('es');
  const heroRef = useRef(null);
  const carouselRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current && window.innerWidth > 640) {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * -10;
        heroRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll active state logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], header[id]');
      const navLinks = document.querySelectorAll('.nav-dock .nav-item');
      const trigger = window.scrollY + 100;
      let current = 'home';
      sections.forEach(s => {
        if (trigger >= s.offsetTop) current = s.getAttribute('id');
      });
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  const handleRipple = (e) => {
    const target = e.currentTarget;
    const x = e.clientX - target.getBoundingClientRect().left;
    const y = e.clientY - target.getBoundingClientRect().top;
    
    const ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    ripples.classList.add('ripple');
    
    target.appendChild(ripples);
    setTimeout(() => ripples.remove(), 600);
  };

  return (
    <div className="app-container">
      <div className="bg-noise"></div>
      <div className="bg-orb orb-a"></div>
      <div className="bg-orb orb-b"></div>

      <div className="lang-container">
        <div className="lang-pill">
          <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>
            <i className="fa-solid fa-earth-americas"></i> ES
          </button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
            EN <i className="fa-solid fa-earth-europe"></i>
          </button>
        </div>
      </div>

      <nav className="nav-dock" id="navDock">
        <a href="#home" className="nav-item focus-visible active"><i className="fa-solid fa-house"></i></a>
        <a href="#web" className="nav-item focus-visible">WORKS</a>
        <a href="#expo" className="nav-item focus-visible">EXPO</a>
        <a href="#virtual-360" className="nav-item focus-visible">360</a>
        <a href="#contact" className="nav-item highlight focus-visible"><i className="fa-solid fa-paper-plane"></i></a>
      </nav>

      <div className="boxed-wrapper page-transition-wrapper">
        
        {/* HERO SECTION */}
        <header className="hero-section" id="home" data-reveal="true">
          <div className="hero-content">
            <div className="status-tag">● PRODUCT DESIGNER</div>
            <h1 className="hero-title name-title">
              ARMANDO <br className="mobile-break" />
              <span className="gradient-text">TREJO</span>
            </h1>
            <p className="hero-sub">
              {lang === 'es' 
                ? "Traduzco requerimientos de negocio en ecosistemas digitales viables. Experiencia demostrada creando sistemas escalables y dirigiendo implementaciones ágiles." 
                : "Translating business requirements into viable digital ecosystems. Proven experience building scalable systems and directing agile executions."}
            </p>
            
            <div className="hero-bullets">
              <div className="bullet-item"><i className="fa-solid fa-check"></i> {lang === 'es' ? "UI & Responsive Web Design" : "UI & Responsive Web Design"}</div>
              <div className="bullet-item"><i className="fa-solid fa-check"></i> {lang === 'es' ? "Figma (Auto-layout, Components, Prototyping)" : "Figma (Auto-layout, Components, Prototyping)"}</div>
              <div className="bullet-item"><i className="fa-solid fa-check"></i> {lang === 'es' ? "Flujos UX e Implementación Asistida por IA" : "UX Flows & AI-Assisted Implementation"}</div>
            </div>

            <div className="hero-actions">
              <a href="#web" className="btn-wa focus-visible" onMouseDown={handleRipple}>
                {lang === 'es' ? "Ver Proyectos" : "View Projects"} <i className="fa-solid fa-arrow-down"></i>
              </a>
            </div>
          </div>
          <div className="hero-image-frame" ref={heroRef}>
            <img src="/IMAGENES/foto-de-perfil.webp" alt="Armando Trejo" />
          </div>
        </header>

        {/* 00. SOBRE MI */}
        <section className="section about-section" id="about" data-reveal="true">
          <span className="numb">00/</span>
          <h2 className="title">{lang === 'es' ? "SOBRE MÍ" : "ABOUT ME"}</h2>
          
          <div className="about-grid">
            <div className="about-text">
              <p>
                {lang === 'es'
                  ? "Me especializo en crear productos digitales y flujos de trabajo escalables integrando diseño, creatividad e inteligencia artificial. Desde el prototipado de sitios web hasta la creación de herramientas asistidas por IA, mi objetivo es hacer que la producción creativa sea más eficiente y sorprendente. Como líder de equipo, me enfoco en la adopción tecnológica para elevar resultados. Busco nuevos retos donde el diseño y la innovación tecnológica se unan."
                  : "I specialize in building scalable digital products and workflows by integrating design, creativity, and artificial intelligence. From website prototyping to creating AI-assisted tools, my goal is to make creative production more efficient and stunning. As a team leader, I focus on technological adoption to elevate results. I am looking for new challenges where design and technological innovation unite."}
              </p>
            </div>
            <div className="about-skills">
              <div className="skill-card focus-visible"><i className="fa-brands fa-figma"></i> <span>Figma</span></div>
              <div className="skill-card focus-visible"><i className="fa-solid fa-wand-magic-sparkles"></i> <span>{lang === 'es' ? "IA Generativa" : "Generative AI"}</span></div>
              <div className="skill-card focus-visible"><i className="fa-brands fa-wordpress"></i> <span>WordPress + Elementor</span></div>
              <div className="skill-card focus-visible"><i className="fa-solid fa-bezier-curve"></i> <span>Adobe Suite</span></div>
            </div>
          </div>
        </section>

        {/* 01. WEB PRODUCTION CAROUSEL */}
        <section className="section" id="web" data-reveal="true">
          <span className="numb">01/ WEB DESIGN PLATFORMS</span>
          <div className="section-header-flex">
            <h2 className="title">{lang === 'es' ? "Ecosistema de Diseño Web" : "Web Design Ecosystem"}</h2>
            <div className="carousel-controls">
              <button className="control-btn prev" onClick={() => moveCarousel(-1)}><i className="fa-solid fa-chevron-left"></i></button>
              <button className="control-btn next" onClick={() => moveCarousel(1)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          <div className="web-carousel-window" ref={carouselRef}>
            <div className="web-track">
              <a href="https://aldea.work/" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/aldea-min.webp" alt="Aldea" /><span>Aldea Digital</span></a>
              <a href="https://aguileramotors.com/" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/aguilera-min.webp" alt="Aguilera" /><span>Aguilera Motors</span></a>
              <a href="https://riolimpio.com.mx/" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/rio-min.webp" alt="Rio Limpio" /><span>Rio Limpio</span></a>
              <a href="https://grupomaen.mx/" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/maen-min.webp" alt="Grupo Maen" /><span>Grupo Maen</span></a>
              <a href="https://ides.inedito.digital" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/ides-min.webp" alt="IDES" /><span>IDES</span></a>
              <a href="https://1828brasaycarbon.mx" className="p-card-mini focus-visible" target="_blank" rel="noreferrer"><img src="/IMAGENES/1828-min.webp" alt="1828" /><span>1828 Brasa y Carbón</span></a>
            </div>
          </div>
        </section>

        {/* 02. EXPO */}
        <section className="section" id="expo" data-reveal="true">
          <span className="numb">02/ PRODUCT-LIKE EXPERIENCES</span>
          <h2 className="title">{lang === 'es' ? "Activaciones Digitales & Prototipado" : "Digital Activations & Prototyping"}</h2>
          <div className="expo-grid-v3">
            <div className="expo-card-v3">
              <div className="card-header-v3"><div className="icon-box"><i className="fa-solid fa-gamepad"></i></div><div className="status-dot"></div></div>
              <div className="card-body-v3">
                <h3>{lang === 'es' ? "RULETA DE PREMIOS" : "PRIZE WHEEL"}</h3>
                <p>{lang === 'es' ? "Ruleta interactiva personalizable para sorteos." : "Customizable interactive wheel for giveaways."}</p>
                <a href="https://ruleta-expo.inedito.digital/demo" target="_blank" rel="noreferrer" className="btn-demo-v3 focus-visible" onMouseDown={handleRipple}>DEMO <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
            </div>
            <div className="expo-card-v3">
              <div className="card-header-v3"><div className="icon-box"><i className="fa-solid fa-camera"></i></div><div className="status-dot"></div></div>
              <div className="card-body-v3">
                <h3>PHOTO OPPORTUNITY</h3>
                <p>{lang === 'es' ? "Photobooth con marcos personalizados." : "Photobooth with custom frames."}</p>
                <a href="https://photo-oportunity.inedito.digital/demo" target="_blank" rel="noreferrer" className="btn-demo-v3 focus-visible" onMouseDown={handleRipple}>DEMO <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
            </div>
            <div className="expo-card-v3">
              <div className="card-header-v3"><div className="icon-box"><i className="fa-solid fa-table-cells"></i></div><div className="status-dot"></div></div>
              <div className="card-body-v3">
                <h3>TIC TAC TOE</h3>
                <p>{lang === 'es' ? "Gato interactivo con premios e IA." : "Interactive Tic-Tac-Toe with AI."}</p>
                <a href="https://tic-tac-toe.inedito.digital/demo" target="_blank" rel="noreferrer" className="btn-demo-v3 focus-visible" onMouseDown={handleRipple}>DEMO <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
            </div>
          </div>
        </section>

        {/* 03. VIRTUAL 360 */}
        <section className="section" id="virtual-360" data-reveal="true">
          <span className="numb">03/ IMMERSIVE</span>
          <h2 className="title">{lang === 'es' ? "Visitas Virtuales 360" : "Virtual 360 Tours"}</h2>
          <div className="full-width-card">
            <div className="card-overlay"><h3>{lang === 'es' ? "Visor Inmobiliario Inmersivo" : "Real Estate Immersive Viewer"}</h3></div>
            <a href="https://visor360.inedito.digital/recorrido" target="_blank" rel="noreferrer" className="btn-wa btn-visor-floating focus-visible" onMouseDown={handleRipple}>
              <i className="fa-solid fa-vr-cardboard"></i> <span>{lang === 'es' ? "ABRIR" : "OPEN"}</span>
            </a>
            <img src="/IMAGENES/visor-min.webp" alt="360 View" />
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-centered" id="contact" data-reveal="true">
          <div className="cta-content">
            <h2>{lang === 'es' ? "¿LISTO PARA INNOVAR?" : "READY TO INNOVATE?"}</h2>
            <a href="https://wa.me/524495136907" className="btn-wa bigger focus-visible" target="_blank" rel="noreferrer" onMouseDown={handleRipple}>
              <i className="fa-brands fa-whatsapp"></i> <span>WHATSAPP</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
