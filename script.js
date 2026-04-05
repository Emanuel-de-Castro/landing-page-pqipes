let carouselReady = false;
window.addEventListener('load', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    if (!carousel || !nextBtn || !prevBtn || slides.length === 0) return;
    
    let index = 0;
    let visibleSlides = window.innerWidth >= 768 ? 3 : 1;
    
    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        carousel.style.transform = `translateX(-${index * slideWidth}px)`;
    }
    
    // PREVINE CLIQUE PREMATURO
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!carouselReady) return;
        index = (index < slides.length - visibleSlides) ? index + 1 : 0;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!carouselReady) return;
        index = (index > 0) ? index - 1 : slides.length - visibleSlides;
        updateCarousel();
    });
    
    carouselReady = true;
  document.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG' && e.target.closest('.carousel')) {
    e.preventDefault();
    e.stopPropagation();
    const imgSrc = e.target.src;
    openImageModal(imgSrc);
  }
});

function openImageModal(src) {
  let modal = document.querySelector('.image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <span class="close-modal">&times;</span>
      <img src="${src}" alt="Imagem expandida">
    `;
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.95); z-index: 10000; display: flex;
      align-items: center; justify-content: center; cursor: zoom-out;
    `;
    modal.querySelector('img').style.cssText = `
      max-width: 95%; max-height: 95%; object-fit: contain;
    `;
    modal.querySelector('.close-modal').style.cssText = `
      position: absolute; top: 20px; right: 30px; color: white; font-size: 40px;
      cursor: pointer; z-index: 10001;
    `;
    modal.onclick = function(ev) {
      if (ev.target === modal || ev.target.classList.contains('close-modal')) {
        document.body.removeChild(modal);
      }
    };
    document.body.appendChild(modal);
  } else {
    modal.querySelector('img').src = src;
  }
  modal.style.display = 'flex';
}
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contato');
    const resposta = document.getElementById('resposta');

    // Cria popup dinamicamente
    function showPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-content">
                <h3>✅ Obrigado!</h3>
                <p>Seu contato foi enviado com sucesso.<br>Responderemos em breve!</p>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="background: #25D366; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 16px; cursor: pointer;">
                    Fechar
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);
        
        // Fecha clicando fora
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
    }


    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = form.nome.value.trim();
        const telefone = form.telefone.value.trim();
        const email = form.email.value.trim();
        const aceita = form.querySelector('input[type="checkbox"]').checked;

        if (!nome || !telefone || !email) {
            resposta.innerHTML = '<p style="color: red;">Preencha todos os campos!</p>';
            return;
        }
        if (!aceita) {
            resposta.innerHTML = '<p style="color: red;">Aceite a Política de Privacidade!</p>';
            return;
        }

        resposta.innerHTML = '<p style="color: green;">Enviando...</p>';
        form.reset();
        setTimeout(() => {
            resposta.innerHTML = '';
            showPopup();
        }, 800);
    });
});