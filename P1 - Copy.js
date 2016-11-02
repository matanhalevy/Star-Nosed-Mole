// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
    this.matrix=a;
    this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
    window.scrollTo(0,0);
}

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this!
var normalMaterial = new THREE.MeshNormalMaterial();


// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
    var unitCube = new THREE.BoxGeometry(1,1,1);
    return unitCube;
}

var torsoGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(4.5,0,0,0, 0,4.5,0,0, 0,0,8,0, 0,0,0,1);
torsoGeometry.applyMatrix(non_uniform_scale);


for(i=0;i<90;i++){
    var rotateTorsoGeometry = makeCube();
    rotateTorsoGeometry.applyMatrix(non_uniform_scale);
    var rotationTorsoSliceMatrix = new THREE.Matrix4().set(
        Math.cos((i*Math.PI)/180),-Math.sin((i*Math.PI)/180),0,0,
        Math.sin((i*Math.PI)/180),Math.cos((i*Math.PI)/180),0,0,
        0,0,1,0,
        0,0,0,1);
    torsoGeometry.merge(rotateTorsoGeometry,rotationTorsoSliceMatrix);
}


// ----------------- GEOMETRY -----------------



var headGeometry = makeCube();
var non_uniform_scaleHead = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,3,0, 0,0,0,1);
headGeometry.applyMatrix(non_uniform_scaleHead);
for(i=0;i<90;i++){
    var rotateHeadGeometry = makeCube();
    rotateHeadGeometry.applyMatrix(non_uniform_scaleHead);
    var rotationHeadSliceMatrix = new THREE.Matrix4().set(
        Math.cos((i*Math.PI)/180),-Math.sin((i*Math.PI)/180),0,0,
        Math.sin((i*Math.PI)/180),Math.cos((i*Math.PI)/180),0,0,
        0,0,1,0,
        0,0,0,1);
    headGeometry.merge(rotateHeadGeometry,rotationHeadSliceMatrix);
}

var noseBaseGeometry = makeCube();
var non_uniform_scaleNoseBase = new THREE.Matrix4().set(1.5,0,0,0, 0,1,0,0, 0,0,0.1,0, 0,0,0,1);
noseBaseGeometry.applyMatrix(non_uniform_scaleNoseBase);

//FRONT LEGS GEOMETRY

var armGeometry = makeCube();
var non_uniform_scaleArm = new THREE.Matrix4().set(0.75,0,0,0, 0,2,0,0, 0,0,1.5,0, 0,0,0,1);
armGeometry.applyMatrix(non_uniform_scaleArm);
var shearArm = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0, -0.5,1,0, 0,0,0,1);
armGeometry.applyMatrix(shearArm);

var clawGeometry = makeCube();
var non_uniform_scaleClaw = new THREE.Matrix4().set(1.75,0,0,0, 0,0.8,0,0, 0,0,2.5,0, 0,0,0,1);
clawGeometry.applyMatrix(non_uniform_scaleClaw);

// BACK LEGS GEOMETRY

var legGeometry = makeCube();
var non_uniform_scaleLeg = new THREE.Matrix4().set(0.5,0,0,0, 0,2,0,0, 0,0,1,0, 0,0,0,1);
legGeometry.applyMatrix(non_uniform_scaleLeg);
var shearLeg = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0, 0.75,1,0, 0,0,0,1);
legGeometry.applyMatrix(shearLeg);

var backFootGeometry = makeCube();
var non_uniform_scaleFoot = new THREE.Matrix4().set(0.5,0,0,0, 0,0.5,0,0, 0,0,2,0, 0,0,0,1);
backFootGeometry.applyMatrix(non_uniform_scaleFoot);

// TAIL GEOMETRY

