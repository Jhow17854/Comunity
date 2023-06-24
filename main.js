/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true,
      centeredSlides: false
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function smoothScrollToTop() {
  const currentPosition = window.pageYOffset
  const targetPosition = 0
  const distance = targetPosition - currentPosition
  const duration = 500 // Tempo em milissegundos
  const increments = 20 // Intervalo de tempo entre cada incremento

  let currentTime = 0

  const animateScroll = function () {
    currentTime += increments
    const easing = Math.easeInOutQuad(
      currentTime,
      currentPosition,
      distance,
      duration
    )
    window.scrollTo(0, easing)
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    }
  }

  animateScroll()
}

// Adicionar evento de clique ao botão "back to top"
backToTopButton.addEventListener('click', smoothScrollToTop)

// Função para suavizar o movimento de scroll
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

// Adicionar evento de scroll para mostrar/ocultar o botão "back to top"
window.addEventListener('scroll', backToTop)

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('nav ul li a')

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + window.innerHeight / 2

  sections.forEach(section => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')
    const navLink = document.querySelector(`nav ul li a[href*=${sectionId}]`)

    const isSectionInView =
      checkpoint >= sectionTop && checkpoint <= sectionTop + sectionHeight

    navLink.classList.toggle('active', isSectionInView)
  })
}

function scrollToSection(event) {
  event.preventDefault()

  const targetId = event.currentTarget.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const targetOffset = targetSection.offsetTop
    const scrollOptions = {
      top: targetOffset,
      behavior: 'smooth'
    }

    window.scrollTo(scrollOptions)
  }
}

navLinks.forEach(navLink => {
  navLink.addEventListener('click', scrollToSection)
})

window.addEventListener('scroll', activateMenuAtCurrentSection)

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
