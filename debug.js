// copy into console

(async () => {
        const gm_notification = await import("./js/notification.js");
        const gm_items = await import("./js/items.js");
        const gm_inventory = await import("./js/inventory.js");

        const buttons = [];
        for (const item of Object.values(gm_items.items)) {
                buttons.push({
                        msg: item.name,
                        callback: () => {
                                const buttons2 = [];
                                for (const rar of item.rarities) {
                                        buttons2.push({
                                                msg: gm_items.rarity_to_string(rar),
                                                callback: () => {
                                                        gm_inventory.inventory_add(new gm_items.Item(item, rar));
                                                }
                                        });
                                }

                                gm_notification.display_popup_notification("pick rarity", buttons2);
                        }
                });
        }

        gm_notification.display_popup_notification("[debug] item adder", buttons);
})();

