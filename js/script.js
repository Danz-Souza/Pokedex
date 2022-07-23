const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
const tipo0 = document.querySelector('.tipo0')


const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

const fetchPokemon = async (pokemon) => {

    const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    

    if (pokeResponse.status == 200) {
        const data = await pokeResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando ...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    const objinfos = {
        
        // status
        hp: data['stats']['0']['base_stat'], 
        atk: data['stats']['1']['base_stat'], 
        def: data['stats']['2']['base_stat'], 
        sAtk: data['stats']['3']['base_stat'], 
        sDef: data['stats']['4']['base_stat'], 
        speed: data['stats']['5']['base_stat'], 

        // habilidades
        hab: data['abilities']['0']['ability']['name']
    }

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        tipo0.innerHTML = data['types']['0']['type']['name'];
        document.getElementById('tipoNone').style.visibility = 'visible';

        // status
        document.getElementById('hp').textContent = 'Hp: '+objinfos.hp;
        document.getElementById('atk').textContent = 'Ataque: '+objinfos.atk;
        document.getElementById('def').textContent = 'Defesa: '+objinfos.atk;
        document.getElementById('sAtk').textContent = 'Ataque-Especial: '+objinfos.atk;
        document.getElementById('sDef').textContent = 'Defesa-Esepcial: '+objinfos.atk;
        document.getElementById('speed').textContent = 'Velocidade: '+objinfos.atk;

        // habilidades
        document.getElementById('hab').textContent = objinfos.hab;
        
        input.value = '';
    } else {
        pokemonName.innerHTML = 'não encontrado';
        pokemonNumber.innerHTML = '0';
        pokemonImage.src = '';
        tipo0.innerHTML = 'none';
        document.getElementById('tipoNone').style.visibility = 'hidden'

        input.value = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
})

renderPokemon('1');