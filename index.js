

const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const resultadoContainer = document.querySelector('.result')

async function buscar_cep(e) {
    e.preventDefault()
    
    const valor_cep = cep.value; 
    console.log(valor_cep)
    try{
        const response = await fetch(`https://viacep.com.br/ws/${valor_cep}/json/`);
        if(response.ok){
            const data = await response.json()
            update(data)
        }
    }catch(e){
        console.error(e);
    }
}

function update (conteudo) {
    resultadoContainer.classList.remove('hidden')
    
    if (!("erro" in conteudo)) {
        rua.value=(conteudo.logradouro)
        bairro.value=(conteudo.bairro)
        cidade.value=(conteudo.localidade)
    }
}

const hideForm = ()=>{
    resultadoContainer.classList.add('hidden')    
}

const imglua = "https://cdn-icons-png.flaticon.com/512/62/62510.png"
const imgsol ="https://icones.pro/wp-content/uploads/2021/04/symbole-du-soleil-jaune.png"
const temaBttn = document.querySelector('#mudarTema')
const icon = document.getElementById('lua')


temaBttn.addEventListener("click", ()=>{
    document.body.classList.toggle('dark')
    
    if(icon.src.includes('62510.png')){
        icon.src = imgsol
    }else{
        icon.src = imglua
    }
})


// logica da page2

const cep2 = document.getElementById('cep2')
const rua2 = document.getElementById('rua2')
const select = document.getElementById('select')

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
      console.error(e)      
    }}


function update2 (conteudo){
    resultadoContainer.classList.remove('hidden')
    cep2.value = (conteudo[0].cep)
}



