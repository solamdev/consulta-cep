const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const resultadoContainer = document.querySelector('.result')
const erroContainer = document.querySelector('.erro')
const historicoBttn = document.querySelector('.historico')
const divHistorico = document.querySelector('.divHistorico')
const btnLIxo = document.querySelector('.btnLixo')
const iconeLixo = document.querySelector('.lixeira')
const iconeHistorico = document.querySelector('.icone-historico')
const listCEP = document.querySelector('.listCEP')
const body = document.body
const fundoEscuro = "img/img_dark_Mode.png"
const fundoClaro =  "https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg?t=st=1746555275~exp=1746558875~hmac=6bf02517091f49e1bbc83f168945b879902b8b9abab59f78d96741d5af22cce6&w=996"


async function buscar_cep(e) {
    e.preventDefault()
    
    const valor_cep = cep.value; 
    console.log(valor_cep)
    if (valor_cep === ""){return;}
    
    try{
        const response = await fetch(`https://viacep.com.br/ws/${valor_cep}/json/`);
        if(response.ok){
            const data = await response.json()
            update(data)
            
            salvarHistorico()
        }
    
    }catch(e){
        erroContainer.classList.remove('hidden')
        console.error(e);
    }
}

function update (conteudo) {
    resultadoContainer.classList.remove('hidden')
    
    if (!("erro" in conteudo)) {
        erroContainer.classList.add('hidden')
        rua.value=(conteudo.logradouro)
        bairro.value=(conteudo.bairro)
        cidade.value=(conteudo.localidade)
        
    } if (!resultadoContainer.classList.contains('hidden')) {
         divHistorico.classList.add('charge')
    } else {
        divHistorico.classList.remove('charge')
    }
  
}

const hideForm = ()=>{
    resultadoContainer.classList.add('hidden')    
    erroContainer.classList.add('hidden')
    divHistorico.classList.remove('charge')
}

 



const imglua = "https://cdn-icons-png.flaticon.com/512/62/62510.png"
const imgsol ="https://icones.pro/wp-content/uploads/2021/04/symbole-du-soleil-jaune.png"
const temaBttn = document.querySelector('#mudarTema')
const icon = document.getElementById('lua')

let key = "tema"

temaBttn.addEventListener("click", ()=>{
    document.body.classList.toggle('dark')
    
    if(icon.src.includes('62510.png')){
        icon.src = imgsol
        localStorage.setItem(key, "dark")
        document.body.style.backgroundImage = `url(${fundoEscuro})`;
    }else{
        icon.src = imglua
        localStorage.setItem(key, "claro")
        document.body.style.backgroundImage = `url(${fundoClaro})`
    }
    
})

let qualTema = localStorage.getItem(key)

if (qualTema === "dark"){
    document.body.classList.add('dark')
    icon.src = imgsol
    document.body.style.backgroundImage = `url(${fundoEscuro})`;
} else {
    document.body.classList.remove('dark')
    icon.src = imglua
    document.body.style.backgroundImage = `url(${fundoClaro})`
}
let historico = [] 
let chave = "historico" 

function salvarHistorico () {
    const valor_cep = cep.value
    if (valor_cep !== "" ){
        var armazenado = JSON.parse(localStorage.getItem(chave))
        if (Array.isArray(armazenado)) {
            historico = armazenado
        } if (!historico.includes(valor_cep)) {
            historico.unshift(valor_cep)
            localStorage.setItem(chave, JSON.stringify(historico))
        }      
        
        } else {
             return;
        }}
    
   function mostrarHistorico (armazenado) {
       
       listCEP.innerHTML = armazenado.map(cep  =>
              `<li> ${cep}</li>`).join("")
   }

historicoBttn.addEventListener('click',  () =>{
    if (!divHistorico.classList.contains('hidden') ){
        divHistorico.classList.toggle('hidden') 
        btnLIxo.classList.remove('hidden')
        iconeHistorico.classList.remove('voltando')
        iconeHistorico.classList.add('girando')
        
    }else {
        btnLIxo.classList.add('hidden')
        iconeHistorico.classList.remove('girando')
        iconeHistorico.classList.add('voltando')
    if (historico.length === 0 || listCEP.innerHTML === "" ){
        btnLIxo.classList.add('hidden')
    }
    var armazenado = JSON.parse(localStorage.getItem(chave))
    mostrarHistorico(armazenado)

}})

    btnLIxo.addEventListener('click', () => {
        localStorage.clear()
        listCEP.innerHTML = ""
        location.reload();


    })




// logica da page2

document.addEventListener('DOMContentLoaded', () => {
    const cep2 = document.getElementById('cep2')
    const rua2 = document.getElementById('rua2')
    const select = document.getElementById('select')
})

async function descobrir_cep(e) {
    e.preventDefault()
    const valor_rua = rua2.value
    const valor_select = select.value
     console.log(valor_rua)
    console.log(valor_select)
    if (valor_select === "RJ") {
        var cidade3 = "Rio%20Janeiro"
    }
    else if (valor_select === "RS") {
        var cidade3 = "Porto%20Alegre"
    }
    else {
        var cidade3 = "Sao%20Paulo"
    }
    console.log(cidade3)
    try {
    const response = await fetch(`https://viacep.com.br/ws/${valor_select}/${cidade3}/${valor_rua}/json/`)
    if (response.ok) {
        const data = await response.json()
        update2(data)}
     
    }catch  (e){
      erroContainer.classList.remove('hidden')
      console.error(e)      
    }}


function update2 (conteudo){
    if(!("erro" in conteudo)){
        cep2.value = (conteudo[0].cep)
        resultadoContainer.classList.remove('hidden')
    }
    erroContainer.classList.add('hidden')
    
}



let historicoRua = [] 
let chaveRua = "historicoRua" 

function salvarHistoricoRua () {
    const valor_rua = rua2.value
    if (valor_rua !== "" ){
        var armazenadoRua = JSON.parse(localStorage.getItem(chaveRua))
        if (Array.isArray(armazenadoRua)) {
            historicoRua = armazenadoRua
        } if (!historicoRua.includes(valor_rua)) {
            historicoRua.unshift(valor_rua)
            localStorage.setItem(chave, JSON.stringify(historicoRua))
        }      
        
        } else {
             return;
        }}
    
   function mostrarHistoricoRua (armazenadoRua) {
       
       listCEP.innerHTML = armazenado.map(rua  =>
              `<li> ${rua}</li>`).join("")
   }

historicoBttn.addEventListener('click',  () =>{
    if (divHistorico.classList.contains('hidden') && btnLIxo.classList.contains('hidden')){
        divHistorico.classList.remove('hidden') 
        btnLIxo.classList.remove('hidden')
        iconeHistorico.classList.remove('voltando')
        iconeHistorico.classList.add('girando')
        
    }else {
        divHistorico.classList.add('hidden')
        btnLIxo.classList.add('hidden')
        iconeHistorico.classList.remove('girando')
        iconeHistorico.classList.add('voltando')
    if (historico.length === 0 || listCEP.innerHTML === "" ){
        btnLIxo.classList.add('hidden')
    }
    var armazenadoRua = JSON.parse(localStorage.getItem(chaveRua))
    mostrarHistorico(armazenadoRua)

}})

    btnLIxo.addEventListener('click', () => {
        localStorage.clear()
        listCEP.innerHTML = ""
        location.reload();


    })


