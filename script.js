document.addEventListener('DOMContentLoaded', () => {

  // Clears submission form
  clearText();

  // Grabs some things from the DOM
  const cards = document.querySelectorAll('.my_card');
  const container = document.querySelector('.card-section');
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // Tap behavior for touch devices
  if (isTouchDevice) {
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        cards.forEach(c => {
          if (c !== card) c.classList.remove('tapped');
        });
        card.classList.toggle('tapped');
      });
    });
  }

  // Detect current scroll direction (x or y) and scroll accordingly
  if (container) {
    container.addEventListener('wheel', function(e) {
      const isHorizontalLayout = window.getComputedStyle(container).flexDirection === 'row';

      if (isHorizontalLayout) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          const scrollSpeed = 4.5;
          container.scrollLeft += e.deltaY * scrollSpeed;
        }
      }
      // Otherwise, let vertical scroll happen naturally
    }, { passive: false });
  }

  // Checks on start up if an rtl language is being used
  const rtlLanguages = ['ar', 'fa', 'he', 'ur', 'ps', 'sd', 'ug', 'dv', 'ku', 'yi'];
  if (document.documentElement.getAttribute('dir') !== 'rtl') {
    if (rtlLanguages.includes(document.querySelector('html').lang))
      switchToRTL();
  } else {
    if (!rtlLanguages.includes(document.querySelector('html').lang))
      switchToLTR();
  }

  // Handles dynamic RTL
  const obs = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        console.log("Language change detected");

        if (document.documentElement.getAttribute('dir') !== 'rtl') {
          if (rtlLanguages.includes(document.querySelector('html').lang)) {
            switchToRTL();
          }
        } else {
          if (!rtlLanguages.includes(document.querySelector('html').lang)) {
            switchToLTR();
          }
        }

      }
    }
  }); 
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  // Handles implicit submission using "Enter" for the sign-up box
    document.getElementById("sub-form").addEventListener('submit', function(event) {
      event.preventDefault(); // prevents page reload
      clearText();
      const modalElement = new bootstrap.Modal(document.getElementById('signUpModal'));
      modalElement.show();
    });
  
});

function switchToRTL() {
  document.documentElement.setAttribute('dir', 'rtl');
  const bootstrap_ver = document.getElementById('bootstrap_link');
  document.getElementById('bootstrap_link').setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css');
  document.getElementById('bootstrap_link').setAttribute('integrity', 'sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N');
}

function switchToLTR() {
  document.documentElement.setAttribute('dir', 'ltr');
  document.getElementById('bootstrap_link').setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css');
  document.getElementById('bootstrap_link').setAttribute('integrity', 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr');
}

function clearText() {
  document.getElementById('sign-up-box').value = "";
}