var tailGeometry = makeCube();
var non_uniform_scaleTail = new THREE.Matrix4().set(0.35,0,0,0, 0,0.35,0,0, 0,0,6.5,0, 0,0,0,1);
tailGeometry.applyMatrix(non_uniform_scaleTail);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY.
// Note: You will be using transformation matrices to set the shape.
// Note: You are not allowed to use the tools Three.js provides for
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)
// Hint: Explicity declare new matrices using Matrix4().set



// ----------------- MATRICES -----------------
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,5.5, 0,0,0,1);
var noseBaseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2, 0,0,1,7.05, 0,0,0,1);
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1, 0,0,1,-7.25, 0,0,0,1);

var noseTentacleMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2, 0,0,1,7, 0,0,0,1);

var leftArmMatrix = new THREE.Matrix4().set(1,0,0,2.825, 0,1,0,0.75, 0,0,1,3.25, 0,0,0,1);
var rightArmMatrix = new THREE.Matrix4().set(1,0,0,-2.825, 0,1,0,0.75, 0,0,1,3.25, 0,0,0,1);
var leftClawMatrix = new THREE.Matrix4().set(1,0,0,2.825, 0,1,0,-0.65, 0,0,1,4.25, 0,0,0,1);
var rightClawMatrix = new THREE.Matrix4().set(1,0,0,-2.825, 0,1,0,-0.65, 0,0,1,4.25, 0,0,0,1);
var nailFrontLeftMatrix = new THREE.Matrix4().set(1,0,0,2.11, 0,1,0,-0.7, 0,0,1,5.75, 0,0,0,1);
var nailFrontRightMatrix = new THREE.Matrix4().set(1,0,0,-3.55, 0,1,0,-0.7, 0,0,1,5.75, 0,0,0,1);

var leftLegMatrix = new THREE.Matrix4().set(1,0,0,2.25, 0,1,0,0.45, 0,0,1,-3.25, 0,0,0,1);
var rightLegMatrix = new THREE.Matrix4().set(1,0,0,-2.25, 0,1,0,0.45, 0,0,1,-3.25, 0,0,0,1);
var leftFootMatrix = new THREE.Matrix4().set(1,0,0, 2.25, 0,1,0,-0.78, 0,0,1,-3.5, 0,0,0,1);
var rightFootMatrix = new THREE.Matrix4().set(1,0,0,-2.25, 0,1,0,-0.78, 0,0,1,-3.5, 0,0,0,1);
var nailBackLeftMatrix = new THREE.Matrix4().set(1,0,0,2.05, 0,1,0,-0.83, 0,0,1,-2.5, 0,0,0,1);
var nailBackRightMatrix = new THREE.Matrix4().set(1,0,0,-2.45, 0,1,0,-0.83, 0,0,1,-2.5, 0,0,0,1);



// TO-DO: INITIALIZE THE REST OF YOUR MATRICES
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why?



// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix);
scene.add(torso);

//CREATE HEAD
var head = new THREE.Mesh(headGeometry,normalMaterial);
head.setMatrix(headMatrix);
scene.add(head);

//CREATE TAIL
var tail = new THREE.Mesh(tailGeometry,normalMaterial);
tail.setMatrix(tailMatrix);
scene.add(tail);

//CREATE ARMS
var leftArm = new THREE.Mesh(armGeometry,normalMaterial);
leftArm.setMatrix(leftArmMatrix);
scene.add(leftArm);

var rightArm = new THREE.Mesh(armGeometry,normalMaterial);
rightArm.setMatrix(rightArmMatrix);
scene.add(rightArm);

var leftClaw = new THREE.Mesh(clawGeometry, normalMaterial);
leftClaw.setMatrix(leftClawMatrix);
scene.add(leftClaw);

var rightClaw = new THREE.Mesh(clawGeometry, normalMaterial);
rightClaw.setMatrix(rightClawMatrix);
scene.add(rightClaw);

var frontNails = [];
var frontNailsRight = [];
var frontNailsLeft = [];

