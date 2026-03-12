import { mod_tick_autoclick, mod_click_extra, mod_click_multiply, mod_tick_sun_synergy } from "./basic_mods.js";
import { tps } from "./clicker.js";

export const box_rarities = {
        common: 0,
        semicommon: 1,
        uncommon: 2,
        semirare: 3,
        rare: 4,
        veryrare: 5,
        ultrarare: 6,
        legendary: 7,
        ultralegendary: 8,
        mythical: 9,
};

export const rarity_multipliers = {
        common: 1,
        semicommon: 3,
        uncommon: 9,
        semirare: 25,
        rare: 80,
        veryrare: 250,
        ultrarare: 700,
        legendary: 2000,
        ultralegendary: 6500,
        mythical: 20000,
};

export const modifier_types = {
        click: 0,
        tick: 1
};

export class ItemDef {
        isbox = false;
        constructor(name, desc, rarities, baseprice, modifiers) {
                this.name = name;
                this.desc = desc;
                this.rarities = rarities;
                this.baseprice = baseprice;
                this.modifiers = modifiers;
        }
}

export class BoxDef extends ItemDef {
        isbox = true;
        constructor(name, desc, rarities, baseprice, items) {
                super(name, desc, rarities, baseprice, null);
                this.items = items;
        }
}

export class Modifier {
        constructor(name, source, type, callback) {
                this.modid = Math.round(Math.random() * Math.pow(10, 16));
                this.name = name;
                this.source = source;
                this.type = type;
                this.callback = callback;
        }
}

export class Item {
        constructor(def, rarity) {
                this.itemid = Math.round(Math.random() * Math.pow(10, 16));
                if (!def.rarities.includes(rarity)) {
                        this.invaliditem = true;
                        return;
                }
                this.name = def.name;
                this.desc = def.desc;
                this.rarity = rarity;
                this.isbox = def.isbox;
                if (this.isbox) {
                        this.items = def.items[def.rarities.indexOf(rarity)];
                } else {
                        this.modifiers = def.modifiers[def.rarities.indexOf(rarity)];
                }
                this.price = def.baseprice * Object.values(rarity_multipliers)[rarity];
                this.invaliditem = false;
        }
}

