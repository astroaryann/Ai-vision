let video;
let detector;
let detections = [];

function setup() {
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    detector = ml5.objectDetector("cocossd", modelReady);
}

function modelReady() {
    console.log("Model Loaded!");
    detectObjects();
}

function detectObjects() {
    detector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    detections = results;
    detectObjects(); // Call detect again for continuous detection
}

function draw() {
    image(video, 0, 0);
    
    for (let i = 0; i < detections.length; i++) {
        let detection = detections[i];
        fill(0, 255, 0);
        noStroke();
        text(`${detection.label} (${nf(detection.confidence * 100, 0, 2)}%)`, detection.x + 10, detection.y + 10);
        noFill();
        stroke(255, 0, 0);
        rect(detection.x, detection.y, detection.width, detection.height);
    }
}

document.getElementById('start').addEventListener('click', () => {
    video.getVideoElement().play();
    setup();
});