for(i=0;i<10;i++){
    var nailGeometry = makeCube();
    var non_uniform_scaleNail = new THREE.Matrix4().set(0.15,0,0,0, 0,0.8,0,0, 0,0,0.75,0, 0,0,0,1);
    nailGeometry.applyMatrix(non_uniform_scaleNail);
    var shearNail = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0, -0.7,1,0, 0,0,0,1);
    nailGeometry.applyMatrix(shearNail);

    if (i<5) {
        var translateNailMatrix = new THREE.Matrix4().set(1,0,0,i*0.35, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        nailGeometry.applyMatrix(translateNailMatrix);

        var nailFront = new THREE.Mesh(nailGeometry, normalMaterial);
        nailFront.setMatrix(nailFrontLeftMatrix);
        scene.add(nailFront);
        frontNailsLeft[i] = {"nail": nailFront, "matx": nailFrontLeftMatrix};
        frontNails[i] = {"nail": nailFront, "matx": nailFrontLeftMatrix};
    }else {
        var translateNailMatrix = new THREE.Matrix4().set(1,0,0,(i-5)*0.35, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        nailGeometry.applyMatrix(translateNailMatrix);

        var nailFront = new THREE.Mesh(nailGeometry, normalMaterial);

        nailFront.setMatrix(nailFrontRightMatrix);
        scene.add(nailFront);

        frontNailsRight[i] = {"nail": nailFront, "matx": nailFrontLeftMatrix};
        frontNails[i] = {"nail": nailFront, "matx": nailFrontRightMatrix};
    }
}

//CREATE LEGS
var leftLeg = new THREE.Mesh(legGeometry,normalMaterial);
leftLeg.setMatrix(leftLegMatrix);
scene.add(leftLeg);

var rightLeg = new THREE.Mesh(legGeometry,normalMaterial);
rightLeg.setMatrix(rightLegMatrix);
scene.add(rightLeg);

var leftFoot = new THREE.Mesh(backFootGeometry, normalMaterial);
leftFoot.setMatrix(leftFootMatrix);
scene.add(leftFoot);

var rightFoot = new THREE.Mesh(backFootGeometry, normalMaterial);
rightFoot.setMatrix(rightFootMatrix);
scene.add(rightFoot);

var backNails = [];
var backNailsLeft = [];
var backNailsRight = [];

for(i=0;i<10;i++){
    var nailGeometry = makeCube();
    var non_uniform_scaleNail = new THREE.Matrix4().set(0.05,0,0,0, 0,0.4,0,0, 0,0,1,0, 0,0,0,1);
    nailGeometry.applyMatrix(non_uniform_scaleNail);
    var shearNail = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0, -0.7,1,0, 0,0,0,1);
    nailGeometry.applyMatrix(shearNail);

    if (i<5) {
        var translateNailMatrix = new THREE.Matrix4().set(1,0,0,i*0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        nailGeometry.applyMatrix(translateNailMatrix);

        var nailBack = new THREE.Mesh(nailGeometry, normalMaterial);
        nailBack.setMatrix(nailBackLeftMatrix);
        scene.add(nailBack);
        backNailsLeft[i] = {"nail": nailBack, "matx": nailBackLeftMatrix};
        backNails[i] = {"nail": nailBack, "matx": nailBackLeftMatrix};
    }else {
        var translateNailMatrix = new THREE.Matrix4().set(1,0,0,(i-5)*0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        nailGeometry.applyMatrix(translateNailMatrix);

        var nailBack = new THREE.Mesh(nailGeometry, normalMaterial);

        nailBack.setMatrix(nailBackRightMatrix);
        scene.add(nailBack);
        backNailsRight[i] = {"nail": nailBack, "matx": nailBackLeftMatrix};
        backNails[i] = {"nail": nailBack, "matx": nailBackRightMatrix};
    }
}


//CREATE NOSEBASE
var noseBase = new THREE.Mesh(noseBaseGeometry,normalMaterial);
noseBase.setMatrix(noseBaseMatrix);
scene.add(noseBase);



//CREATE NOSETENTACLE
var nose =[];

for(i = 0; i<22; i++){
    var tentacleGeometry = makeCube();
    if(i<18){
        var non_uniform_scaleTentLarg = new THREE.Matrix4().set(1.5,0,0,0, 0,0.05,0,0, 0,0,0.1,0, 0,0,0,1);
        tentacleGeometry.applyMatrix(non_uniform_scaleTentLarg);
        if(i<9){
            var translationMatrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            var rotatationMatrixZ = new THREE.Matrix4().set(
                Math.cos(((40-(i*10))*Math.PI)/180),-Math.sin(((40-(i*10))*Math.PI)/180),0,0,
                Math.sin(((40-(i*10))*Math.PI)/180),Math.cos(((40-(i*10))*Math.PI)/180),0,0,
                0,0,1,0,
                0,0,0,1);


            var rotatationMatrixY = new THREE.Matrix4().set(
                Math.cos((-20*Math.PI)/180),0,Math.sin((-20*Math.PI)/180),0,
                0,1,0,0,
                -Math.sin((-20*Math.PI)/180),0,Math.cos((-20*Math.PI)/180),0,
                0,0,0,1
            );

        }else {
            var translationMatrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            var rotatationMatrixZ = new THREE.Matrix4().set(
                Math.cos(((40-((i-9)*10))*Math.PI)/180),-Math.sin(((40-((i-9)*10))*Math.PI)/180),0,0,
                Math.sin(((40-((i-9)*10))*Math.PI)/180),Math.cos(((40-((i-9)*10))*Math.PI)/180),0,0,
                0,0,1,0,
                0,0,0,1);

            var rotatationMatrixY = new THREE.Matrix4().set(
                Math.cos((20*Math.PI)/180),0,Math.sin((20*Math.PI)/180),0,
                0,1,0,0,
                -Math.sin((20*Math.PI)/180),0,Math.cos((20*Math.PI)/180),0,
                0,0,0,1
            );
        }
    }else{
        var non_uniform_scaleTentSmall = new THREE.Matrix4().set(1,0,0,0, 0,0.05,0,0, 0,0,0.1,0, 0,0,0,1);
        tentacleGeometry.applyMatrix(non_uniform_scaleTentSmall);
        if (i<20){
        var translationMatrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            var rotatationMatrixZ = new THREE.Matrix4().set(
                Math.cos(((70-((i-18)*140))*Math.PI)/180),-Math.sin(((70-((i-18)*140))*Math.PI)/180),0,0,
                Math.sin(((70-((i-18)*140))*Math.PI)/180),Math.cos(((70-((i-18)*140))*Math.PI)/180),0,0,
                0,0,1,0,
                0,0,0,1);
            var rotatationMatrixY = new THREE.Matrix4().set(
                Math.cos((-40*Math.PI)/180),0,Math.sin((-40*Math.PI)/180),0,
                0,1,0,0,
                -Math.sin((-40*Math.PI)/180),0,Math.cos((-40*Math.PI)/180),0,
                0,0,0,1);
        }else{
            var translationMatrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            var rotatationMatrixZ = new THREE.Matrix4().set(
                Math.cos(((70-((i-20)*140))*Math.PI)/180),-Math.sin(((70-((i-20)*140))*Math.PI)/180),0,0,
                Math.sin(((70-((i-20)*140))*Math.PI)/180),Math.cos(((70-((i-20)*140))*Math.PI)/180),0,0,
                0,0,1,0,
                0,0,0,1);


            var rotatationMatrixY = new THREE.Matrix4().set(
                Math.cos((40*Math.PI)/180),0,Math.sin((40*Math.PI)/180),0,
                0,1,0,0,
                -Math.sin((40*Math.PI)/180),0,Math.cos((40*Math.PI)/180),0,
                0,0,0,1
            );
        }

    }
    tentacleGeometry.applyMatrix(translationMatrix);
    tentacleGeometry.applyMatrix(rotatationMatrixZ);
    tentacleGeometry.applyMatrix(rotatationMatrixY);

    var noseTentacleLarge = new THREE.Mesh(tentacleGeometry,normalMaterial);
    noseTentacleLarge.setMatrix(noseTentacleMatrix);
    scene.add(noseTentacleLarge);

    nose[i] = {"tentacle": noseTentacleLarge, "matx": noseTentacleMatrix};
}

//ADD ELEMENTS TO FACE ARRAY
var face = [];

face.push({"part": head, "matx":headMatrix});
face.push({"part": noseBase, "matx":noseBaseMatrix});
for(i in nose){
    face.push({"part": nose[i].tentacle, "matx": nose[i].matx});
}


//ADD ELEMENTS TO LEFTARM

//ADD ElEMENTS TO MOLE ARRAY
var mole = [];

mole.push({"part": torso, "matx":torsoMatrix});
mole.push({"part": head, "matx": headMatrix});
mole.push({"part": noseBase, "matx": noseBaseMatrix});
mole.push({"part": tail, "matx": tailMatrix});
mole.push({"part": leftArm, "matx": leftArmMatrix});
mole.push({"part": rightArm, "matx": rightArmMatrix});
mole.push({"part": leftClaw, "matx": leftClawMatrix});
mole.push({"part": rightClaw, "matx": rightClawMatrix});
mole.push({"part": leftLeg, "matx": leftLegMatrix});
mole.push({"part": rightLeg, "matx": rightLegMatrix});
mole.push({"part": leftFoot, "matx": leftFootMatrix});
mole.push({"part": rightFoot, "matx": rightFootMatrix});

for(i in nose){
    mole.push({"part": nose[i].tentacle, "matx": nose[i].matx});
}

for(i in frontNails){
    mole.push({"part": frontNails[i].nail, "matx": frontNails[i].matx});
}
for(i in backNails){
    mole.push({"part": backNails[i].nail, "matx": backNails[i].matx});
}

//mole.push({"part": , "matx": });



// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part.
//             Then you can make sure your hierarchy still works properly after each step.



// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?
var jumpCut = false;

// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
    p0 = p_start;
    p1 = p_end;
    time_length = t_length;
    time_start = clock.getElapsedTime();
    time_end = time_start + time_length;
    animate = true; // flag for animation
    return;
}


function updateBody() {
    switch(true)
    {
        case(key == "U" && animate):
            rotateMoleZ();
            break
        case(key == "E" && animate):
            rotateMoleZ();
            break
        case (key == "H" && animate):
            rotateFaceX();
            break
        case (key == "G" && animate):
            rotateFaceX();
            break
        case (key == "T" && animate):
            rotateTailX();
            break
        case (key == "V" && animate):
            rotateTailX();
            break
        case (key == "N" && animate):
            fanTentaclesOut();
            break
        case (key == "S1" && animate):
            swim1();
            break
        case (key == "S2" && animate):
            swim2();
            break
        case (key == "S3" && animate):
            swim3();
            break
        case (key == "D1" && animate):
            dig1();
            break
        case (key == "D2" && animate):
            dig2();
            break


        // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
        // Note: Remember spacebar sets jumpcut/animate!



        default:
            break;
    }
}
//FOR KEY PRESSES U + E
function rotateMoleZ(){
    timeCalc();

    var rotateZ = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(-p),-Math.sin(-p), 0,
        0, Math.sin(-p), Math.cos(-p), 0,
        0,        0,         0,        1);

    for(i in mole){
        mole[i].part.setMatrix(new THREE.Matrix4().multiplyMatrices(rotateZ,mole[i].matx));
    }
}

