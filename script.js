const track = document.getElementById("slideTrack");
let position = 0;
let speed = 0.8; // adjust this for faster/slower scroll
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");

function showsidebar() {
  sidebar.classList.add("active");
  document.body.classList.add("sidebar-open");
}

function hidesidebar() {
  sidebar.classList.remove("active");
  document.body.classList.remove("sidebar-open");
}




function animateMarquee() {
  position -= speed;
  track.style.transform = `translateX(${position}px)`;

  // Reset for seamless loop
  if (-position >= track.scrollWidth / 2) {
    position = 0;
  }

  requestAnimationFrame(animateMarquee);
}

animateMarquee();

const header = document.querySelector(".header");
let lastScroll = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  lastScroll = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (lastScroll > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      ticking = false;
    });

    ticking = true;
  }
});

// about star text animation
 const aboutSection = document.querySelector(".about-star");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("visible");
      }
    },
    { threshold: 1 }
  );

  observer.observe(aboutSection);

//   Solar SYstem loop animation
function initInfiniteSlider() {
  const slider = document.getElementById("slider");
  const track = document.getElementById("track");

  if (!slider || !track) return; // safety check

  // Clone cards for seamless looping
  const cards = Array.from(track.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let position = 0;
  let speed = 0.4;   // adjust speed here
  let paused = false;

  function animate() {
    if (!paused) {
      position -= speed;

      // Reset when half the track is scrolled
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Pause on hover
  slider.addEventListener("mouseenter", () => paused = true);
  slider.addEventListener("mouseleave", () => paused = false);
}
initInfiniteSlider();


// why space text animation
function initWhySpace() {
  const spacesection = document.querySelector(".why-space");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        spacesection.classList.add("visible");
      }
    },
    { threshold: 1 }
  );

  observer.observe(spacesection);
}
initWhySpace();

   //TOUCH SWIPE – SOLAR SYSTEM

(function enableSolarSwipe() {
  const slider = document.getElementById("slider");
  const track = document.getElementById("track");
  if (!slider || !track) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let position = 0;
  let isDragging = false;

  slider.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = true;
  }, { passive: true });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    currentX = touch.clientX;
    const currentY = touch.clientY;

    const diffX = currentX - startX;
    const diffY = Math.abs(currentY - startY);

    /* Only swipe if horizontal intent */
    if (Math.abs(diffX) > diffY) {
      e.preventDefault(); // stop vertical scroll
      track.style.transform = `translateX(${position + diffX}px)`;
    }
  }, { passive: false });

  slider.addEventListener("touchend", () => {
    position += currentX - startX;
    isDragging = false;
  });
})();

/* MOBILE: TAP OUTSIDE TO CLOSE */
overlay.addEventListener("touchstart", hidesidebar);

/* ALSO SUPPORT CLICK (desktop testing) */
overlay.addEventListener("click", hidesidebar);
