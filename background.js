chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/shorts")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["handtrack.min.js"]
        });
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        });
    }
});
