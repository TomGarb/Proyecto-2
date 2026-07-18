import { GameState } from '../core/gameState.js';
import { SagasData } from '../data/sagas.js';
import { 
    startBattle1v1, playerTurn1v1, 
    startSquadBattle, squadPlayerTurn, generateEnemySquads
} from '../core/gameModes.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hidratar el Estado desde sessionStorage
    const saga = sessionStorage.getItem('selectedSaga');
    const gameMode = sessionStorage.getItem('gameMode');
    const playerDataRaw = sessionStorage.getItem('playerData');

    if (!saga || !gameMode || !playerDataRaw) {
        window.location.href = 'index.html';
        return;
    }

    const playerData = JSON.parse(playerDataRaw);

    // 2. Aplicar el tema visual de la Saga
    document.body.className = `theme-${saga}`;
    GameState.saga = saga;
    GameState.gameMode = gameMode;
    GameState.sagasData = SagasData;

    // 3. Inicializar el Combate según el Modo
    if (gameMode === 'draft') {
        GameState.playerSquad = playerData;
        document.getElementById('squad-battle-screen').classList.replace('hidden', 'active');
        
        generateEnemySquads();
        startSquadBattle(0);
        
        // Listeners de Combate 5v5
        document.getElementById('btn-squad-attack').addEventListener('click', () => squadPlayerTurn('attack'));
        document.getElementById('btn-squad-special').addEventListener('click', () => squadPlayerTurn('special'));

    } else {
        // Modos 1v1 (Story, Endless, Roguelike, Dark)
        GameState.player = playerData;
        
        // Determinar qué enemigos usar
        if (gameMode === 'dark') {
            GameState.currentBossDB = SagasData[saga].getHeroes();
        } else {
            GameState.currentBossDB = SagasData[saga].getBosses();
        }
        
        GameState.endlessRound = 1;
        document.getElementById('battle-screen').classList.replace('hidden', 'active');
        
        startBattle1v1(0);

        // Listeners de Combate 1v1
        document.getElementById('btn-attack').addEventListener('click', () => playerTurn1v1('attack'));
        document.getElementById('btn-special').addEventListener('click', () => playerTurn1v1('special'));
        document.getElementById('btn-defend').addEventListener('click', () => playerTurn1v1('defend'));
    }

    // 4. Botón de Abandonar Combate (Físico en UI)
    document.getElementById('btn-return-hub').addEventListener('click', () => {
        // Limpiamos los datos de la partida para no reanudarla, pero conservamos la saga
        sessionStorage.removeItem('gameMode');
        sessionStorage.removeItem('playerData');
        window.location.href = 'hub.html';
    });

    // 5. Botón de Volver al Menú al Terminar la Partida (Pantalla de Resultados)
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            sessionStorage.removeItem('gameMode');
            sessionStorage.removeItem('playerData');
            window.location.href = 'hub.html';
        });
    }
});
