/**
 * MyBox
 * @constructor
 */
 function MyBox(scene) {
 	CGFobject.call(this, scene);

    this.grabbed  = 0; //=0: box in spawn point
                       //=1: box being grabbed by drone
                       //=2: box released on platform
    this.released = 0; //on true: box stops following drone

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.xpositive = this.x + 0.5;
    this.xnegative = this.x - 0.5;
    this.ypositive = this.y + 0.5;
    this.ynegative = this.y - 0.5;
    this.zpositive = this.z + 0.5;
    this.znegative = this.z - 0.5;

 	this.quad = new MyQuad(this.scene);
 };

 MyBox.prototype = Object.create(CGFobject.prototype);
 MyBox.prototype.constructor = MyBox;

 MyBox.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(180 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();
 };

MyBox.prototype.checkUpdate = function(x, y, z) {
  if(x <= this.xpositive && x >= this.xnegative
  && y <= this.ypositive && y >= this.ynegative
  && z <= this.zpositive && z >= this.znegative) {
    this.grabbed = 1;

  }
  //if(this.grabbed == true && this.y <= 2){
  //  this.released = true;
  //}
};

MyBox.prototype.update = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.xpositive = x + 0.5;
  this.xnegative = x - 0.5;
  this.ypositive = y + 0.5;
  this.ynegative = y - 0.5;
  this.zpositive = z + 0.5;
  this.znegative = z - 0.5;
};


