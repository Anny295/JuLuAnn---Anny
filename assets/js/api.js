const form = document.querySelector('form');
const numeroDeSessoes = document.querySelector('#numeroSessoes');
const suasSessoes = document.querySelector('#suasSessoes');
const imageModelo = document.querySelector('#imageModelo');
const recente = document.querySelector('.recente')
  var objeto =  [{}];
  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
// sessoes = []
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  getData(numeroDeSessoes.value);
});

async function getData(numeroDeSessoes) {
  let responta = await fetch(`https://api.artic.edu/api/v1/exhibitions?fields=id,title,image_id,alt_image_ids&page=1&limit=${numeroDeSessoes}`);
  let pacote = await responta.json();
  let dados = await pacote.data;
  // console.log(dados);
  console.log('New section')

  for(i=0;i<numeroDeSessoes;i++){
    objeto[i] = dados[i];
    suasSessoes.innerHTML +=  `Título: \t ${dados[i].title} \n ID PARA IMAGEM: \t ${dados[i].image_id} \n\n`;
    // imageModelo.src = `https://www.artic.edu/iiif/2/${dados[i].image_id}/full/843,/0/default.jpg`
    console.log('Este aqui é um novo objeto:\n',dados[i]);
    if(sessoes !=0){
      if(sessoes.length < numeroDeSessoes){
        sessoes.push({title: objeto[i].title, id: objeto[i].id}) 
      }
    }
    else{
      sessoes.push({title: objeto[i].title, id: objeto[i].id})
    }
  }
  localStorage.setItem('sessoes', JSON.stringify(sessoes))
      console.log(sessoes)
}

 
