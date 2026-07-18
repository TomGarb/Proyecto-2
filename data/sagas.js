import { DB_LIGHT as SW_LIGHT, DB_DARK as SW_DARK } from './sw/classes.js';
import { BOSSES_LIGHT as SW_BOSSES_LIGHT, BOSSES_DARK as SW_BOSSES_DARK, galacticPool as swPool, buildGalacticPool as buildSwPool } from './sw/characters.js';

import { DB_LIGHT as HP_LIGHT, DB_DARK as HP_DARK } from './hp/classes.js';
import { BOSSES_LIGHT as HP_BOSSES_LIGHT, BOSSES_DARK as HP_BOSSES_DARK, galacticPool as hpPool, buildGalacticPool as buildHpPool } from './hp/characters.js';

import { DB_LIGHT as LOTR_LIGHT, DB_DARK as LOTR_DARK } from './lotr/classes.js';
import { BOSSES_LIGHT as LOTR_BOSSES_LIGHT, BOSSES_DARK as LOTR_BOSSES_DARK, galacticPool as lotrPool, buildGalacticPool as buildLotrPool } from './lotr/characters.js';

import { DB_LIGHT as MARVEL_LIGHT, DB_DARK as MARVEL_DARK } from './marvel/classes.js';
import { BOSSES_LIGHT as MARVEL_BOSSES_LIGHT, BOSSES_DARK as MARVEL_BOSSES_DARK, galacticPool as marvelPool, buildGalacticPool as buildMarvelPool } from './marvel/characters.js';

import { DB_LIGHT as NARUTO_LIGHT, DB_DARK as NARUTO_DARK } from './naruto/classes.js';
import { BOSSES_LIGHT as NARUTO_BOSSES_LIGHT, BOSSES_DARK as NARUTO_BOSSES_DARK, galacticPool as narutoPool, buildGalacticPool as buildNarutoPool } from './naruto/characters.js';

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
    },
    lotr: {
        DB_LIGHT: LOTR_LIGHT,
        DB_DARK: LOTR_DARK,
        BOSSES_LIGHT: LOTR_BOSSES_LIGHT,
        BOSSES_DARK: LOTR_BOSSES_DARK,
        getPool: () => lotrPool,
        buildPool: buildLotrPool,
        title: "LA TIERRA MEDIA",
        draftTitle: "LA COMUNIDAD DEL ANILLO"
    },
    marvel: {
        DB_LIGHT: MARVEL_LIGHT,
        DB_DARK: MARVEL_DARK,
        BOSSES_LIGHT: MARVEL_BOSSES_LIGHT,
        BOSSES_DARK: MARVEL_BOSSES_DARK,
        getPool: () => marvelPool,
        buildPool: buildMarvelPool,
        title: "UNIVERSO MARVEL",
        draftTitle: "INICIATIVA VENGADORES"
    },
    naruto: {
        DB_LIGHT: NARUTO_LIGHT,
        DB_DARK: NARUTO_DARK,
        BOSSES_LIGHT: NARUTO_BOSSES_LIGHT,
        BOSSES_DARK: NARUTO_BOSSES_DARK,
        getPool: () => narutoPool,
        buildPool: buildNarutoPool,
        title: "MUNDO SHINOBI",
        draftTitle: "EXÁMENES CHŪNIN"
    }
};
