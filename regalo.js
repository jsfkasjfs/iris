/* ================= util: dibuja arte pixel a partir de un patrón de texto ================= */
function buildPixelArt(container, pattern, colorMap, pixelPx){
  const cols = pattern[0].length;
  const rows = pattern.length;
  container.style.gridTemplateColumns = `repeat(${cols}, ${pixelPx}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${pixelPx}px)`;
  container.style.display = 'grid';
  container.innerHTML = '';
  pattern.forEach(row=>{
    [...row].forEach(ch=>{
      const div = document.createElement('div');
      div.style.width = pixelPx+'px';
      div.style.height = pixelPx+'px';
      const color = colorMap[ch];
      if(color){
        div.style.background = Array.isArray(color) ? color[Math.floor(Math.random()*color.length)] : color;
      } else {
        div.style.background = 'transparent';
      }
      container.appendChild(div);
    });
  });
}

/* ================= corazón principal ================= */
const heartPattern = [
"..XX...XX..",
".XXXX.XXXX.",
"XXXXXXXXXXX",
"XXXXXXXXXXX",
"XXXXXXXXXXX",
".XXXXXXXXX.",
".XXXXXXXXX.",
"..XXXXXXX..",
"..XXXXXXX..",
"...XXXXX...",
"....XXX....",
".....X....."
];
buildPixelArt(
  document.getElementById('heart-grid'),
  heartPattern,
  { X: ["#ff8fc6","#ff6fb8","#ffa8d6"] },
  18
);

document.getElementById('overlay').addEventListener('click', function(){
  this.classList.add('expandido');
  document.body.style.overflow='auto';
});

/* ================= mascota kawaii (gatita con capucha morada) ================= */
const mascotaPattern = [
"..H......H..",
".HHH....HHH.",
"HHHHH..HHHHH",
"HHHHHHHHHHHH",
"HFFFFFFFFFFH",
"HFFEFFFFEFFH",
"HFFFFSSFFFFH",
"HFFFFFFFFFFH",
".HFFFFFFFFH.",
"..HFFFFFFH..",
"...HHBHHH...",
"....HHHH...."
];
const mascotaColores = { H:"#6b3fa0", F:"#ffffff", E:"#2a2a2a", S:"#2a2a2a", B:"#ff6fb8" };
buildPixelArt(document.getElementById('mascota-izq'), mascotaPattern, mascotaColores, 8);
buildPixelArt(document.getElementById('mascota-der'), mascotaPattern, mascotaColores, 8);

/* ================= mini bloques estilo minecraft ================= */
const bloqueCorazon = [
".XX.XX.",
"XXXXXXX",
"XXXXXXX",
"XXXXXXX",
".XXXXX.",
"..XXX..",
"...X..."
];
buildPixelArt(document.getElementById('bloque-corazon'), bloqueCorazon, { X: "#ff6fb8" }, 9);

const bloquePasto = [
"GGGGGGGG",
"GGGGGGGG",
"DGDGDGDG",
"DDDDDDDD",
"DDdDDdDD",
"DdDDDDdD",
"DDDdDDDD",
"DDDDDDDD"
];
buildPixelArt(document.getElementById('bloque-pasto'), bloquePasto, { G:"#8fd37a", D:"#a9714a", d:"#8a5636" }, 8);

/* ================= decoraciones flotantes (rosas y corazones) ================= */
const emojis = ["💜","🌸","💗","🌹","💫","🩷"];
const decoCont = document.getElementById('decoraciones');
for(let i=0;i<26;i++){
  const s = document.createElement('div');
  s.className='deco';
  s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  s.style.left = Math.random()*100+'vw';
  s.style.top = Math.random()*100+'vh';
  s.style.animationDuration = (4+Math.random()*5)+'s';
  s.style.animationDelay = (Math.random()*5)+'s';
  s.style.fontSize = (16+Math.random()*18)+'px';
  decoCont.appendChild(s);
}

/* ================= barra de pestañas / filtro =================
   Las fotos ahora viven directamente en el HTML (dentro de <div class="collage">).
   Este script solo se encarga de mostrar/ocultar según la pestaña activa,
   leyendo el atributo data-cat="..." que le pusiste a cada tarjeta .foto en el HTML. */
function aplicarFiltro(filtro){
  document.querySelectorAll('.foto').forEach(foto=>{
    const mostrar = (filtro === 'todas') || (foto.dataset.cat === filtro);
    foto.style.display = mostrar ? '' : 'none';
  });
}

document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('activa'));
    btn.classList.add('activa');
    aplicarFiltro(btn.dataset.filter);
  });
});
