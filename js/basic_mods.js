import { click, multiply_clicks } from "./clicker.js";
import { get_inv_item } from "./inventory.js";
import { items } from "./items.js";

export function mod_tick_autoclick(tick, cooldown) {
        if (tick % cooldown === 0) {
                click();
        }
}

export function mod_click_extra(amt) {
        for (let i = 0; i < amt; i++) {
                click(true);
        }
}

export function mod_click_multiply(amt) {
        multiply_clicks(amt);
}

export function mod_tick_sun_synergy(tick, base) {
        const inv = get_inv_item();
        let cooldown = base;
        const validset = new Set([
                "mercury",
                "venus",
                "earth",
                "mars",
                "jupiter",
                "saturn",
                "uranus",
                "neptune",
                "random asteroid",
                "pallas",
                "ceres",
                "juno",
                "vesta",
                "astraea"
        ]);

        for (const item of inv) {
                if (validset.has(item.name)) {
                        cooldown = Math.round(cooldown * 0.9);
                }
        }
        console.log(cooldown);

        if (tick % cooldown === 0) {
                click();
        }
}
