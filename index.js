// Import stylesheets
import './style.css';
let thisScale = null;
let scaleMap = 1;
const DATA = {
  lvl: 1,
  exp: 0,
  needexp: 2,
  mana: 6,
  maxmana: 10,
  money: [1, 4, 10, 5000], //[0] - silver, [1] - gems(самоцветы), [2] - gold, [3] - coin
  cost: 1,
};

// some test map
const testmap = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
];
// пока что для карты будет отдельное место
const MAP = document.getElementById('thereBody');
const zoomMap = document.getElementById('thereMap');
const percentMap = [10, 10, 10, 10];

document.addEventListener('wheel', (wheel) => {
  thisScale = wheel.deltaY * 0.0005;
  console.log(wheel);

  zoomMap.style.transform = `scale(${(scaleMap -= thisScale)})`;
});
document
  .getElementById('dataInfo')
  .addEventListener('click', () => console.log(DATA));

//регенерирует мп в реалтайме
setInterval(() => {
  if (document.getElementById('mana').value < DATA.maxmana) {
    document.getElementById('mana').value += DATA.cost;
    DATA.mana++;
    updateEnergy();
  }
  if (document.getElementById('mana').value >= DATA.maxmana) {
  }
}, 3000);

function updateLvl() {
  if (DATA.exp >= DATA.needexp) {
    DATA.lvl++;
    DATA.maxmana++;
    DATA.needexp *= 2;
    document.getElementById('mana').max = DATA.maxmana;
    if (DATA.mana < DATA.maxmana) {
      DATA.mana = DATA.maxmana;
    }
    if (DATA.mana > DATA.maxmana) {
    }
    updateEnergy();

    document.getElementById('exp').max = DATA.needexp;
    document.getElementById('lvl').innerText = `${DATA.lvl}`;
  }
}

//для обновления значений манапула
function updateEnergy() {
  document.getElementById('mana').value = DATA.mana;
  document.getElementById(
    'manapool'
  ).innerText = `${DATA.mana}/${DATA.maxmana}`;
}
// для обновления экспы
//
function updateExp() {
  updateLvl();
  document.getElementById('exp').value = DATA.exp;
}
function updateResource() {}
// минус энергия (test only)
document.getElementById('minusEnergy').addEventListener('click', () => {
  if (DATA.mana > 0) {
    DATA.mana--;
    updateEnergy();
  }
});
// +1 экспы (test only)
document.getElementById('plusExp').addEventListener('click', () => {
  DATA.exp++;
  updateExp();
});

//setInterval(render(), 1000 / 60);
// function render() {}

createMap(testmap);
// в целом можно вливать параметры внутрь
function createMap(thismap) {
  if (thismap.length >= 1 && thismap[0].length >= 1) {
    for (let y = 0; y < thismap.length; y++) {
      for (let x = 0; x < thismap[y].length; x++) {
        if (thismap[y][x] == 0) {
          let tile = document.createElement('button');
          tile.className = 'greens';
          tile.innerText = ' ';
          tile.addEventListener('click', () => {
            console.log('its a greens tile');
          });
          MAP.appendChild(tile);
        }
        if (thismap[y][x] == 1) {
          let tile = document.createElement('button');
          tile.className = 'place';
          tile.innerText = ' ';
          tile.addEventListener('click', () => {
            console.log('its a place tile');
          });
          MAP.appendChild(tile);
        }
      }
      MAP.append(document.createElement('br'));
    }
  } else console.log('Неверный формат карты!');
}
