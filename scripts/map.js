//Generator of map
(function () {  

  //Generando ID's
  function generatorID() {
    let max_distance = 9;
    let state = 'redCastle'; // Definir el estado inicial
    let ids = [];
    let neutralZone = true
    let id;
    let col = 9;
    let row = 9;
    const MAP_DISTANCE = (col *2 + 1) * (row * 2 + 1);
    
    for (let i = 0; i < MAP_DISTANCE; i++) {

      
      switch (state) {
        case 'redCastle':
          if (col >= 1 && row >= 1) {
            ids.push(`R${col}#${row}`);
            col--;
            if (col === 0 && neutralZone) {
              ids.push(`RG${row}`);
              state = 'greenCastle';
              col = 1;
            }
            
          }
          
        break;
        
        case 'greenCastle':
          if (col <= 9 && row >=  1) {
            ids.push(`G${col}#${row}`);
            col++
            if (col > 9) {
              state = "redCastle"
              col = max_distance
              row--
            }
            // Cambiar condición a OR y ajustar valores
          if (col > 9 || row <= 0) { // Transición cuando se acaben las filas
            state = "lineBlueRed";
            col = 9;
            row = 1; // Fijar fila para BR
          }
        }
          break;
          
          case 'lineBlueRed':
            if (col <= 9 && row === 1) {
              ids.push(`BR${col}`);
              col--  
              if (col === 0) {
                ids.push(`0#0`)
                state = "lineGreenYellow"
                col = 1
                }
              }
              break;
              
              case 'lineGreenYellow':
                if (col >= 1) {
                  ids.push(`GY${col}`);
                  col++
                  if (col > 9) {
                    state = "blueCastle"
                    col = 9
                  }       
                } 
                break;
        
  
        case 'blueCastle':
          if (col >= 1 && row <= 9) {
            ids.push(`B${col}#${row}`);
            col--;
            if (col === 0 && neutralZone) {
              ids.push(`YB${row}`);
              state = 'yellowCastle';
              col = 1;
            }
          }
          break;
        
        case 'yellowCastle':
          if (col <= 9 && row >= 1) {
            ids.push(`Y${col}#${row}`);
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

    // Configuraciones ajustadas a los IDs reales
    const terrainConfig = {
        'montaña': ['R1#9', 'R2#9', 'R3#9', 'R4#9'],
        'bosque': ['G1#9', 'G2#9', 'G3#9', 'G4#9'],
        'hielo': ['B1#9', 'B2#9', 'B3#9', 'B4#9'],
        'desierto': ['Y1#9', 'Y2#9', 'Y3#9', 'Y4#9'],
        'puente': ['RG5', 'YB8'],
        'río': ['BR1', 'BR2'],
        'carretera': ['GY1', 'GY2']
    };

    const recurseConfig = {
        'oro': ['R1#9', 'R2#9', 'R3#9', 'R4#9'],
        'madera': ['G1#9', 'G2#9', 'G3#9', 'G4#9'],
        'cristal': ['B1#9', 'B2#9', 'B3#9', 'B4#9'],
        'petróleo': ['Y1#9', 'Y2#9', 'Y3#9', 'Y4#9'],
        'peaje': ['RG5', 'YB8'],
        'pescado': ['BR1', 'BR2'],
        'gasolina': ['GY1', 'GY2']
    };

    // Función de búsqueda mejorada
    function findInConfig(configObj, id) {
        return Object.keys(configObj).find(key => 
            configObj[key].some(configId => id.startsWith(configId))
        );
    }

    function getConfigurations(id) {
        return {
            terrain: findInConfig(terrainConfig, id) || 'llanura',
            recurse: findInConfig(recurseConfig, id) || 'hierba'
        };
    }

    for (let i = 0; i < 361; i++) {
        const $tile = document.createElement('div');
        $tile.className = 'tile';
        $tile.id = ids[i];

        // Crear elementos primero
        const $terrain = document.createElement('div');
        $terrain.className = "terrain";
        
        const $recurse = document.createElement('div');
        $recurse.className = "recurse";
        
        const nameTile = document.createElement('div');
        nameTile.className = "name-tile";

        // Obtener configuraciones
        const currentId = ids[i];
        const { terrain, recurse } = getConfigurations(currentId);

        // Aplicar configuraciones
        $terrain.classList.add(`terrain-${terrain}`);
        $terrain.textContent = terrain.toUpperCase();
        $recurse.textContent = recurse.toUpperCase();
        nameTile.textContent = currentId;
        nameTile.classList.add(currentId.replace(/#/g, '-')); // Clase segura para CSS

        // Añadir elementos al tile
        $tile.appendChild($terrain);
        $tile.appendChild($recurse);
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


  id = ("Probando");
})();