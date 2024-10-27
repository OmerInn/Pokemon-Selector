// import statements
import { getPokemonTypeColor } from './typeColorUtils.js';

const card = document.getElementById("card");

// Kartın içeriğini oluşturma fonksiyonu
export const createPokemonCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  const themeColor = getPokemonTypeColor(data.types[0].type.name);
  
  // Kart içeriğini güncelle
  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src=${imgSrc} alt="${pokeName}" />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
      <div>
        <h3>${statAttack}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${statDefense}</h3>
        <p>Defense</p>
      </div>
      <div>
        <h3>${statSpeed}</h3>
        <p>Speed</p>
      </div>
    </div>
  `;
  
  appendTypes(data.types);
  applyTypeStyles(themeColor);

  card.style.display = 'block'; // Kartı görünür yap
};

// Türleri ekle
const appendTypes = (types) => {
  const typesDiv = document.querySelector(".types");
  typesDiv.innerHTML = ''; // Önceki türleri temizle
  types.forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item.type.name;
    typesDiv.appendChild(span);
  });
};

// Kart stilini ayarla
export const applyTypeStyles = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeSpan) => {
    typeSpan.style.backgroundColor = color;
  });
};

// Verileri almak için ayrı fonksiyon
export const fetchPokemonData = (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      createPokemonCard(data); // Veriyi aldıktan sonra kartı oluştur
    })
    .catch((error) => console.error("Error fetching Pokémon data:", error));
};

// Event listenerlar
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Kartı açarken arka plan tıklamasını engelle
    const pokemonName = button.dataset.poke;
    fetchPokemonData(pokemonName); // Burada pokemon adını gönderiyoruz
  });
});

// Kartın dışına tıklanırsa kartı kapat
document.addEventListener('click', () => {
  card.innerHTML = ''; // Kart içeriğini temizle
  card.style.display = 'none'; // Kartı gizle
});

// Kartın içindeki resme tıklanırsa kartı kapat
card.addEventListener('click', (event) => {
  event.stopPropagation(); // Kart içinde tıklamayı engelle
});
