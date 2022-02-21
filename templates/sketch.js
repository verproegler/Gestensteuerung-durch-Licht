// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

let flag = false;
let flag2 = false;                                        // damits net dauernd bimmelt

let mySound;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('/static/assets/doorbell');
  mySound2 = loadSound('/static/assets/Klingel');
}

function setup() {
  var canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  canvas.parent('sketch-holder');                        // Eigenkreation. Platziert Canvas da wo ich es haben will. Referenz


  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected.
  poseNet.on("pose", function (results) {
    try {
      poses = results;
      leftWrist = poses[0].pose.keypoints[9].position.y;  // der Index in Keypoints zählt Array in obj.json ab, was ausgelesen wird. Anfang[0]
      console.log(leftWrist)
      if (leftWrist < 200) {                              // Y-Achse von oben nach unten
        console.log("Left Hand up!")
        if (flag == false) {
          mySound.play()
          flag = true;
        }
      }
      if (leftWrist > 400) {
        flag = false;
      }

    } catch (TypeError) {
      console.log("No data points!")
    }
  });

  // Das gleiche für die linke Hand
  poseNet.on("pose", function (results2) {
    poses2 = results2;
    rightWrist = poses2[0].pose.keypoints[10].position.y; // die nummer in Keypoints zählt in obj.json ab, was ausgelesen wird. Anfang[0]
    console.log(rightWrist)
    if (rightWrist < 200) {
      console.log("Right Hand up!")
      if (flag2 == false) {
        mySound2.play()
        flag2 = true;
      }
    }
    if (rightWrist > 400) {
      flag2 = false;
    }
  })
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Heb deine linke  Hand!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
