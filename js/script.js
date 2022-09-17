const nomePokemon = document.querySelector('.nome-pokemon');
const numPokemon = document.querySelector('.numero-pokemon')
const gifPokemon = document.querySelector('.pokemon_image')
let tipopokemon = document.querySelector('.tipo-pokemon')
const form = document.querySelector('.form')
const input_buscar = document.querySelector('.input_buscar')
const botao_ant = document.querySelector('.botao_ant')
const botao_prox = document.querySelector('.botao_prox')

let searchPokemon = 1

const procurarPokemon = async (pokemon) => {
    const APIresposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
    if(APIresposta.status == 200){
        const dados = await APIresposta.json();
        return dados;
    }
    
}
const renderizarPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Searching...'
    numPokemon.innerHTML = ''
    tipopokemon.innerHTML = ''

    const dados = await procurarPokemon(pokemon);

    if(dados){
        gifPokemon.style.display = 'block'
        nomePokemon.innerHTML = dados.name;
        numPokemon.innerHTML = dados.id;
        tipopokemon.innerHTML = 
        dados.types.map(typeInfo => typeInfo.type.name)
        gifPokemon.src = dados['sprites']['front_default']
    
        input_buscar.value = '';
        searchPokemon = dados.id
    }

    else{
        gifPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'Not found :(';
        numPokemon.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizarPokemon(input_buscar.value.toLowerCase());
})


botao_ant.addEventListener('click', (event) => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderizarPokemon(searchPokemon)
    }
   
})

botao_prox.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderizarPokemon(searchPokemon)
})
renderizarPokemon(searchPokemon)