function rotateFaceX(){
    timeCalc();

    var rotateX = new THREE.Matrix4().set(
        Math.cos(-p),0, Math.sin(-p),0,
        0,1,0,0,
        -Math.sin(-p),0,Math.cos(-p),0,
        0,0,0,1
    )

    var translatePivot = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,4,
        0,0,0,1
    )

    var translatePivotBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,-4,
        0,0,0,1
    )

    for(i in face){
        //face[i].part.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivot, face[i].matx));
        face[i].part.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivot, rotateX).multiply(translatePivotBack).multiply(face[i].matx));
        //face[i].part.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotBack, face[i].matx));
    }
}

function rotateTailX(){
    timeCalc();
    var rotateX = new THREE.Matrix4().set(
        Math.cos(-p),0, Math.sin(-p),0,
        0,1,0,0,
        -Math.sin(-p),0,Math.cos(-p),0,
        0,0,0,1
    )

    var translatePivot = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,-4,
        0,0,0,1
    )

    var translatePivotBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,4,
        0,0,0,1
    )

    tail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivot, rotateX).multiply(translatePivotBack).multiply(tailMatrix));
}

function fanTentaclesOut(){
    timeCalc();

    var rotationMatrixYBL = new THREE.Matrix4().set(
        Math.cos(((p)*Math.PI)/180),0,Math.sin((p*Math.PI)/180),0,
        0,1,0,0,
        -Math.sin((p*Math.PI)/180),0,Math.cos((p*Math.PI)/180),0,
        0,0,0,1
    );

    var rotationMatrixYBR = new THREE.Matrix4().set(
        Math.cos((-p*Math.PI)/180),0,Math.sin((-p*Math.PI)/180),0,
        0,1,0,0,
        -Math.sin((-p*Math.PI)/180),0,Math.cos((-p*Math.PI)/180),0,
        0,0,0,1
    );

    var rotationMatrixYSL = new THREE.Matrix4().set(
        Math.cos((2*p*Math.PI)/180),0,Math.sin((2*p*Math.PI)/180),0,
        0,1,0,0,
        -Math.sin((2*p*Math.PI)/180),0,Math.cos((2*p*Math.PI)/180),0,
        0,0,0,1);

    var rotationMatrixYSR = new THREE.Matrix4().set(
        Math.cos((-2*p*Math.PI)/180),0,Math.sin((-2*p*Math.PI)/180),0,
        0,1,0,0,
        -Math.sin((-2*p*Math.PI)/180),0,Math.cos((-2*p*Math.PI)/180),0,
        0,0,0,1
    );

    var translatePivot = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,7,
        0,0,0,1
    )

    var translatePivotBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0,
        0,0,1,-7,
        0,0,0,1
    )

    for(i in nose){
        var rotateY;
        if (i<9){
            rotateY = rotationMatrixYBL;
        }else if (i<18){
            rotateY = rotationMatrixYBR;
        }else if (i<20){
            rotateY = rotationMatrixYSL;
        }else rotateY = rotationMatrixYSR;
        nose[i].tentacle.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivot, rotateY).multiply(translatePivotBack).multiply(nose[i].matx));
    }
}

