import { inventory_add, inventory_remove, get_box_value_diff, get_item_value_diff } from "./inventory.js";
import { Item, boxes, rarity_to_string, box_rarities } from "./items.js";
import { display_cursor_notification } from "./notification.js";
import { get_nebulamode } from "./clicker.js";

const base_rarity_weights = [
        40,
        35,
        30,
        25,
        20,
        15,
        10,
        5,
        0,
        0
];

const nebula_rarity_weights = [
        0.5,
        1,
        2,
        4,
        8,
        16,
        8,
        4,
        2,
        0.1
];

export function weighted_random(weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * total;

        for (let i = 0; i < weights.length; i++) {
                random -= weights[i];
                if (random <= 0) return i;
        }

        return weights.length - 1;
}

export function generate_weights(length) {
        let weights = [];

        for (let i = 0; i < length; i++) {
                weights.push(100 * Math.pow(2, -i + 1));
        }

        return weights;
};

export function open_box(box) {
        const itemdef = box.items[Math.floor(Math.random() * box.items.length)];
        const rarity = itemdef.rarities[weighted_random(generate_weights(itemdef.rarities.length))];
        const item = new Item(itemdef, rarity);
        const response = inventory_add(item);
        if (response === -1) {
                display_cursor_notification("your item inventory is full!", 0, true);
                return;
        }
        inventory_remove(box);

        const bvdiff = get_box_value_diff();
        const ivdiff = get_item_value_diff();
        const tvdiff = bvdiff + ivdiff;
        const bvdiffs = (bvdiff < 0 ? "-$":"+$") + Math.abs(bvdiff);
        const ivdiffs = (ivdiff < 0 ? "-$":"+$") + Math.abs(ivdiff);
        const tvdiffs = (tvdiff < 0 ? "-$":"+$") + Math.abs(tvdiff);
        display_cursor_notification(`obtained ${rarity_to_string(rarity)} ${item.name} from ${rarity_to_string(box.rarity)} ${box.name}\nbox ${bvdiffs}, item ${ivdiffs}, total ${tvdiffs}`);
}

export function generate_box() {
        let rarity = weighted_random(base_rarity_weights);
        if (get_nebulamode()) {
                rarity = weighted_random(nebula_rarity_weights);
        }
        const valid = Object.values(boxes).filter((box) => box.rarities.includes(rarity) && box !== boxes.debugbox);
        const box = valid[Math.floor(Math.random() * valid.length)];
        return new Item(box, rarity);
}
