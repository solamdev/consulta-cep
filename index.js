const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')

 async function buscar_cep() {
   const valor_cep = cep.value; 
   console.log(valor_cep)
   await fetch(`https://viacep.com.br/ws/${valor_cep}/json/`)
       .then( Response => Response.json())
       .then( conteudo => update(conteudo))
 }

function limpar_form () {
    rua.value=("")
    bairro.value=("")
    cidade.value=("")
}

function update (conteudo) {
    if (!("erro" in conteudo)) {
        rua.value=(conteudo.logradouro)
        bairro.value=(conteudo.bairro)
        cidade.value=(conteudo.localidade)
    }
    }
    