function swim1(){
    p0 = 0;
    p1 = Math.PI/16;
    timeCalc();

    var translatePivotLeftShoulder = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.75,
        0,0,1,0,
        0,0,0,1
    )
    /*var translatePivotRightLeg = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.75,
        0,0,1,0,
        0,0,0,1
    )*/

    var rotateLimb = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(-p),-Math.sin(-p), 0,
        0, Math.sin(-p), Math.cos(-p), 0,
        0,        0,         0,        1
    )

    var translatePivotLeftShoulderBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.75,
        0,0,1,0,
        0,0,0,1
    )
    /*var translatePivotRightLegBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.75,
        0,0,1,0,
        0,0,0,1
    )*/
    leftArm.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(leftArmMatrix));
    leftClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(leftClawMatrix));
    for(i in frontNailsLeft){
        frontNailsLeft[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(frontNailsLeft[i].matx));
    }

    rightLeg.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(rightLegMatrix));
    rightFoot.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(rightFootMatrix));
    for(i in backNailsRight){
        backNailsRight[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(nailBackRightMatrix));
    }

    p0 = 0;
    p1 = Math.PI/8
    rotateTailX();

    p0 = 0;
    p1 = 20;
    fanTentaclesOut();

    p0 = 0;
    p1 = Math.PI/8;
    rotateFaceX();

}

