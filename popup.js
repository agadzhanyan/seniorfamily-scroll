document.getElementById("start-tracking").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startTracking" }, response => {
        console.log(response.status);
    });
});

document.getElementById("stop-tracking").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopTracking" }, response => {
        console.log(response.status);
    });
});
