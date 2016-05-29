/**
 * MyHook
 * @constructor
 */
 var degToRad = 180/Math.PI;

 function MyHook(scene, stacks, slices) {
 	CGFobject.call(this, scene);

 	//this.ropeLength = 4;

 	this.rope = new MyCylinder(scene, slices, stacks );
    this.rope.initBuffers();

    this.terceirogancho = new MyDroneLegs(scene, slices, stacks);
    this.terceirogancho.initBuffers(); 

    this.initBuffers();
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;


 MyHook.prototype.display = function(length) {
 	
    //this.ropeLength = 4;
    this.hookWidth = 0.07;

 	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad, 1, 0, 0);
 	this.scene.scale(0.02, 0.02, length);
    this.rope.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-this.hookWidth/2, -length, this.hookWidth*2+this.hookWidth-0.02);
 	this.scene.rotate(90*degToRad, 0, 1, 0);
 	this.scene.rotate(-90*degToRad, 0, 0, 1);
 	this.scene.scale(0.4, 0.2, this.hookWidth);
 	this.terceirogancho.display();
 	this.scene.popMatrix();
 	
 };