function swim2(){
    p1 = 0;
    p0 = Math.PI/16;
    timeCalc();

    var translatePivotLeftShoulder = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.75,
        0,0,1,0,
        0,0,0,1
    )

    var rotateLimb = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(-p),-Math.sin(-p), 0,
        0, Math.sin(-p), Math.cos(-p), 0,
        0,        0,         0,        1
    )

    var translatePivotLeftShoulderBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.75,
        0,0,1,0,
        0,0,0,1
    )



    leftArm.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(leftArmMatrix));
    leftClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(leftClawMatrix));
    for(i in frontNailsLeft){
        frontNailsLeft[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(frontNailsLeft[i].matx));
    }

    rightLeg.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(rightLegMatrix));
    rightFoot.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(rightFootMatrix));
    for(i in backNailsRight){
        backNailsRight[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotLeftShoulder, rotateLimb).multiply(translatePivotLeftShoulderBack).multiply(nailBackRightMatrix));
    }

    p0 = 0;
    p1 = Math.PI/16;
    swim2RightMovement();


    p0 = Math.PI/8;
    p1 = -Math.PI/8
    rotateTailX();


    p0 = Math.PI/8;
    p1 = -Math.PI/8;
    rotateFaceX();
}

function swim2RightMovement(){
    timeCalc()
    var rotateLimbRight = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(-p),-Math.sin(-p), 0,
        0, Math.sin(-p), Math.cos(-p), 0,
        0,        0,         0,        1
    )

    var translatePivotRightShoulder = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.75,
        0,0,1,0,
        0,0,0,1
    )

    var translatePivotRightShoulderBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.75,
        0,0,1,0,
        0,0,0,1
    )



    rightArm.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(rightArmMatrix));
    rightClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(rightClawMatrix));
    for(i in frontNailsRight){
        frontNailsRight[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(nailFrontRightMatrix));
    }

    leftLeg.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(leftLegMatrix));
    leftFoot.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(leftFootMatrix));
    for(i in backNailsLeft){
        backNailsLeft[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotRightShoulder, rotateLimbRight).multiply(translatePivotRightShoulderBack).multiply(nailBackLeftMatrix));
    }
}

