import { get_inv_box, get_inv_item, get_drops, set_inv_box, set_inv_item, set_drops } from "./inventory.js"
import { get_clicker_info, set_clicker_info } from "./clicker.js";

let saving = true;

export function stop_next_save() {
        saving = false;
}

export function reset_save() {
        stop_next_save();
        localStorage.clear();
        window.location.reload();
}

export function save_game() {
        if (saving === false) {
                saving = true;
                return;
        }
        const clicker_info = get_clicker_info();
        const save = {
                box_inv: get_inv_box(),
                item_inv: get_inv_item(),
                drops: get_drops(),
                clicks: clicker_info.clicks,
                level: clicker_info.level,
                clicks_left: clicker_info.clicks_left,
                tick: clicker_info.tick,
                nebulamode: clicker_info.nebulamode
        };
        localStorage.setItem("gamestate", JSON.stringify(save));
}

export function load_game() {
        const state = localStorage.getItem("gamestate");
        if (state === null) return -1;
        
        const save = JSON.parse(state);

        set_clicker_info(save.clicks, save.level, save.nebulamode, save.tick, save.clicks_left);
        set_inv_box(save.box_inv);
        set_inv_item(save.item_inv);
        set_drops(save.drops);
}
