const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navigation = [...document.querySelectorAll("nav a")];
const sections = navigation
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const updateActiveNavigation = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 140)
    .at(-1);

  navigation.forEach((link) => {
    link.classList.toggle(
      "is-active",
      current && link.getAttribute("href") === `#${current.id}`
    );
  });
};

window.addEventListener("scroll", () => {
  setHeaderState();
  updateActiveNavigation();
}, { passive: true });

setHeaderState();
updateActiveNavigation();

const revealItems = document.querySelectorAll(".reveal-section, .reveal-item");

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const skills = [
  ["AWS", "AWS"],
  ["Azure Devops", "Azure DevOps"],
  ["Azure SQL Database", "Azure SQL Database"],
  ["Azure", "Azure"],
  ["C# (CSharp)", "C#"],
  ["C", "C"],
  ["Docker", "Docker"],
  ["Git", "Git"],
  ["GitHub", "GitHub"],
  ["GitLab", "GitLab"],
  ["Java", "Java"],
  ["JavaScript", "JavaScript"],
  ["Jupyter", "Jupyter"],
  ["Kubernetes", "Kubernetes"],
  ["MongoDB", "MongoDB"],
  ["Node.js", "Node.js"],
  ["Postman", "Postman"],
  ["PyTorch", "PyTorch"],
  ["Python", "Python"],
  ["React", "React"],
  ["Swagger", "Swagger"],
  ["TensorFlow", "TensorFlow"],
];

const skillsTrack = document.querySelector(".skills-carousel__track");

if (skillsTrack) {
  const createSkillCard = ([fileName, skillName], isDuplicate = false) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.setAttribute("role", "listitem");
    if (isDuplicate) card.setAttribute("aria-hidden", "true");
    card.innerHTML = `<img src="skills/${encodeURIComponent(fileName)}.svg" alt="${skillName} logo"><h3>${skillName}</h3>`;
    return card;
  };

  skills.forEach((skill) => skillsTrack.append(createSkillCard(skill)));
  skills.forEach((skill) => skillsTrack.append(createSkillCard(skill, true)));

  const setScrollDistance = () => {
    skillsTrack.style.setProperty(
      "--skills-scroll-distance",
      `${skillsTrack.scrollWidth / 2}px`
    );
  };

  setScrollDistance();
  window.addEventListener("resize", setScrollDistance);
}