export const items = {
        mercury: new ItemDef(
                "mercury",
                "a very small, bland planet",
                [box_rarities.common],
                2,
                [[]]
        ),
        venus: new ItemDef(
                "venus",
                "a small, hot planet",
                [box_rarities.common, box_rarities.semicommon],
                2,
                [
                        [new Modifier("click every 5s", "venus", modifier_types.tick, (t) => mod_tick_autoclick(t, tps * 5))],
                        [new Modifier("click every 4s", "venus", modifier_types.tick, (t) => mod_tick_autoclick(t, tps * 4))]
                ]
        ),
        earth: new ItemDef(
                "earth",
                "a small planet with life",
                [box_rarities.uncommon, box_rarities.semirare],
                4,
                [
                        [new Modifier("1 extra click", "earth", modifier_types.click, () => mod_click_extra(1))],
                        [
                                new Modifier("1 extra click", "earth", modifier_types.click, () => mod_click_extra(1)),
                                new Modifier("click every 3s", "earth", modifier_types.tick, (t) => mod_tick_autoclick(t, tps * 3))
                        ]
                ]
        ),
        mars: new ItemDef(
                "mars",
                "a small, dry planet",
                [box_rarities.semicommon, box_rarities.uncommon],
                5,
                [[], [], []]
        ),
        randomasteroid: new ItemDef(
                "random asteroid",
                "a tiny asteroid, randomly picked",
                [box_rarities.common],
                1,
                [[]]
        ),
        jupiter: new ItemDef(
                "jupiter",
                "a large planet made of dense gas",
                [box_rarities.uncommon, box_rarities.semirare, box_rarities.rare],
                5,
                [
                        [],
                        [new Modifier("2 extra clicks", "jupiter", modifier_types.click, () => mod_click_extra(3))],
                        [new Modifier("3 extra clicks", "jupiter", modifier_types.click, () => mod_click_extra(3))],
                ]
        ),
        saturn: new ItemDef(
                "saturn",
                "a large gas planet with large rings",
                [box_rarities.semirare, box_rarities.rare, box_rarities.veryrare, box_rarities.ultrarare],
                11,
                [[], [], [], []]
        ),
        uranus: new ItemDef(
                "uranus",
                "a medium-sized gas planet",
                [box_rarities.semirare],
                9,
                [[]]
        ),
        neptune: new ItemDef(
                "neptune",
                "a medium-sized freezing planet",
                [box_rarities.rare, box_rarities.veryrare],
                11,
                [
                        [new Modifier("click every 2s", "neptune", modifier_types.tick, (t) => mod_tick_autoclick(t, tps * 2))],
                        [new Modifier("click every 1.5s", "neptune", modifier_types.tick, (t) => mod_tick_autoclick(t, tps * 1.5))],
                ]
        ),
        ceres: new ItemDef(
                "ceres",
                "a dwarf planet, the first known and largest asteroid",
                [box_rarities.common, box_rarities.semicommon],
                4,
                [[], []]
        ),
        pallas: new ItemDef(
                "pallas",
                "the 3rd-largest asteroid",
                [box_rarities.common, box_rarities.semicommon],
                3,
                [[], []]
        ),
        juno: new ItemDef(
                "juno",
                "a large asteroid",
                [box_rarities.common],
                2,
                [[], []]
        ),
        vesta: new ItemDef(
                "vesta",
                "the 2nd-largest asteroid",
                [box_rarities.common],
                3,
                [[]]
        ),
        astraea: new ItemDef(
                "astraea",
                "an asteroid made of nickel and iron",
                [box_rarities.common],
                2,
                [[]]
        ),
        sun: new ItemDef(
                "the sun",
                "a medium-sized star, with eight orbiting planets",
                [box_rarities.legendary],
                50,
                [
                        [new Modifier("local synergy", "the sun", modifier_types.tick, (t) => mod_tick_sun_synergy(t, tps * 2))]
                ]
        ),
        andromedae: new ItemDef(
                "28 andromedae",
                "a giant bluish-white star in the andromeda constellation",
                [box_rarities.ultrarare, box_rarities.legendary],
                55,
                [[], []]
        ),
        yherculis: new ItemDef(
                "gamma herculis",
                "a giant bluish-white star in the hercules constellation",
                [box_rarities.legendary, box_rarities.ultralegendary],
                58,
                [[], []]
        ),
        oleonis: new ItemDef(
                "omicron leonis",
                "a giant yellowish-white star in the leo constellation",
                [box_rarities.veryrare, box_rarities.ultrarare],
                45,
                [[], []]
        ),
        starofprestonia: new ItemDef(
                "star of prestonia",
                "a great star formed by prestonian",
                [box_rarities.mythical],
                60,
                [[]]
        ),
        vycanismajoris: new ItemDef(
                "vy canis majoris",
                "a red hypergiant, possibly the largest star ever collected",
                [box_rarities.ultralegendary, box_rarities.mythical],
                45,
                [
                        [new Modifier("40 extra clicks", "vy canis majoris", modifier_types.click, () => mod_click_extra(40))],
                        [new Modifier("80 extra clicks", "vy canis majoris", modifier_types.click, () => mod_click_extra(80))],
                ]
        ),
        betelgeuse: new ItemDef(
                "betelgeuse",
                "a red supergiant located in the orion constellation",
                [box_rarities.ultrarare, box_rarities.legendary],
                44,
                [
                        [new Modifier("20 extra clicks", "betelgeuse", modifier_types.click, () => mod_click_extra(20))],
                        [new Modifier("35 extra clicks", "betelqeuse", modifier_types.click, () => mod_click_extra(35))],
                ]
        ),
        sirius: new ItemDef(
                "sirius a",
                "the brightest star a box can contain",
                [box_rarities.legendary, box_rarities.ultralegendary],
                58,
                [[], []]
        ),
        arcturus: new ItemDef(
                "arcturus",
                "a red giant located in the boötes constellation",
                [box_rarities.legendary, box_rarities.ultralegendary],
                58,
                [[], []]
        ),
        alphacena: new ItemDef(
                "alpha centauri a",
                "a collector's favorite exoplanet",
                [box_rarities.uncommon, box_rarities.semirare],
                20,
                [[], []]
        ),
        vulpeculaeb: new ItemDef(
                "v457 vulpeculae b",
                "also known as hd 203030 b, located in the vulpecula constellation",
                [box_rarities.semirare, box_rarities.rare],
                21,
                [[], []]
        ),
        gliese887c: new ItemDef(
                "gliese 887 c",
                "a near exoplanet, orbiting a star too faint to be viewed",
                [box_rarities.uncommon],
                19,
                [[]]
        ),
        helixnebula: new ItemDef(
                "helix nebula",
                "one of the closest planetary nebulae",
                [box_rarities.veryrare, box_rarities.ultrarare],
                26,
                [[], []]
        ),
        twinjetnebula: new ItemDef(
                "twin jet nebula",
                "a planetary nebula consisting of two long lobes",
                [box_rarities.rare, box_rarities.veryrare],
                19,
                [
                        [],
                        [new Modifier("1.01x clicks every click", "twin jet nebula", modifier_types.click, () => mod_click_multiply(1.01))]
                ]
        ),
        butterflynebula: new ItemDef(
                "butterfly nebula",
                "a planetary nebula with an unusually cool central star",
                [box_rarities.veryrare, box_rarities.ultrarare],
                27,
                [[], []]
        ),
        catseyenebula: new ItemDef(
                "cat's eye nebula",
                "a vibrant red, blue, and green nebula",
                [box_rarities.veryrare],
                26,
                [
                        [new Modifier("1.01x clicks every click", "cat's eye nebula", modifier_types.click, () => mod_click_multiply(1.01))]
                ]
        ),
        alphacentauri: new ItemDef(
                "alpha centauri",
                "a star system consisting of three stars",
                [box_rarities.veryrare, box_rarities.ultrarare],
                30,
                [
                        [new Modifier("1.01x clicks every click", "alpha centauri", modifier_types.click, () => mod_click_multiply(1.01))],
                        [new Modifier("1.03x clicks every click", "alpha centauri", modifier_types.click, () => mod_click_multiply(1.03))],
                ]
        )
};