function swim3(){
    p1 = 0;
    p0 = Math.PI/16;
    swim2RightMovement();

    p1 = 0;
    p0 = -Math.PI/8
    rotateTailX();

    p1 = 0;
    p0 = 20;
    fanTentaclesOut();

    p1 = 0;
    p0 = -Math.PI/8;
    rotateFaceX();
}

function dig1(){
    p0 = 0;
    p1 = Math.PI/24
    timeCalc()
    var rotateLimb = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(p),-Math.sin(p), 0,
        0, Math.sin(p), Math.cos(p), 0,
        0,        0,         0,        1
    )

    var translateClaw = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.65,
        0,0,1,3.5,
        0,0,0,1
    )

    var translatePivotClawBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.65,
        0,0,1,-3.5,
        0,0,0,1
    )

    rightClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translateClaw, rotateLimb).multiply(translatePivotClawBack).multiply(rightClawMatrix));
    leftClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translateClaw, rotateLimb).multiply(translatePivotClawBack).multiply(leftClawMatrix));

    p0 = 0;
    p1 = Math.PI/8;
    rotateClaws();

}function dig2(){
    p1 = 0;
    p0 = Math.PI/24
    timeCalc()
    var rotateLimb = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(p),-Math.sin(p), 0,
        0, Math.sin(p), Math.cos(p), 0,
        0,        0,         0,        1
    )

    var translateClaw = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.65,
        0,0,1,3.5,
        0,0,0,1
    )

    var translatePivotClawBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.65,
        0,0,1,-3.5,
        0,0,0,1
    )

    rightClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translateClaw, rotateLimb).multiply(translatePivotClawBack).multiply(rightClawMatrix));
    leftClaw.setMatrix(new THREE.Matrix4().multiplyMatrices(translateClaw, rotateLimb).multiply(translatePivotClawBack).multiply(leftClawMatrix));

    p1 = 0;
    p0 = Math.PI/8;
    rotateClaws();

}

