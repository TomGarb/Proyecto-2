import { SagasData } from '../data/sagas.js';

export const GameState = {
    // Generales
    saga: "sw",
    gameMode: "",
    currentDB: null,
    currentBossDB: null,
    sagasData: SagasData,
    autoPlay5v5: false,

    // Estado 1v1
    player: { name: "", className: "", hp: 0, maxHp: 0, attack: 0, critThreshold: 16, specialName: "", specialDmg: 0, specialEffect: "none", specialCooldownMax: 0, passives: [], state: { burn: 0, stun: false, cooldown: 0 } },
    currentBoss: null,
    currentBossIndex: 0,
    endlessRound: 1,
    isPlayerTurn: true,
    // Estado 5v5 Draft
    playerSquad: [],
    enemySquads: [],
    currentSquadIndex: 0,
    activeAttacker: null,
    activeTarget: null,
    draftRound: 1
};
