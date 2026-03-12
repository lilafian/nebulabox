import { enable_overlay, get_overlay } from "./overlay.js";

let mousex = 0;
let mousey = 0;

let log = [];

export function init_cursor_handler() {
	document.addEventListener("mousemove", function (event) {
		mousex = event.clientX;
		mousey = event.clientY;
	});
}

export function display_cursor_notification(msg, yoff = 0, nolog = false) {
	const ele = document.createElement("span");
	ele.className = "cursornoti";
	ele.innerText = msg;
	ele.style.left = `${mousex}px`;
	ele.style.top = `${mousey + yoff}px`;
	document.body.appendChild(ele);
	if (!nolog) log.push(msg);

	setTimeout(() => {
		ele.remove();
	}, 5000);
}

export function display_notification_log() {
	const overlay = get_overlay();
	enable_overlay();
	overlay.innerHTML = `<span>notifications</span><ul id="notis"></ul>`;
	const ul = document.querySelector("#notis");
	for (const noti of log.toReversed()) {
		const ele = document.createElement("li");
		ele.innerText = noti;
		ul.appendChild(ele);
	}

}

export function display_popup_notification(msg, buttons) {
	const ele = document.createElement("div");
	ele.className = "popupnoti";
	ele.innerHTML = `
                        <span class="popuptext">${msg}</span>
                        <div class="popupbtnc"></div>
        `;
	document.body.appendChild(ele);
	for (const button of buttons) {
		const btn = document.createElement("div");
		btn.className = "popupbtn";
		btn.innerText = button.msg;
		btn.addEventListener("click", () => {
			button.callback();
			ele.remove();
		});
		ele.querySelector(".popupbtnc").appendChild(btn);
	}
}
