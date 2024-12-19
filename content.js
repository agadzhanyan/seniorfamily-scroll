let videoElement = null;

// Конфигурация Handtrack.js
const modelParams = {
    flipHorizontal: true, // Отражение камеры для удобства
    maxNumBoxes: 1,       // Только один объект
    iouThreshold: 0.5,    // Порог Intersection Over Union
    scoreThreshold: 0.7   // Минимальный порог достоверности
};

// Инициализация модели
let model;
handTrack.load(modelParams).then(loadedModel => {
    model = loadedModel;
    console.log("Handtrack.js model loaded.");
    startVideo();
});

// Запуск видео из камеры
function startVideo() {
    handTrack.startVideo(videoElement).then(status => {
        if (status) {
            console.log("Camera started.");
            detectGesture();
        } else {
            console.error("Camera permission denied.");
        }
    });
}

// Распознавание жестов
function detectGesture() {
    setInterval(() => {
        if (!model) return;
        model.detect(videoElement).then(predictions => {
            if (predictions.length > 0) {
                const gesture = predictions[0].label;
                console.log("Gesture detected:", gesture);
                if (gesture === "open") {
                    scrollToNext();
                }
            }
        });
    }, 100); // Интервал проверки
}

// Создание элемента для камеры
function createVideoElement() {
    videoElement = document.createElement("video");
    videoElement.style.position = "fixed";
    videoElement.style.bottom = "10px";
    videoElement.style.right = "10px";
    videoElement.style.width = "400px";
    videoElement.style.height = "400px";
    videoElement.style.zIndex = "1000";
    videoElement.style.border = "2px solid red";
    document.body.appendChild(videoElement);
}

createVideoElement();

// Функция для перехода к следующему видео
function scrollToNext() {
    const nextButton = document.querySelector('button[aria-label="Следующее видео"]');
    if (nextButton) {
        nextButton.click();
        console.log("Переход к следующему видео...");
    } else {
        console.error("Кнопка 'Следующее' не найдена!");
    }
}

function like() {
    const likeButton = document.querySelector(`ytd-toggle-button-renderer#like-button`);
    if (likeButton) {
        likeButton.click();
        console.log("Лайк...");
    } else {
        console.error("Лайк не найден!");
    }
}