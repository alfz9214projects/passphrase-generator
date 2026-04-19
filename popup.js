let masterKey = "";
let vault = {};

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePass() {
  return Array.from({length:4},()=>rand(WORDS)).join("-") + Math.floor(Math.random()*100);
}

document.getElementById("unlock").onclick = async () => {
  masterKey = document.getElementById("master").value;

  const data = await chrome.storage.local.get("vault");

  if (data.vault) {
    try {
      const decrypted = await decrypt(data.vault, masterKey);
      vault = JSON.parse(decrypted);
    } catch {
      alert("Wrong password");
      return;
    }
  }

  document.getElementById("app").classList.remove("hidden");
};

document.getElementById("generate").onclick = () => {
  document.getElementById("password").value = generatePass();
};

document.getElementById("save").onclick = async () => {
  const site = document.getElementById("site").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  vault[site] = { username, password };

  const encrypted = await encrypt(JSON.stringify(vault), masterKey);
  await chrome.storage.local.set({ vault: encrypted });
};

document.getElementById("load").onclick = () => {
  const site = document.getElementById("site").value;
  const data = vault[site];

  if (data) {
    document.getElementById("username").value = data.username;
    document.getElementById("password").value = data.password;
  }
};

document.getElementById("autofill").onclick = async () => {
  const site = document.getElementById("site").value;
  const creds = vault[site];

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (creds) => {
      const u = document.querySelector("input[type='text'],input[type='email']");
      const p = document.querySelector("input[type='password']");
      if (u) u.value = creds.username;
      if (p) p.value = creds.password;
    },
    args: [creds]
  });
};
