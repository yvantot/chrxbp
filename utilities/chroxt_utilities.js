// Helpful scripts that helped me automate my workflow
// Translate local messages to Javascript
const data = {
	ext_name: {
		message: "Chroxt",
	},
	ext_description: {
		message: "Extension Developer Tools : Simplify extension development with automation",
	},
};

let str = "";
Object.keys(data).forEach((val) => {
	str += `document.getElementById("${val.replace("_", "-")}").textContent = chrome.i18n.getMessage("${val}")\n`;
});
console.log(str);

// -----------------------------------

const s_host = document.createElement("div");
const s_root = s_host.attachShadow({ mode: "closed" });
document.body.appendChild(s_host);

// Button for clear storage
(() => {
	let storage = chrome.storage.local;
	const clear_button = document.createElement("button");
	clear_button.setAttribute(
		"style",
		`   position: fixed;
                top: 0;
                right: 0;
                height: 20px;
                width: 40px;
                background-color: green;
                border: 1px solid black;            
            `
	);
	clear_button.addEventListener("click", () => {
		storage.get(null, (data) => {
			console.log("Storage before clearing: ");
			console.log(data);
			storage.clear(() => {
				if (chrome.runtime.lastError) {
					console.error("Storage has not been cleared", chrome.runtime.lastError);
				} else {
					storage.get(null, (data) => console.log("Storage successfully cleared: ", data));
				}
			});
		});
	});
	s_root.appendChild(clear_button);
})();
