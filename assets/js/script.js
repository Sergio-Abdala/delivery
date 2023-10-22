const conteudo = {
    carousel: [['./assets/img/lanche01.jpg'], ['./assets/img/lanche02.jpg'], ['./assets/img/lanche03.jpg']],
    menu: [
        {
            titulo: 'especialidades da casa...',
            img: false,
            itens: [
                {
                    titulo: 'xis carne',
                    valor: '15.75',
                    descricao: 'dois hamburguers,alface, queijo, molho especial num pão com gergelin...',
                    ingredientes: ['hamburguer', 'ovo', 'presunto', 'queijo', 'alface', 'tomate', 'milho', 'maionese', 'mostarda', 'ketchup'], 
                    sem: [],
                    img: './assets/img/default/burger17-440x440-1.jpg'
                },
                {
                    titulo: 'xis frango', 
                    valor: 8.20, 
                    descricao: 'mussum ipsun',
                    img: false
                },
                {
                    titulo: 'xis calabresa', 
                    valor: 1.00, 
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
var pedido = [];//new Array();
var comanda = new Array();

function exe(){
    document.getElementById('corpo').innerHTML = '<br/>';
    console.log('itens do menu: '+conteudo.menu.length);
    for (let item = 0; item < conteudo.menu.length; item++) {
                
        if (conteudo.menu[item].titulo) {
            
            document.getElementById('corpo').innerHTML += '<div class="row"> <h2 id="menu'+item+'" class="btn titulo">'+conteudo.menu[item].titulo+'</h2> </div>';
            document.getElementById('corpo').innerHTML += `<div class="row" id="item`+item+`" data-masonry='{"percentPosition": true }'></div>`;
            //
            for (let prod = 0; prod < conteudo.menu[item].itens.length; prod++) {
                conteudo.menu[item].itens[prod].titulo;
                document.getElementById('item'+item).innerHTML += '<div class="col-sm-12 col-lg-6 mb-6"> <div class="card mb-3" style="max-width: 540px;"> <div class="row g-0"> <div class="col-4"> <img src="'+img(conteudo.menu[item].itens[prod].img)+'" class="img-fluid rounded-start" alt="..."> </div> <div class="col-8"> <div class="card-body"> <h5 class="card-title">'+conteudo.menu[item].itens[prod].titulo+'</h5> <p class="card-text">'+conteudo.menu[item].itens[prod].descricao+'</p> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal" onclick="prod('+item+', '+prod+')"> + comprar R$ '+parseFloat(conteudo.menu[item].itens[prod].valor).toFixed(2)+'</button> </div> </div> </div> </div> </div>';
            }
        }
               
    }
}
exe();
//modal para efetivar pedido
function prod(i, p){
    console.log(conteudo.menu[i].itens[p].titulo);
    //modal conteudo
    document.getElementById('modalLabel').innerHTML = '<div class="mb-3 row"><label class="col-sm-2 col-form-label"><i id="titulo">'+ conteudo.menu[i].itens[p].titulo + '</i> R$: <small id="preco">'+ parseFloat(conteudo.menu[i].itens[p].valor).toFixed(2) +'</label> </small> &nbsp;&nbsp;&nbsp;<button class="btn btn-warning col-2" id="btnMenos">-</button> <div class="col-3">  <strong id="quantidade">1</strong><small>unidade</small>  </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success col-2" id="btnMais">+</button><i id="totalParcial"> total parcial: &nbsp'+ parseFloat(conteudo.menu[i].itens[p].valor).toFixed(2) +'</i></div> ';
    //no corpo vai os ingredientes
    document.getElementById('modalBody').innerHTML = '';
    if (conteudo.menu[i].itens[p].ingredientes) {
        conteudo.menu[i].itens[p].ingredientes.forEach(ing => {
            document.getElementById('modalBody').innerHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" value="'+ing+'" id="'+ing+'" checked><label class="form-check-label" for="flexCheckChecked">'+ing+'</label></div>';
            console.warn(document.getElementById(ing));
        });
    }    
    document.getElementById('btnMenos').addEventListener('click', removePedido);
    document.getElementById('btnMais').addEventListener('click', addPedido);
    document.getElementById('cancelar').addEventListener('click', deletePedido);
    document.getElementById('xclose').addEventListener('click', deletePedido);
    document.getElementById('addComanda').addEventListener('click', addComanda);//falta adicionar pedido a comanda???
}

function addPedido() {
    //alert('add pedido');
    let titulo = document.getElementById('titulo').innerHTML;
    let preco = parseFloat(document.getElementById('preco').innerHTML);
    let ingredientes = document.getElementsByTagName('input');
    let sem = '';
    //console.log(ingredientes);
    for (let i = 0; i < ingredientes.length; i++) {
        //const element = ingredientes[i];
        if (!ingredientes[i].checked && i > 0) {
            sem += ingredientes[i].value+';';
        }
    }    
    (sem == '') ? sem = 'completo' : null;

    //console.log();
    pedido.push([titulo,preco,sem]);
    totalParcial();
}
function removePedido() {
    //let preco = parseFloat(document.getElementById('preco').innerHTML);
    let sem = (pedido[pedido.length - 1][2]) ? pedido[pedido.length - 1][2].split(';') : 'completo';
    //sem.splice(sem.length - 1, 1);//ñ funcionou esvaziou array
    console.log(sem);
    let ingredientes = document.getElementsByTagName('input');
    //tratar checkbox resetar
    for (let i = 0; i < ingredientes.length; i++) {
        //const element = ingredientes[i];
        if (!ingredientes[i].checked && i > 0) {
            ingredientes[i].checked = true;
        }
    }
    for (let i = 0; i < sem.length-1; i++) {//copia configurações do pedido anterior
        const id = sem[i];
        document.getElementById(id).checked = false;
    }
    pedido.splice(pedido.length - 1, 1);//remove do array
    //ajusta calculo cabeçalho
    totalParcial();
}
function totalParcial() {
    let preco = parseFloat(document.getElementById('preco').innerHTML);
    document.getElementById('quantidade').innerHTML = pedido.length + 1;
    document.getElementById('totalParcial').innerHTML ='total parcial: &nbsp'+ (parseFloat(pedido.length + 1) * preco).toFixed(2);
}
function deletePedido() {
    //alert('pedido deletado');
    pedido = [];//limpa array
}
function addComanda() {
    addPedido();
    pedido.forEach(lanche => {
        comanda.push(lanche);
    });
    deletePedido();
    //valor total da comanda
    let totalComanda = 0;
    document.getElementById('conteudoComanda').innerHTML = '';//limpando comanda zerando deixando vazia
    document.getElementById('conteudoComanda').innerHTML += '<h5>COMANDA</h5>';
    //agrupar itens iguais da comanda na hora de imprimir???
    comanda.forEach(element => {
        //???
        totalComanda += element[1];        
        //conteudoComanda
        document.getElementById('conteudoComanda').innerHTML += element[0] +' R$: '+ element[1] +' '; 
        document.getElementById('conteudoComanda').innerHTML += (element[2] != 'completo') ? 'sem ': '';
        document.getElementById('conteudoComanda').innerHTML += element[2] +'<br/>';
    });
    document.getElementById('total').innerHTML = totalComanda.toFixed(2);
    
    resumoComanda();
}
function resumoComanda(){
    document.getElementById('conteudoComanda').innerHTML += '<hr><h6>RESUMO COMANDA</h6>';
    //como resumir a comanda???
    let resumo = [];
    let unidades = [0];
    
    comanda.forEach(lanche => {//seleciona quantos itens existem na comanda
        //console.log(lanche);
        let jaTem = false;
        resumo.forEach(res => {
            if (res[0] == lanche[0] && res[1] == lanche[1] && res[2] == lanche[2]) {//(res == lanche){
                jaTem = true;
            }
        });
        (!jaTem) ? resumo.push(lanche) : null;
    });
    let cont=[];
    comanda.forEach(lanche => {//agrupa conta os itens selecionados
        
        for (let i = 0; i < resumo.length; i++) {
            const res = resumo[i];
            if (res[0] == lanche[0] && res[1] == lanche[1] && res[2] == lanche[2]){
                (cont[i]) ? cont[i]++ : cont[i] = 1;
            }
        }
    });
    unidades = cont;//substituir depois
    console.log('resumo da comanda');
    console.log(resumo);
    //imprimir resumo
    for (let i = 0; i < resumo.length; i++) {
        const lanch = resumo[i];
        console.log(lanch);
        document.getElementById('conteudoComanda').innerHTML += '-->>'+ unidades[i] +' unidades '+lanch[0] + ' R$: '+ (lanch[1] *unidades[i]).toFixed(2) +'<br/>';
        document.getElementById('conteudoComanda').innerHTML += (lanch[2] != 'completo') ? 'sem ' : '';
        document.getElementById('conteudoComanda').innerHTML += lanch[2] +'<br/>';
    }
}

function img(ft){
    if(ft){
        return ft;
    }else{
        return './assets/img/conjunto-de-icones-de-lanches-fast-food-bebidas-e-sobremesa-isolado-no-branco_71374-217.webp';
    }
}