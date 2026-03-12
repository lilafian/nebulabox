import { drop_box, get_inv_item } from "./inventory.js";
import { generate_box } from "./boxutils.js";
import { display_cursor_notification } from "./notification.js";
import { rarity_to_string, modifier_types, box_rarities, BoxDef, ItemDef, Item } from "./items.js";
import { save_game } from "./save.js";

const clicksele = document.querySelector("#clicks");
const clicksleftele = document.querySelector("#clicksleft");
const levelele = document.querySelector("#level");
const modifiersele = document.querySelector("#modifiers");

const clickerele = document.querySelector("#clicker");

export const tps = 20;
const nm_debug = false;

let total_clicks = 0;
let clicks_to_next = 1;
let level = 1;

let current_tick = 0;

let modifiers = [];

let nebulamode = false;
let dropped_nebulamode_item = false;

export function add_modifier(modifier) {
        modifiers.push(modifier);
        update_clicker_text()
}

export function remove_modifier(modifier) {
        const index = modifiers.indexOf(modifier);
        if (index !== -1) {
                modifiers.splice(index, 1);
        }
        update_clicker_text();
}

export function check_nebulamode() {
        if (nebulamode || dropped_nebulamode_item) return false;
        const inv = get_inv_item();
        if (inv.length < 12) return false;
        for (const item of inv) {
                if (item.rarity < box_rarities.ultrarare || nm_debug) {
                        return false;
                }
        }
        return true;
}

export function multiply_clicks(multiplier) {
        const before_total = total_clicks;
        total_clicks = Math.round(total_clicks * multiplier);
        clicks_to_next -= (total_clicks - before_total);
}

export function get_clicker_info() {
        return {
                clicks: total_clicks,
                level: level,
                nebulamode: nebulamode,
                tick: current_tick,
                clicks_left: clicks_to_next
        };
}

export function set_clicker_info(clicks, nlevel, nnebulamode, ntick, clicks_left) {
        total_clicks = clicks;
        level = nlevel;
        nebulamode = nnebulamode;
        current_tick = ntick;
        clicks_to_next = clicks_left;
        update_clicker_text();
}

export function set_nebulamode(val) {
        nebulamode = val;
}

export function get_nebulamode() {
        return nebulamode;
}

export function next_level() {
        level++;

        let box = generate_box();
        if (check_nebulamode()) {
                dropped_nebulamode_item = true;
                const boxdef = new BoxDef(
                        "the nebulabox",
                        "an intense glow radiates from this box...",
                        [box_rarities.mythical],
                        0,
                        [[
                                new ItemDef(
                                        "universal extension",
                                        "bends the universe to reveal rarer items. collector's favorite.",
                                        [box_rarities.mythical],
                                        0,
                                        [[]]
                                )
                        ]]
                )
                box = new Item(boxdef, box_rarities.mythical);
        }
        drop_box(box);

        display_cursor_notification(`dropped ${rarity_to_string(box.rarity)} ${box.name} (now level ${level})`);

        clicks_to_next = Math.ceil(Math.pow(1.5, level - 1));

        update_clicker_text();
}

export function update_clicker_text() {
        levelele.innerText = `level ${level}`;
        clicksele.innerText = `${total_clicks} clicks`;
        clicksleftele.innerText = `${clicks_to_next} clicks until drop`;
        modifiersele.innerText = "";
        for (const mod of modifiers) {
                modifiersele.innerText += `${mod.source} - ${mod.name}\n`;
        }
}

export function click(from_mod = false) {
        total_clicks++;
        clicks_to_next--;

        update_clicker_text();

        if (clicks_to_next <= 0) {
                next_level();
        }

        let mods = "";
        for (const mod of modifiers) {
                if (mod.type === modifier_types.click && from_mod === false) {
                        mod.callback();
                }

                mods += `${mod.source} - ${mod.name}\n`;
        }
        if (from_mod === false) display_cursor_notification(mods, 20, true);
}

export function tick() {
        current_tick++;
        for (const mod of modifiers) {
                if (mod.type === modifier_types.tick) {
                        mod.callback(current_tick);
                }
        }
}

export function init_click_handler() {
        clickerele.addEventListener("click", () => {
                for (const mod of modifiers) {
                        if (mod.type === modifier_types.click) {
                                mod.callback();
                        }
                }

                click();
        });
}

export function init_tick_handler() {
        setInterval(tick, 1000 / tps);
}