function rotateClaws(){
    timeCalc();

    var rotateLimb = new THREE.Matrix4().set(
        1,        0,         0,        0,
        0, Math.cos(p),-Math.sin(p), 0,
        0, Math.sin(p), Math.cos(p), 0,
        0,        0,         0,        1
    )

    var translatePivotNail = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,0.7,
        0,0,1,4,
        0,0,0,1
    )

    var translatePivotNailBack = new THREE.Matrix4().set(
        1,0,0,0,
        0,1,0,-0.7,
        0,0,1,-4,
        0,0,0,1
    )

    for(i in frontNails){
        frontNails[i].nail.setMatrix(new THREE.Matrix4().multiplyMatrices(translatePivotNail, rotateLimb).multiply(translatePivotNailBack).multiply(frontNails[i].matx));
    }
}

// TO GET CURRENT FRAME
function timeCalc(){
    var time = clock.getElapsedTime(); // t seconds passed since the clock started.
    if(jumpCut){
        p = p0;
        animate = false;
    }
    if (time > time_end){
        p = p1;
        animate = false;
    }

    p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame
}



// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
    if (event.repeat)
        return;
    if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
        grid_state = !grid_state;
        grid_state? scene.add(grid) : scene.remove(grid);}
    else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
        camera.position.set(45,0,0);
        camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event,"space")){//turnon/off jumpcut
        jumpCut = !jumpCut;
    }
    else if(keyboard.eventMatches(event,"U")){ //rotate entire mole up in Z
        (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}
    else if(keyboard.eventMatches(event,"E")){ //rotate entire mole down in Z
        (key=="E")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/4,1),key = "E")
    }else if(keyboard.eventMatches(event,"H")){ //rotate head in x
        (key=="H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1),key = "H")
    }else if(keyboard.eventMatches(event,"G")){ //rotate head in x
        (key=="G")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/8,1),key = "G")
    }else if(keyboard.eventMatches(event,"T")){ //rotate head in x
        (key=="T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1),key = "T")
    }else if(keyboard.eventMatches(event,"V")){ //rotate head in x
        (key=="V")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/8,1),key = "V")
    }else if(keyboard.eventMatches(event,"N")){ //rotate head in x
        (key=="N")? init_animation(p1,p0,time_length) : (init_animation(0,20,1),key = "N")
    }else if(keyboard.eventMatches(event, "S")){
        if(key =="S1"){
            init_animation(0,Math.PI/16,1); //doesnt matter what value just put Math.PI/16 for now
            key ="S2";
        }else if (key == "S2"){
            init_animation(0,Math.PI/16,1);
            key = "S3";
        }else{
            init_animation(0,Math.PI/16,1);
            key = "S1";
        }
    }else if(keyboard.eventMatches(event,"D")) { //dig
        if (key == "D1"){
            (init_animation(0, Math.PI/24, 1));
            key = "D2"
        }else{
            (init_animation(0, Math.PI/24, 1));
            key = "D1"
        }
    }
    // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
    // Note: Remember spacebar sets jumpcut/animate!
    // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



});


// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
    updateBody();

    requestAnimationFrame(update);
    renderer.render(scene,camera);
}

update();