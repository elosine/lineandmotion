var srad = 16;
var sspd = 2;
var sypos = -120;
var sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( srad, 24, 12 ), new THREE.MeshPhongMaterial( { color: 0xFFFF00 } ) );
sphere.userData.velocity = new THREE.Vector3();
// sphere.position.z = -BOUNDSL/2;
sphere.position.z = -800;
sphere.position.x = sypos;
scene.add(sphere);
