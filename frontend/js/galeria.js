const fotos = [
    "./assets/img/LOGO.jpg"
];

let index = 0;
const galeria = document.getElementById("galeria");

function trocarImagem() {
  galeria.style.backgroundImage = `url(${fotos[index]})`;
  index = (index + 1) % imagens.length;
}

trocarImagem();

setInterval(trocarImagem, 2000);