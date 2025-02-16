//Generator of map
(function () {  

  //Generando ID's
  function generatorID() {
    let max_distance = 9;
    let state = 'redCastle'; // Definir el estado inicial
    let ids = [];
    let neutralZone = true;
    let col = 9;
    let row = 9;
    const MAP_DISTANCE = (col *2 + 1) * (row * 2 + 1);
    
    for (let i = 0; i < MAP_DISTANCE; i++) {

      switch (state) {

        case 'redCastle':
          if (col >= 1 && row >= 1) {
            ids.push(`R-${col}${row}`);
            col--;
            if (col === 0 && neutralZone) {
              ids.push(`RG-${row}`);
              state = 'greenCastle';
              col = 1;
            }          
          }          
        break;
        
        case 'greenCastle':
          if (col <= 9 && row >=  1) {
            ids.push(`G-${col}${row}`);
            col++
            if (col > 9) {
              state = "redCastle"
              col = max_distance
              row--
            }
            if (col > 9 || row <= 0) {
              state = "lineBlueRed";
              col = 9;
              row = 1;
            }
          }
        break;
          
        case 'lineBlueRed':
          if (col <= 9 && row === 1) {
            ids.push(`BR-${col}`);
            col--  
            if (col === 0) {
              ids.push(`00`)
              state = "lineGreenYellow"
              col = 1
              }
          }
        break;
              
        case 'lineGreenYellow':
          if (col >= 1) {
            ids.push(`GY-${col}`);
            col++
            if (col > 9) {
            state = "blueCastle"
            col = 9
            }       
          } 
        break;
        
  
        case 'blueCastle':
          if (col >= 1 && row <= 9) {
            ids.push(`B-${col}${row}`);
            col--;
            if (col === 0 && neutralZone) {
              ids.push(`YB-${row}`);
              state = 'yellowCastle';
              col = 1;
            }
          }
        break;
        
        case 'yellowCastle':
          if (col <= 9 && row >= 1) {
            ids.push(`Y-${col}${row}`);
            col++
            if (col > 9) {
              state = "blueCastle"
              col = max_distance
              row++
            }
          }  
        break;
      
      } 
    }
    return ids;  
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $map = document.getElementById('map');
    const ids = generatorID();
  
    const EMOJI_MAP = {
      terrain: {
        field: '🌻',
        forest: '🌲',
        valley: '🏔',
        ruin: '🗿',
        forum: '🏛️',
        fortrees: '🏰',
        campfire: '🔥',
        colliseum: '🏟',
        shop: '⛺️',
        pool: '🕳',
        tavern: '🛖',
        fountain: '⛲',
        tower: '🗼',
        mystwood: '🌳'
    },
      resource: {
        diamond: '💎',
        bat: '🦇',
        meat: '🍖',
        brick: '🧱',
        wood: '🪵',
        goat: '🐐',
        sheer: '🐑',
        brillain: '✨',
        boar: '🐗',
        web: '🕸',
        fish: '🐟',
        deer: '🦌',
        mushroom: '🍄',
        wheat: '🌾',
        butterfly: '🦋',
        chicken: '🐓',
        grape: '🍇',
        apple: '🍏',
        stone: '🪨',
        none: '',
    }
    };

// Configuraciones ajustadas a los IDs reales
    const resourceConfig = {
  apple: ['G-19', 'G-54', 'R-71', 'B-51', 'Y-81', 'Y-23', 'B-34', 'Y-54', 'Y-35', 'Y-56', 'B-29', 'Y-99'],
  bat: ['G-39', 'G-78', 'RG-7', 'G-17', 'R-26', 'R-72', 'R-51', 'G-61', 'GY-4', 'Y-21', 'Y-71', 'Y-91', 'B-72', 'B-44', 'B-25', 'Y-15', 'B-98'],
  boar: ['R-39', 'R-66', 'G-66', 'R-25', 'R-74', 'R-83', 'Y-61', 'Y-72', 'Y-63', 'B-74', 'Y-74', 'B-46', 'B-79', 'B-69', 'Y-59', 'Y-89'],
  brick: ['R-69', 'G-38', 'G-87', 'G-46', 'R-85', 'R-84', 'G-74', 'R-93', 'R-53', 'R-22', 'G-72', 'G-92', 'GY-6', 'B-92', 'Y-92', 'B-63', 'Y-26', 'Y-58'],
  brillain: ['RG-5', 'BR-5', 'GY-5', 'YB-5'],
  butterfly: ['R-79', 'G-89', 'G-28', 'G-88', 'R-67', 'R-86', 'R-16', 'G-85', 'G-13', 'G-53', 'B-91', 'B-31', 'Y-31', 'Y-12', 'Y-86', 'B-27', 'Y-47', 'Y-68', 'Y-78', 'Y-29'],
  chicken: ['R-19', 'G-49', 'G-98', 'R-96', 'G-16', 'R-55', 'G-95', 'R-94', 'G-84', 'R-13', 'RG-3', 'G-93', 'G-22', 'G-52', 'R-91', 'R-61', 'B-11', 'Y-82', 'B-53', 'Y-55', 'B-66', 'Y-16', 'Y-66', 'Y-67', 'B-18', 'Y-48', 'B-99', 'B-19', 'Y-19', 'Y-69', 'Y-79'],
  deer: ['R-28', 'G-57', 'RG-6', 'R-63', 'R-12', 'G-51', 'BR-9', 'GY-2', 'B-41', 'Y-51', 'B-95', 'Y-85', 'B-76', 'Y-96', 'B-28', 'Y-18', 'Y-88'],
  diamond: ['G-97', 'R-46', 'R-44', 'G-41', 'G-81', 'BR-7', 'Y-41', 'B-65', 'B-16', 'Y-76', 'YB-7', 'YB-9'],
  fish: ['G-69', 'R-38', 'G-58', 'R-17', 'R-95', 'R-75', 'G-65', 'R-64', 'G-44', 'BR-6', 'B-82', 'Y-75', 'YB-6', 'B-38'],
  goat: ['R-98', 'R-88', 'R-68', 'R-97', 'G-86', 'R-35', 'RG-4', 'R-92', 'R-82', 'R-21', 'G-71', 'YB-2', 'Y-13', 'Y-53', 'Y-84', 'B-96', 'B-26', 'B-97', 'B-59'],
  grape: ['RG-9', 'G-99', 'R-58', 'G-48', 'R-27', 'R-76', 'R-14', 'G-63', 'R-81', 'G-91', 'GY-7', 'B-81', 'Y-11', 'B-52', 'B-83', 'B-84', 'B-35', 'B-15', 'Y-65', 'Y-36', 'B-67', 'B-17', 'Y-17', 'Y-87', 'B-58', 'B-48', 'Y-28'],
  meat: ['R-59', 'G-29', 'G-68', 'G-36', 'G-34', 'RG-2', 'R-41', 'R-11', 'G-11', 'B-71', 'Y-64', 'Y-94', 'Y-46', 'B-57', 'Y-97', 'B-78', 'Y-39'],
  mushroom: ['R-99', 'G-18', 'R-87', 'G-26', 'G-76', 'R-24', 'Y-22', 'Y-25', 'Y-95', 'B-56', 'B-36', 'B-87', 'B-47', 'B-49'],
  stone: ['R-36', 'R-23', 'G-23', 'B-21', 'B-43', 'YB-3', 'Y-34'],
  sheer: ['R-65', 'R-32', 'G-32', 'BR-4', 'GY-3', 'B-23', 'Y-43', 'Y-44'],
  web: ['R-29', 'G-79', 'R-78', 'G-67', 'R-56', 'G-96', 'G-25', 'G-55', 'R-54', 'R-52', 'G-82', 'B-61', 'B-93', 'B-64', 'B-86', 'Y-27', 'B-88', 'Y-38'],
  wheat: ['R-89', 'G-59', 'R-48', 'R-18', 'R-47', 'G-27', 'G-47', 'G-56', 'G-15', 'G-35', 'R-34', 'G-64', 'G-83', 'G-12', 'G-21', 'G-31', 'BR-3', 'GY-9', 'B-42', 'B-22', 'B-12', 'Y-52', 'Y-83', 'Y-93', 'B-54', 'B-14', 'YB-4', 'Y-14', 'B-85', 'B-68', 'Y-98', 'B-89', 'B-39'],
  wood: ['R-15', 'G-14', 'R-43', 'G-43', 'BR-2', 'B-32', 'Y-32', 'B-55'],
  none: ['R-49', 'RG-8', 'R-77', 'R-57', 'R-37', 'G-37', 'G-77', 'R-45', 'G-45', 'G-75', 'G-24', 'G-94', 'R-73', 'R-33', 'G-33', 'G-73', 'R-62', 'R-42', 'G-42', 'G-62', 'R-31', 'RG-1', 'BR-8', 'BR-1', '00', 'GY-1', 'GY-8', 'YB-1', 'B-62', 'Y-42', 'Y-62', 'B-73', 'B-33', 'B-13', 'Y-33', 'Y-73', 'B-94', 'B-24', 'Y-24', 'B-75', 'B-45', 'Y-45', 'B-77', 'B-37', 'Y-37', 'Y-57', 'Y-77', 'YB-8', 'Y-49']
    }
  
    const terrainConfig = {
  field: ['R-89', 'R-19', 'RG-9', 'G-49', 'G-59', 'G-99', 'R-58', 'R-48', 'R-18', 'G-48', 'G-98', 'R-47', 'R-27', 'G-27', 'G-47', 'R-96', 'R-76', 'G-16', 'G-56', 'R-65', 'R-55', 'G-15', 'G-35', 'G-95', 'R-94', 'R-34', 'R-14', 'G-64', 'G-84', 'R-13', 'RG-3', 'G-63', 'G-83', 'G-93', 'R-32', 'G-12', 'G-22', 'G-32', 'G-52', 'R-91', 'R-81', 'R-61', 'G-21', 'G-31', 'G-91', 'BR-4', 'BR-3', 'GY-3', 'GY-7', 'GY-9', 'B-81', 'B-11', 'Y-11', 'B-52', 'B-42', 'B-22', 'B-12', 'Y-52', 'Y-82', 'B-83', 'B-53', 'B-23', 'Y-43', 'Y-83', 'Y-93', 'B-84', 'B-54', 'B-14', 'YB-4', 'Y-14', 'Y-44', 'B-85', 'B-35', 'B-15', 'Y-55', 'Y-65', 'B-66', 'Y-16', 'Y-36', 'Y-66', 'B-67', 'B-17', 'Y-17', 'Y-67', 'Y-87', 'B-68', 'B-58', 'B-48', 'B-18', 'Y-28', 'Y-48', 'Y-98', 'B-99', 'B-89', 'B-39', 'B-19', 'Y-19', 'Y-69', 'Y-79'],
  forest: ['R-99', 'R-79', 'R-59', 'R-39', 'G-19', 'G-29', 'G-89', 'R-28', 'G-18', 'G-28', 'G-68', 'G-88', 'R-87', 'R-67', 'G-57', 'R-86', 'R-66', 'R-16', 'RG-6', 'G-26', 'G-36', 'G-66', 'G-76', 'R-25', 'R-15', 'G-85', 'R-74', 'R-24', 'G-14', 'G-34', 'G-54', 'R-83', 'R-63', 'R-43', 'G-13', 'G-43', 'G-53', 'R-12', 'RG-2', 'R-71', 'R-41', 'R-11', 'G-11', 'G-51', 'BR-9', 'BR-2', 'GY-2', 'B-91', 'B-71', 'B-51', 'B-41', 'B-31', 'Y-31', 'Y-51', 'Y-61', 'Y-81', 'B-32', 'Y-12', 'Y-22', 'Y-32', 'Y-72', 'Y-23', 'Y-63', 'B-74', 'B-34', 'Y-54', 'Y-64', 'Y-74', 'Y-94', 'B-95', 'B-55', 'Y-25', 'Y-35', 'Y-85', 'Y-95', 'B-76', 'B-56', 'B-46', 'B-36', 'Y-46', 'Y-56', 'Y-86', 'Y-96', 'B-87', 'B-57', 'B-47', 'B-27', 'Y-47', 'Y-97', 'B-78', 'B-28', 'Y-18', 'Y-68', 'Y-78', 'Y-88', 'B-79', 'B-69', 'B-49', 'B-29', 'Y-29', 'Y-39', 'Y-59', 'Y-89', 'Y-99'],
  valley: ['R-69', 'R-29', 'G-39', 'G-69', 'G-79', 'R-98', 'R-88', 'R-78', 'R-68', 'R-38', 'G-38', 'G-58', 'G-78', 'R-97', 'R-17', 'RG-7', 'G-17', 'G-67', 'G-87', 'G-97', 'R-56', 'R-46', 'R-36', 'R-26', 'G-46', 'G-86', 'G-96', 'R-95', 'R-85', 'R-75', 'R-35', 'G-25', 'G-55', 'G-65', 'R-84', 'R-64', 'R-54', 'R-44', 'RG-4', 'G-44', 'G-74', 'R-93', 'R-53', 'R-23', 'G-23', 'R-92', 'R-82', 'R-72', 'R-52', 'R-22', 'G-72', 'G-82', 'G-92', 'R-51', 'R-21', 'G-41', 'G-61', 'G-71', 'G-81', 'BR-7', 'BR-6', 'GY-4', 'GY-6', 'B-61', 'B-21', 'Y-21', 'Y-41', 'Y-71', 'Y-91', 'B-92', 'B-82', 'B-72', 'YB-2', 'Y-92', 'B-93', 'B-63', 'B-43', 'YB-3', 'Y-13', 'Y-53', 'B-64', 'B-44', 'Y-34', 'Y-84', 'B-65', 'B-25', 'Y-15', 'Y-75', 'B-96', 'B-86', 'B-26', 'B-16', 'YB-6', 'Y-26', 'Y-76', 'B-97', 'YB-7', 'Y-27', 'B-98', 'B-88', 'B-38', 'Y-38', 'Y-58', 'B-59', 'YB-9'],
  ruin: ['RG-8', 'G-42', 'R-31', 'BR-8', 'GY-8', 'B-13', 'Y-24', 'YB-8'],
  forum: ['00'],
  fortrees: ['G-24', 'R-42', 'Y-42', 'B-24'],
  campfire: ['R-77', 'R-37', 'G-37', 'G-77', 'R-73', 'R-33', 'G-33', 'G-73', 'B-73', 'B-33', 'Y-33', 'Y-73', 'B-77', 'B-37', 'Y-37', 'Y-77'],
  colliseum: ['YB-1'],
  shop: ['R-57', 'G-75', 'GY-1', 'B-75', 'Y-57'],
  pool: ['RG-1'],
  tavern: ['R-49', 'G-94', 'BR-1', 'B-94', 'Y-49'],
  fountain: ['R-45', 'G-45', 'B-45', 'Y-45'],
  tower: ['R-62', 'G-62', 'B-62', 'Y-62'],
  mystwood: ['RG-5', 'BR-5', 'GY-5', 'YB-5']
    }
    // Función de búsqueda mejorada
    function findInConfig(configObj, id) {
        return Object.keys(configObj).find(key => 
            configObj[key].includes(id)
        ) || '';
    }

    function getConfigurations(id) {
        return {
            terrain: findInConfig(terrainConfig, id),
            resource: findInConfig(resourceConfig, id),
        };
    }

    for (let i = 0; i < 361; i++) {
        const $tile = document.createElement('div');
        $tile.className = 'tile';
        $tile.id = ids[i];
      
      // Nueva función para determinar la clase según el ID
      function getClassByID(id) {
        if (id === '00') return 'neutral-zone';
        const prefix = id.split('-')[0];
        switch(prefix) {
          case 'R': return 'red-castle';
          case 'G': return 'green-castle';
          case 'BR':
          case 'RG':
          case 'GY':
          case 'YB': return 'neutral-zone';
          case 'B': return 'blue-castle';
          case 'Y': return 'yellow-castle';
          default: return '';
        }
      }

// Aplicar la clase al tile
      

        // Crear elementos primero
        const $terrain = document.createElement('div');
        $terrain.className = "terrain";
        
        const $resource = document.createElement('div');
        $resource.className = "resource";
        
        const nameTile = document.createElement('div');
        nameTile.className = "name-tile";

        // Obtener configuraciones
        const currentId = ids[i];
        const { terrain, resource } = getConfigurations(currentId);
        const zoneClass = getClassByID(currentId);
        if(zoneClass) {
         $tile.classList.add(zoneClass);
        }

        // Aplicar configuraciones
        $terrain.classList.add(`terrain-${terrain}`);
        $terrain.textContent = EMOJI_MAP.terrain[terrain];
        $resource.textContent = EMOJI_MAP.resource[resource];
        nameTile.textContent = currentId;
        nameTile.classList.add(currentId);

        // Añadir elementos al tile
        $tile.appendChild($terrain);
        $tile.appendChild($resource);
        $tile.appendChild(nameTile);

        // Resto de elementos
        for (let j = 0; j < 4; j++) {
            const warZone = document.createElement('div');
            warZone.className = 'war-zone';
            $tile.appendChild(warZone);
        }

        const state = document.createElement('div');
        state.className = "state";
        $tile.appendChild(state);

        const otherInfo = document.createElement('div');
        otherInfo.className = "other-info";
        $tile.appendChild(otherInfo);

        $map.appendChild($tile);
    }
});
})();