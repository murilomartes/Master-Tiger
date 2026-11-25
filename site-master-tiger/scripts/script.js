

//Carrossel de Depoimentos

const carrosselContainer = document.querySelector('.carrossel-container');
        let translateValue = 0;
        let itemWidth = 20;
      
        function moverParaEsquerda() {
          const isMobile = /Mobi|Android/i.test(navigator.userAgent);

          if (isMobile) {
            itemWidth = 82;
          } else{
            itemWidth = 20;
          }
          if (translateValue < 0) {
          translateValue += itemWidth;
          carrosselContainer.style.transform = `translateX(${translateValue}%)`;
         }
        }
      
        function moverParaDireita() {
          const carrosselWidth = carrosselContainer.offsetWidth;
          const containerWidth = carrosselContainer.scrollWidth;
          let itemWidth = 82;
          
          // Verificar se é um dispositivo móvel
          const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        
          if (isMobile) {
            if (containerWidth - translateValue > carrosselWidth) {
                  if (translateValue > -250) {
                translateValue -= itemWidth;
                carrosselContainer.style.transform = `translateX(${translateValue}%)`;
              }
            }
          } else {
            // Código para comportamento no desktop
            let itemWidth = 20;
            if (containerWidth - translateValue > carrosselWidth) {
                  if (translateValue > -80) {
                translateValue -= itemWidth;
                carrosselContainer.style.transform = `translateX(${translateValue}%)`;
              }
            }
          }
        }
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuIcon.addEventListener('click', function() {
  mobileMenuIcon.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});



//Formulário de contato: valida e envia pelo EmailJS

const formContato = document.getElementById('form-contato');

function mostrarErro(campo, mensagem) {
  const erro = campo.nextElementSibling;
  erro.textContent = mensagem;
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
}

function validarFormulario() {
  const nome = document.getElementById('name');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('message');
  let valido = true;

  mostrarErro(nome, '');
  mostrarErro(email, '');
  mostrarErro(mensagem, '');

  if (nome.value.trim().length < 2) {
    mostrarErro(nome, 'Informe seu nome.');
    valido = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    mostrarErro(email, 'Informe um e-mail válido.');
    valido = false;
  }
  if (mensagem.value.trim().length < 5) {
    mostrarErro(mensagem, 'Escreva sua mensagem.');
    valido = false;
  }
  return valido;
}

function sendMail() {
  const status = document.getElementById('suscess');
  const botao = document.getElementById('btn');
  const params = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  const serviceID = 'service_uupp9o9';
  const templateID = 'template_r9vtvp2';

  botao.disabled = true;
  status.textContent = 'Enviando...';

  emailjs.send(serviceID, templateID, params)
    .then(() => {
      formContato.reset();
      status.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
    })
    .catch(() => {
      status.textContent = 'Não foi possível enviar agora. Tente pelo WhatsApp ou Instagram.';
    })
    .finally(() => {
      botao.disabled = false;
    });
}

formContato.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validarFormulario()) {
    sendMail();
  }
});
