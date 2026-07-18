import { DB_LIGHT as SW_LIGHT, DB_DARK as SW_DARK } from './sw/classes.js';
import { BOSSES_LIGHT as SW_BOSSES_LIGHT, BOSSES_DARK as SW_BOSSES_DARK, galacticPool as swPool, buildGalacticPool as buildSwPool } from './sw/characters.js';

import { DB_LIGHT as HP_LIGHT, DB_DARK as HP_DARK } from './hp/classes.js';
import { BOSSES_LIGHT as HP_BOSSES_LIGHT, BOSSES_DARK as HP_BOSSES_DARK, galacticPool as hpPool, buildGalacticPool as buildHpPool } from './hp/characters.js';

export const SagasData = {
    sw: {
        DB_LIGHT: SW_LIGHT,
        DB_DARK: SW_DARK,
        BOSSES_LIGHT: SW_BOSSES_LIGHT,
        BOSSES_DARK: SW_BOSSES_DARK,
        getPool: () => swPool,
        buildPool: buildSwPool,
        title: "DESAFÍO GALÁCTICO",
        draftTitle: "RECLUTAMIENTO TÁCTICO"
    },
    hp: {
        DB_LIGHT: HP_LIGHT,
        DB_DARK: HP_DARK,
        BOSSES_LIGHT: HP_BOSSES_LIGHT,
        BOSSES_DARK: HP_BOSSES_DARK,
        getPool: () => hpPool,
        buildPool: buildHpPool,
        title: "BATALLA MÁGICA",
        draftTitle: "SELECCIÓN DE DUELISTAS"
    }
};
