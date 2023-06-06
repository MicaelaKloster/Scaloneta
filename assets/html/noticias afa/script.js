async function cargarNoticias() {
    const apiKey = '9b5d052bf49c4b33aa56cad9db03a8c1';
    const query = 'argentina mundial qatar 2022';
  
    try {
      const storedNews = localStorage.getItem('noticias');
      if (storedNews) {
        const news = JSON.parse(storedNews);
        mostrarNoticias(news);
      } else {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
        const data = await response.json();
        const articles = data.articles;
        localStorage.setItem('noticias', JSON.stringify(articles));
        mostrarNoticias(articles);
      }
    } catch (error) {
      console.log('Error al obtener noticias:', error);
    }
  }
  
  function mostrarNoticias(articles) {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselIndicators = document.querySelector('.carousel-indicators');
  
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const activeClass = (i === 0) ? 'active' : '';
  
      const slide = document.createElement('div');
      slide.classList.add('carousel-item');
      if (activeClass) {
        slide.classList.add(activeClass);
      }
  
      const slideContent = document.createElement('div');
      slideContent.classList.add('carousel-caption');
      slide.appendChild(slideContent);
  
      if (article.urlToImage) {
        const image = document.createElement('img');
        image.classList.add('d-block');
        image.classList.add('w-100');
        image.src = article.urlToImage;
        slide.appendChild(image);
      }
  
      const link = document.createElement('a');
      link.href = article.url;
      link.target = '_blank'; // Abre el enlace en una nueva pestaña
      
      const title = document.createElement('h5');
      title.classList.add('mb-0');
      title.textContent = article.title;
      
      link.appendChild(title);
      slideContent.appendChild(link);
  
      const description = document.createElement('p');
      description.textContent = article.description;
      slideContent.appendChild(description);
  
      carouselInner.appendChild(slide);
  
      const indicator = document.createElement('li');
      indicator.setAttribute('data-bs-target', '#news-carousel');
      indicator.setAttribute('data-bs-slide-to', i);
      if (activeClass) {
        indicator.classList.add(activeClass);
      }
      carouselIndicators.appendChild(indicator);
    }
  
    const carousel = new bootstrap.Carousel(document.getElementById('news-carousel'));
    window.carousel = carousel;
  }
  
  function changeSlide(direction, event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      return; // Evita el cambio de diapositiva si se hace clic en el enlace del título
    }
  
    const carousel = window.carousel;
    if (carousel) {
      if (direction === 'prev') {
        carousel.prev();
      } else if (direction === 'next') {
        carousel.next();
      }
    }
  }
  

// Obtener la barra de navegación
const navbar = document.querySelector('.navbar');

// Obtener la altura de la barra de navegación
const navbarHeight = navbar.offsetHeight;

// Función para cambiar el color de la barra de navegación
function changeNavbarColor() {
  if (window.pageYOffset > navbarHeight) {
    navbar.style.backgroundColor = 'var(--body-color)';
  } else {
    navbar.style.backgroundColor = 'hsla(199, 47%, 57%, 0.527)';
  }
}

// Agregar el event listener al evento scroll
window.addEventListener('scroll', changeNavbarColor);
