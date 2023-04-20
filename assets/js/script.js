const conteudo = {
    carousel: [['./assets/img/lanche01.jpg'], ['./assets/img/lanche02.jpg'], ['./assets/img/lanche03.jpg']],
    menu: [
        {
            titulo: 'especialidades da casa...',
            img: false,
            itens: [
                {
                    titulo: 'xis carne',
                    valor: '15,75',
                    descricao: 'dois hamburguers,alface, queijo, molho especial num pão com gergelin...',
                    ingredientes: ['hamburguer', 'ovo', 'presunto', 'queijo', 'alface', 'tomate', 'milho', 'maionese', 'mostarda', 'ketchup'], 
                    sem: [],
                    img: './assets/img/default/burger17-440x440-1.jpg'
                },
                {
                    titulo: 'xis frango', 
                    valor: '8,20', 
                    descricao: 'mussum ipsun',
                    img: false
                },
                {
                    titulo: 'xis calabresa', 
                    valor: '1,00', 
                    descricao: 'xis com calabresa...',
                    img: false
                }
            ]
        }, 
        {
            titulo: 'bebidas',
            itens: [
                {
                    titulo: 'coca-cola', 
                    valor: 5.75, 
                    descricao: 'refrigereante de cola...',
                    img: false
                },
                {
                    titulo: 'cerveja', 
                    valor: 8.20, 
                    descricao: 'mussum ipsun',
                    img: false
                },
                {
                    titulo: 'água', 
                    valor: 1.00, 
                    descricao: 'água da bica...',
                    img: false
                }
            ]
        },
        {
            titulo: 'titulo',
            itens: [
                {
                    titulo: 'produto', 
                    valor: 69.171, 
                    descricao: 'descrição do produto...',
                    img: false
                },
                {
                    titulo: 'produto', 
                    valor: 69.171, 
                    descricao: 'descrição do produto...',
                    img: false
                },
                {
                    titulo: 'produto', 
                    valor: 69.171, 
                    descricao: 'descrição do produto...',
                    img: false
                }
            ]
        }
    ]
}

function exe(){
    document.getElementById('corpo').innerHTML = '<br/>';
    console.log('itens do menu: '+conteudo.menu.length);
    for (let item = 0; item < conteudo.menu.length; item++) {
                
        if (conteudo.menu[item].titulo) {
            /*
            */
            document.getElementById('corpo').innerHTML += '<div class="row"> <h2 id="menu'+item+'" class="btn titulo">'+conteudo.menu[item].titulo+'</h2> </div>';
            document.getElementById('corpo').innerHTML += `<div class="row" id="item`+item+`" data-masonry='{"percentPosition": true }'></div>`;
            //
            for (let prod = 0; prod < conteudo.menu[item].itens.length; prod++) {
                conteudo.menu[item].itens[prod].titulo;
                document.getElementById('item'+item).innerHTML += '<div class="col-sm-12 col-lg-6 mb-6"> <div class="card mb-3" style="max-width: 540px;"> <div class="row g-0"> <div class="col-4"> <img src="'+img(conteudo.menu[item].itens[prod].img)+'" class="img-fluid rounded-start" alt="..."> </div> <div class="col-8"> <div class="card-body"> <h5 class="card-title">'+conteudo.menu[item].itens[prod].titulo+'</h5> <p class="card-text">'+conteudo.menu[item].itens[prod].descricao+'</p> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal" onclick="prod('+item+', '+prod+')"> + comprar R$ '+conteudo.menu[item].itens[prod].valor+'</button> </div> </div> </div> </div> </div>';
            }
        }
               
    }
}
exe();
//modal para efetivar pedido
function prod(i, p){
    console.log(conteudo.menu[i].itens[p].titulo);
    //modal conteudo
    document.getElementById('modalLabel').innerHTML = conteudo.menu[i].itens[p].titulo;
    //no corpo vai os ingredientes
    document.getElementById('modalBody').innerHTML = '';
    conteudo.menu[i].itens[p].ingredientes.forEach(ing => {
        document.getElementById('modalBody').innerHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" value="'+ing+'" id="'+ing+'" checked><label class="form-check-label" for="flexCheckChecked">'+ing+'</label></div>';
        console.warn(document.getElementById(ing));
    });
    
}

function img(ft){
    if(ft){
        return ft;
    }else{
        return './assets/img/conjunto-de-icones-de-lanches-fast-food-bebidas-e-sobremesa-isolado-no-branco_71374-217.webp';
    }
}