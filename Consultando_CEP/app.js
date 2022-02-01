var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event){

    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ','')
    zipCode = zipCode.replace('.','')
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipCode +'/json/')
    .then(function(response){

        if(response.data.erro){
           throw new Error('CEP inválido')
        }

        content.innerHTML =''
        creatline(response.data.logradouro)
        creatline(response.data.localidade + '/' + response.data.uf)
        creatline(response.data.bairro)
        
    })
    .catch(function(error){
        content.innerHTML = ''
        creatline('ops, algo deu errado!')
    })
}

function creatline(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}