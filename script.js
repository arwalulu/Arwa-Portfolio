// ---------- Data ----------
const skills = [
  { name: 'Deep Learning (TensorFlow, PyTorch)', level: 60, icon: '🧠' },
  { name: 'Arduino Development (Programming, Sensor Integration)', level: 80, icon: '🤖' },
  { name: 'Machine Learning & Natural Language Processing', level: 60, icon: '🗣️' },
  { name: 'Data Analysis and Visualization (Pandas, Matplotlib, Seaborn)', level: 80, icon: '📈' },
  { name: 'Computer Vision (OpenCV, CNNs)', level: 80, icon: '👁️' },
  { name: 'Generative AI (LLMs, Prompt Engineering, RAG)', level: 60, icon: '✨' }
];

const projects = [
  {
    title: 'Palm Leaf Disease Detection System 🌴',
    description: 'Trained an EfficientNetB0 + CBAM attention model to classify palm leaf diseases. Developed an interactive web based system for real time image analysis and AI recommendations. ',
    image: 'assets/system_flow_3.png',
    github: 'https://github.com/arwalulu/palmvision.sa'
  },
  {
    title: 'Smart Mosque Occupancy System — Arduino & Sensors',
    description: 'Won at the Effat ECE Project Fair for designing a real-time occupancy monitoring system using entry and exit sensors, with simulated predictive analytics for peak prayer times and UI UX prototypes.',
    image: 'assets/SM.png',
    github: 'https://github.com/arwalulu/Smart-Mosque-Occupancy-Monitoring-System-'
  },
  {
    title: 'Intrusion Detection System — Machine Learning',
    description: 'Trained multiple ML models using the CIC IoT dataset for threat detection.',
    image: 'assets/id.jpg',
    github: 'https://hmalsayed863.github.io/ML-Project-Web/'
  },
  {
    title: 'Remote-Control Robot Car — IoT & Web Integration',
    description: 'Assembled and programmed Arduino-based robotic car hardware ,Developed a custom web interface for wireless control.',
    image: 'assets/car.jpg',
    github: ' '
  },
];

// ---------- Render Skills ----------
const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skills.map(s => `
  <div class="skill" data-skill="${s.name}">
    <div class="skill-top">
      <div class="skill-name">
        <span class="skill-emoji">${s.icon}</span>
        <span>${s.name}</span>
      </div>
      <div class="skill-level">${s.level}%</div>
    </div>
    <div class="bar">
      <div class="fill" style="width:0%" data-level="${s.level}"></div>
    </div>
  </div>
`).join('');

// ---------- Render Projects ----------
const projectsGrid = document.getElementById('projectsGrid');
projectsGrid.innerHTML = projects.map(p => `
  <div class="card card-hover project">
    <div class="thumb">
      <img src="${p.image}" alt="${p.title}">
      <div class="overlay"></div>
    </div>
    <div class="content">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <a class="btn-mini" href="${p.github}" target="_blank" rel="noopener">
        <i class="fa-brands fa-github"></i>
        View on GitHub
      </a>
    </div>
  </div>
`).join('');

// ---------- Smooth nav scroll + active section highlight ----------
const navButtons = document.querySelectorAll('.nav-btn');

function scrollToSection(sectionId){
  const el = document.getElementById(sectionId);
  if(!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => scrollToSection(btn.dataset.target));
});

// update active nav on scroll
const sections = ['about', 'education', 'skills', 'projects', 'contact'];

function setActive(sectionId){
  navButtons.forEach(b => b.classList.toggle('is-active', b.dataset.target === sectionId));
}

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  for (const id of sections) {
    const el = document.getElementById(id);
    if(!el) continue;
    const top = el.offsetTop;
    const height = el.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      setActive(id);
      break;
    }
  }
});

// ---------- Skills animation using IntersectionObserver ----------
const skillsSection = document.getElementById('skills');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const fills = entry.target.querySelectorAll('.fill');
    fills.forEach((fill, i) => {
      setTimeout(() => {
        fill.style.width = fill.dataset.level + '%';
      }, i * 120);
    });

    observer.unobserve(entry.target);
  });
}, { threshold: 0.3 });

observer.observe(skillsSection);

// ---------- Contact form demo ----------
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const msgEl = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = msgEl.value.trim();

  if (name && email && message) {
    alert('Message sent! (Demo only — connect to your backend)');
    nameEl.value = '';
    emailEl.value = '';
    msgEl.value = '';
  } else {
    alert('Please fill in all fields');
  }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
