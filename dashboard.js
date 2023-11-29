/**
 * @author josedoce
 * @link https://github.com/josedoce
 */


const listaPessoas = [];
class Pessoa{
  constructor({id, nome}){
    this.id = id;
    this.nome = nome;
  }
}

class Bloquinho {
  constructor({
    id,
    pessoaId,
    imagem
  }){
    this.id = id;
    this.pessoaId = pessoaId;
    this.instanciaImagem = imagem
  }
}

const tooltips = [];
let quantidadeBlocos = 0;

const imagem = new Image();
const imagem2 = new Image();
const imagem3 = new Image();
const imagem4 = new Image();
const imagem5 = new Image();
const opacidadeMaxima = new Image();

// Atribui a URL da imagem ao src da imagem em JavaScript
imagem.src = 'https://www.c-online.med.br/wp-content/uploads/2023/10/CASAWALLPAPER.jpeg'
imagem2.src = './assets/cobertura.png'
imagem3.src = './assets/estrelinha.png'
imagem4.src = './assets/completado.png'
imagem5.src = './assets/completado_opacidade10.png'
const estrelinhaMobile = new Image();
estrelinhaMobile.src = "./assets/estrelinha_mobile.png"

//Garantia de que as imagens vão renderizar no seu tempo
const timeout1 = setTimeout(()=>{
  document.getElementById("tela").classList.remove("hide")
  document.getElementById("loading").classList.add("hide")
  clearTimeout(timeout1)
}, 3000);

function ajustarQuadradosNoRetangulo(larguraRetangulo, alturaRetangulo) {
  //quantidade de blocos na tela (arredondado para cima ficando na casa dos 1225 blocos)
  const numeroQuadrados = 1200;

  // Calcula o número de linhas e colunas
  const raizQuadrada = Math.sqrt(numeroQuadrados);
  const numeroLinhas = Math.ceil(raizQuadrada);
  const numeroColunas = Math.ceil(numeroQuadrados / numeroLinhas);

  // Calcula o tamanho dos quadrados
  const tamanhoQuadradoLargura = larguraRetangulo / numeroColunas;
  const tamanhoQuadradoAltura = alturaRetangulo / numeroLinhas;

  // Retorna os resultados
  return {
      numeroLinhas: numeroLinhas,
      numeroColunas: numeroColunas,
      tamanhoQuadradoLargura: tamanhoQuadradoLargura,
      tamanhoQuadradoAltura: tamanhoQuadradoAltura
  };
}

function eventoExibirNome(bloquinho, layer){
  let width = window.innerWidth;
  let height = window.innerHeight;
  const tooltip = new Konva.Label({
    x: width/2,
    y: height/2,
    opacity: 1,
  });

  tooltip.add(new Konva.Tag({
      fill: '#fff',
      cornerRadius: 5
    })
  );
  let fontsize = 0;
  let padding = 0;
  if (width < 600) {
    fontsize = 18;
    padding = 8;
  } else if (width < 1024) {
    fontsize = 22;
    padding = 14;
  } else {
    fontsize = 26;
    padding = 16;
  }

  const texto = new Konva.Text({
    text: "Bloco ["+bloquinho.attrs.text+"]",
    fontSize: fontsize,
    fontFamily:'Arial',
    fill:'black',
    stroke: 'black',
    padding: padding,
  });

  tooltip.add(texto)
    bloquinho.on('click tap', function() {
        tooltips.forEach((tooltip)=>{
            tooltip.remove()
        });
        layer.add(tooltip)
        tooltip.x((width/2) - (texto.width() / 2))
        tooltips.push(tooltip)
    });
    

    bloquinho.on('mouseover', function() {
        tooltips.forEach((tooltip)=>{
            tooltip.remove()
        });
        layer.add(tooltip)
        tooltip.x((width/2) - (texto.width() / 2))
        tooltips.push(tooltip)
    });
  
    bloquinho.on('mouseout', function() {
      tooltips.forEach((tooltip)=>{
        tooltip.remove()
      })
    });

}

//verifica se tem estrelinha ou se possui completado
function hasLuz(image, stage, callback = ()=>{}) {
  const source = image.attrs.image.currentSrc
  if(source.includes("estrelinha") || source.includes("completado")){
    if(stage != null){
      stage.container().style.cursor = 'pointer';
    }
    callback();
  }
}

//marca como mãozinha caso o mouse esteja sobre a estrelinha.
function eventoPonteira(image, stage){
  image.on('mouseenter', function () {
    if(stage != null){
      stage.container().style.cursor = 'pointer';
    }
  });

  image.on('mouseleave', function () {
    stage.container().style.cursor = 'default';
  });
}

//estrelinhas cheias
function minhaEstrelinha(){
  let estrelinhas = 0;
  for(let i = 0; i < 1224; i++){
    bloquinhos[i].attrs.image=imagem3
    estrelinhas++
  }
  
  if(estrelinhas == bloquinhos.length){
    for(let i = 0; i < bloquinhos.length; i++){
      bloquinhos[i].attrs.image=imagem5
    }
  }
}

const bloquinhos = [];
const blocos = [];
function update() {
  quantidadeBlocos=0
  let width = window.innerWidth;
  let height = window.innerHeight;

  const stage = new Konva.Stage({
    container: 'tela',
    width: width,
    height: height,
  });

  const layer = new Konva.Layer();

  //stage.add(layer);
  let cX = 0;
  let cY = 0;

 
  const r = ajustarQuadradosNoRetangulo(width, height);
  let w = r.tamanhoQuadradoLargura
  let h = r.tamanhoQuadradoAltura;
  let id = 0;
  let linha = 0;
  let coluna = 0;
  while(linha < r.numeroLinhas){
    while(coluna < r.numeroColunas){
      const retangulo = new Konva.Rect({
        fill: 'rgba(0,0,0,0.6)',
        stroke: '#fff',
        strokeWidth: 0.1, 
        x: cX,
        y: cY,
        width: w,
        height: h
      });

      const texto = new Konva.Text({
        text: id,
        fontSize: 13,
        fontFamily:'Arial',
        fill:'white',
        padding: 0,
        x: cX,
        y: cY + 8,
        width: w,
        height: h,
        align: 'center'
      });

      quantidadeBlocos++;
      eventoPonteira(texto, stage)    
      eventoExibirNome(texto, layer)
      cX += w
      id++;
      layer.add(retangulo)
      layer.add(texto)
      coluna++
    }
    coluna=0
    linha++
    cX=0
    cY+=h
  }
  //minhaEstrelinha()

  //estrelinhaAquiEstao()
  stage.add(layer);
}
        
update()
window.addEventListener('resize', update)


