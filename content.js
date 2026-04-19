chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "FILL") {
    const u = document.querySelector("input[type='text'],input[type='email']");
    const p = document.querySelector("input[type='password']");
    if (u) u.value = msg.username;
    if (p) p.value = msg.password;
  }
});
