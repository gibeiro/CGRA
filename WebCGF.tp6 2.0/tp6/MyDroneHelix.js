function MyDroneHelix(scene, stacks, slices, angulo)
{
    CGFobject.call(this, scene);

    degToRad = Math.PI / 180.0;

    this.scene = scene;
    this.stacks = stacks;
    this.slices = slices;

    this.angulo = angulo;

    this.helix = new MyCylinder(scene, stacks, slices)
    this.helix.initBuffers();

    this.helixbase = new MyHalfSphere(scene, stacks, slices);
    this.helixbase.initBuffers();
    
    this.initBuffers();
};

MyDroneHelix.prototype = Object.create(CGFobject.prototype);
MyDroneHelix.prototype.constructor = MyDroneHelix;

MyDroneHelix.prototype.setAngle = function(angulo)
{
    this.angulo = angulo;
};


MyDroneHelix.prototype.display = function()
{
   this.scene.pushMatrix();
   this.scene.rotate(180*degToRad, 1, 0, 0);
   this.scene.scale(0.2, 0.2, 0.2);
   this.helixbase.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   //this.scene.rotate(this.angulo*degToRad, 0, 0, 1);
   this.scene.translate(0, 0.1, 0);
   this.scene.rotate(-10*degToRad, 0, 0, 1);
   this.scene.scale(0.1, 0.01, 0.7);
   this.helix.display();
   this.scene.popMatrix();

    this.scene.pushMatrix();
   //this.scene.rotate(this.angulo*degToRad, 0, 0, 1);
   this.scene.rotate(10*degToRad, 0, 0, 1);
   this.scene.translate(0, 0.1, -0.7);
   this.scene.scale(0.1, 0.01, 0.6);
   this.helix.display();
   this.scene.popMatrix();

};