/* 
 * WHEN MAKING BOXES:
 * Only include items with POSSIBLE rarities of one above or below (except for certain circumstances)
 * Not enough items for a box with these requirements? ADD MORE!
 *
 * Example:
 * Common box -> Common or semicommon items
 * Legendary box -> Ultrarare, legendary, or ultralegendary items
 */

export const boxes = {
        debugbox: new BoxDef(
                "debug box",
                "a box containing any item",
                Object.values(box_rarities),
                1000,
                Array(10).fill(Object.values(items)),
        ),
        terrestrialbox: new BoxDef(
                "terrestrial box",
                "a collector's first box, small, close planets",
                [
                        box_rarities.common,
                        box_rarities.semicommon,
                        box_rarities.uncommon,
                ],
                5,
                [
                        [items.mercury, items.venus, items.randomasteroid], // common
                        [items.venus, items.mars], // semicommon
                        [items.earth, items.mars], // uncommon
                ],
        ),
        giantbox: new BoxDef(
                "giant box",
                "a box containing the largest but easiest to collect planets",
                [
                        box_rarities.uncommon,
                        box_rarities.semirare,
                        box_rarities.rare
                ],
                6,
                [
                        [items.jupiter, items.uranus], // uncommon
                        [items.jupiter, items.uranus], // semirare
                        [items.saturn, items.jupiter, items.neptune], // rare
                ],
        ),
        tinybox: new BoxDef(
                "tiny box",
                "a box picked from the asteroid belt",
                [
                        box_rarities.common,
                        box_rarities.semicommon
                ],
                3,
                [
                        [items.ceres, items.pallas, items.vesta, items.juno, items.astraea], // common
                        [items.ceres, items.pallas, items.vesta] // semicommon
                ]
        ),
        boxoflight: new BoxDef(
                "box of light",
                "a box forged in the core of a passionately hot star",
                [
                        box_rarities.ultrarare,
                        box_rarities.legendary,
                        box_rarities.ultralegendary,
                ],
                54,
                [
                        [items.oleonis, items.andromedae], // ultrarare
                        [items.andromedae, items.yherculis, items.sirius], // legendary
                        [items.yherculis, items.starofprestonia, items.sirius], // ultralegendary
                ],
        ),
        oversizedbox: new BoxDef(
                "supersized box",
                "a giant box filled with the largest stars possible",
                [
                        box_rarities.legendary,
                        box_rarities.ultralegendary,
                        box_rarities.mythical
                ],
                57,
                [
                        [items.betelgeuse], // legendary
                        [items.vycanismajoris, items.arcturus], // ultralegendary
                        [items.vycanismajoris, items.arcturus], // mythical
                ]
        ),
        extrasolarbox: new BoxDef(
                "extrasolar box",
                "an average collector's go-to box, with close exoplanets",
                [
                        box_rarities.semirare,
                        box_rarities.rare,
                ],
                17,
                [
                        [items.alphacena, items.vulpeculaeb, items.gliese887c], // semirare
                        [items.vulpeculaeb], // rare
                ]
        ),
        boxofluminescentdust: new BoxDef(
                "box of luminescent dust",
                "a box containing plenty of planetary nebulae",
                [
                        box_rarities.rare,
                        box_rarities.veryrare
                ],
                20,
                [
                        [items.twinjetnebula, items.catseyenebula],
                        [items.helixnebula, items.catseyenebula, items.butterflynebula]
                ]
        ),
        solarbox: new BoxDef(
                "solar box",
                "a box containing a synergistic glowing object",
                [
                        box_rarities.legendary
                ],
                19,
                [
                        [items.sun]
                ]
        )
};

export function rarity_to_string(rarity) {
        return Object.keys(box_rarities)[rarity];
}
