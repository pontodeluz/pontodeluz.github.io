/**
 * @author josedoce
 * @link https://github.com/josedoce
 */

const cobertura = PIXI.Texture.from('./assets/cobertura.png');
const luz = PIXI.Texture.from('./assets/teste.svg');
const luz10Opacidade = PIXI.Texture.from('./assets/completado_opacidade10.png');
const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view);

const listaPessoas = [];
class Pessoa{
  constructor({id, nome}){
      this.id = id;
      this.nome = nome;
  }
}

    pessoas.forEach((pessoa, i)=>{
    listaPessoas.push(new Pessoa({id: pessoa.bloco, nome: pessoa.nome }))
    });
    const timeout1 = setTimeout(()=>{
        document.getElementById("loading").classList.add("hide")
        clearTimeout(timeout1)
    }, 3000);
    function update() {

        app.stage.removeChildren();
    let wwidth = window.innerWidth;
    let wheight = window.innerHeight;
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

    const container = new PIXI.Container();
    app.stage.addChild(container);
    const textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 26,
        fontStyle: 'Normal',
        fontWeight: 'bold',
        fill: '#ffffff', // gradient
        stroke: '#4a1850',
        strokeThickness: 0,
        /*
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        */
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });
   

    let luzes = [];

  let cX = 0;
  let cY = 0;
  const r = ajustarQuadradosNoRetangulo(wwidth, wheight);

  let w = r.tamanhoQuadradoLargura;
  let h = r.tamanhoQuadradoAltura;
  let linha = 0;
  let coluna = 0;
  let contador = 0
  let textura = luz;

//estrelinhas cheias
if(listaPessoas.length == 1225){
    textura = luz10Opacidade
}


  while(linha < r.numeroLinhas){ //rows
    while(coluna < r.numeroColunas){ //cols
        const bunny = new PIXI.Sprite(cobertura);
        bunny.anchor.set(0);
        bunny.width = w
        bunny.height = h
        bunny.x = cX
        bunny.y = cY
        container.addChild(bunny);
        luzes.push(bunny)
        
        adicionarEstrelinha(contador, textura)
      cX += w
      coluna++
      contador++
    }
    coluna=0
    linha++
    cX=0
    cY+=h
  }


  const richText = new PIXI.Text("pontinho", textStyle);
        richText.anchor.set(0.5)
        richText.x = wwidth/2;
        richText.y = wheight/2;
        richText.anchor.set(0.5)
      
        richText.visible = false


        const txtBG = new PIXI.Sprite(PIXI.Texture.WHITE);
        txtBG.tint =  "#f05338"
        txtBG.width = richText.width + 50;
        txtBG.height = richText.height + 40
        txtBG.x = wwidth/2;
        txtBG.y = wheight/2;
        txtBG.anchor.set(0.5)
        // cage text
        const cage = new PIXI.Container();
        cage.addChild(txtBG,richText);
        // add reference for easy debug
        cage.name = "textSprite";
        cage.textSprite = richText;
        cage.txtBG = txtBG;
        txtBG.visible = false
        app.stage.addChild(cage)


  function adicionarEstrelinha(id, textura) {
    //addiciona estrelinhas ao painel
    const pessoa = listaPessoas.find((pessoa)=> pessoa.id === id)
      if(pessoa !== undefined){
        const pontinho = luzes[id]
        pontinho.texture = textura
        pontinho.eventMode = 'static';
        pontinho.cursor = 'pointer';
        
        let isTouched = false
        pontinho.on('pointertap', () =>
        {
            isTouched = true
            richText.text = "Ponto de luz de "+pessoa.nome + " 🥰️"
            txtBG.width = richText.width + 50;
            txtBG.height = richText.height + 40
            richText.visible = true
            txtBG.visible = true
            
            const timeout2 = setInterval(() => {
                isTouched = false;
                richText.visible = false
                txtBG.visible = false
                clearInterval(timeout2)
            }, 6000);
            
        });

        

        pontinho.on("pointerover", function(){
            richText.text = "Ponto de luz de "+pessoa.nome + " 🥰️"
            txtBG.width = richText.width + 50;
            txtBG.height = richText.height + 40
            richText.visible = true
            txtBG.visible = true
            
        })

        pontinho.on('pointerout', function(){
            if(isTouched == false){
                richText.text = ""
                richText.visible = false
                txtBG.visible = false
            }
                
        })
      }
  }
    }
    update()
    window.addEventListener('resize', update)