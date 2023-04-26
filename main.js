song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup() {
    canvas = createCanvas(800 , 670);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function draw() {
    image(video , 0 , 0 , 800 , 670 );
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2) {
    circle(rightWristX , rightWristY , 20);
    if(rightWristY > 0 && rightWristY <= 134){
        document.getElementById("speed@").innerHTML = "speed = 0.5X";
        song.rate(0.5);
    }
    elseif(rightWristY > 124 && rightWristY <= 268) 
    {
        document.getElementById("speed@").innerHTML = "speed = 1X";
        song.rate(1);
    }
    elseif(rightWristY > 268 && rightWristY <= 402) 
    {
        document.getElementById("speed@").innerHTML = "speed = 1.5X";
        song.rate(1.5);
    }
    elseif(rightWristY > 402 && rightWristY <= 536) 
    {
        document.getElementById("speed@").innerHTML = "speed = 2X";
        song.rate(2);
    }
    elseif(rightWristY > 536 && rightWristY <= 670) 
    {
        document.getElementById("speed@").innerHTML = "speed = 2.5X";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2) {
    circle(leftWristX , leftWristY , 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    DVA = remove_decimal/670;
    document.getElementById("volume!").innerHTML = "Volume = " + DVA;
    song.setVolume(DVA);
    }
}

function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log("poseNet is Initialized");
}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "and leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "and rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The accuracy of the leftWrist is" + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The accuracy of the RightWrist is" + scoreRightWrist);
    }
}