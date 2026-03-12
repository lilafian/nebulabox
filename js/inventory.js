import { open_box } from "./boxutils.js";
import { box_rarities, items, Item } from "./items.js";
import { display_cursor_notification } from "./notification.js";
import { add_modifier, remove_modifier, set_nebulamode } from "./clicker.js";

const boxcontainer = document.querySelector("#boxes");
const itemcontainer = document.querySelector("#items");
const dropcontainer = document.querySelector("#drops");
const boxvaluespan = document.querySelector("#boxval");
const itemvaluespan = document.querySelector("#itemval");

let box_inventory = [];
let item_inventory = [];
let drops = [];

let box_value = 0;
let last_box_value = 0;
let item_value = 0;
let last_item_value = 0;

export function get_box_value_diff() {
        return box_value - last_box_value;
}

export function get_item_value_diff() {
        return item_value - last_item_value;
}

function update_values() {
        boxvaluespan.innerText = `$${box_value}`;
        itemvaluespan.innerText = `$${item_value}`;
}

export function get_inv_box() {
        return box_inventory;
}

export function set_inv_box(inv) {
        box_inventory = inv;
        for (const item of inv) {
                add_inv_ele(item);
        }
        update_values();
}

export function get_inv_item() {
        return item_inventory;
}

export function set_inv_item(inv) {
        item_inventory = inv;
        for (const item of inv) {
                const defarr = Object.values(items).filter((nitem) => nitem.name === item.name);
                const fixeditem = new Item(defarr[0], item.rarity);
                fixeditem.itemid = item.itemid;
                add_inv_ele(fixeditem);
        }
        update_values();
}

export function get_drops() {
        return drops;
}

export function set_drops(inv) {
        drops = inv;
        for (const item of inv) {
                actually_drop_box(item);
        }
}

function actually_drop_box(box) {
        const ele = document.createElement("div");
        ele.className = "item";
        ele.id = `d${box.itemid}`;
        ele.innerHTML = `
    <span class="itemname">${box.name}</span>
    <span
        class="itemrarity"
        style="background-image: var(--box-rarity-${Object.keys(box_rarities)[box.rarity]})"
        >${Object.keys(box_rarities)[box.rarity]}
    </span>
    <span class="itemdesc">
      ${box.desc}
    </span>
    <span class="itemsellprice">$${box.price}</span>
  `;

        ele.addEventListener("click", () => {
                inventory_add(box)
                remove_drop(box);
                const fmtdiff = v => `${v < 0 ? "-" : "+"}$${Math.abs(v)}`;
                display_cursor_notification(`obtained ${box.name} from a drop (${fmtdiff(get_box_value_diff())})`);
        });

        dropcontainer.appendChild(ele);
}

export function drop_box(box) {
        actually_drop_box(box);
        drops.push(box);
}

export function remove_drop(item) {
        const ele = document.getElementById(`d${item.itemid.toString()}`);
        ele.remove();
        const index = drops.findIndex(i => i.itemid === item.itemid);
        if (index !== -1) {
                drops.splice(index, 1);
        }
}

export function add_inv_ele(item) {
        const ele = document.createElement("div");
        ele.className = "item";
        ele.id = item.itemid;
        ele.innerHTML = `
    <span class="itemname">${item.name}</span>
    <span
        class="itemrarity"
        style="background-image: var(--box-rarity-${Object.keys(box_rarities)[item.rarity]})"
        >${Object.keys(box_rarities)[item.rarity]}
    </span>
    <span class="itemdesc">
      ${item.desc}
    </span>
    <span class="itemsellprice">$${item.price}</span>
  `;
        if (item.isbox) {
                ele.addEventListener("click", () => open_box(item));
        }

        ele.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                inventory_remove(item);
        });

        if (item.isbox) {
                boxcontainer.appendChild(ele);
                last_box_value = box_value;
                box_value += item.price;
        } else {
                itemcontainer.appendChild(ele);
                last_item_value = item_value;
                item_value += item.price;

                for (const mod of item.modifiers) {
                        add_modifier(mod);
                }
        }
}

export function inventory_add(item) {
        let inven;
        if (!item.isbox) inven = item_inventory;
        if (item.isbox) inven = box_inventory;
        if (inven.length >= 12) {
                return -1;
        }

        if (item.name === "universal extension") {
                set_nebulamode(true);
        }

        inven.push(item);

        add_inv_ele(item);

        update_values();
}

export function inventory_remove(item) {
        let inven;
        if (!item.isbox) inven = item_inventory;
        if (item.isbox) inven = box_inventory;

        if (item.name === "universal extension") {
                set_nebulamode(false);
        }

        const ele = document.getElementById(item.itemid.toString());
        ele.remove();

        const index = inven.findIndex(i => i.itemid === item.itemid);
        if (index !== -1) {
                inven.splice(index, 1);
        }

        if (item.isbox) {
                last_box_value = box_value;
                box_value -= item.price;
        } else {
                last_item_value = item_value;
                item_value -= item.price;

                for (const mod of item.modifiers) {
                        remove_modifier(mod);
                }
        }
        update_values();
}
