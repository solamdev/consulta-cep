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

const temaBttn = document.querySelector('#mudarTema')

temaBttn.addEventListener("click", ()=>{
    document.body.classList.toggle('dark')
    
    if(temaBttn.textContent == 'light'){
        temaBttn.textContent = 'dark'
    }else{
        temaBttn.textContent = 'light'
    }
})