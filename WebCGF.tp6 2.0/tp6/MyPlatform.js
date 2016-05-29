/**
 * MyPlatform
 * @constructor
 */
 function MyPlatform(scene) {
 	CGFobject.call(this, scene);

    this.release = 0;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.xpositive = this.x + 1.25;
    this.xnegative = this.x - 1.25;
    this.ypositive = this.y + 1.25;
    this.ynegative = this.y - 1.25;
    this.zpositive = this.z + 1.25;
    this.znegative = this.z - 1.25;

 	this.quad = new MyQuad(this.scene);
 };

 MyPlatform.prototype = Object.create(CGFobject.prototype);
 MyPlatform.prototype.constructor = MyPlatform;

 MyPlatform.prototype.display = function() {
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

MyPlatform.prototype.checkRelease = function(x1, x2, y1, y2, z1, z2) {
  if(x1 <= this.xpositive && x2 >= this.xnegative
  && y1 <= this.ypositive && y2 >= this.ynegative
  //&& z1 <= this.zpositive && z2 >= this.znegative) {
  && z2 <= this.zpositive){
    this.release = 1;
  }
};


MyPlatform.prototype.update = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.xpositive = x + 1.25;
  this.xnegative = x - 1.25;
  this.ypositive = y + 0.1;
  this.ynegative = y - 0.1;
  this.zpositive = z + 1.25;
  this.znegative = z - 1.25;
};


