function MyDroneHelix(scene, stacks, slices)
{
    CGFobject.call(this, scene);
    this.angle = 1;

    this.scene = scene;
    this.stacks = stacks;
    this.slices = slices;

    this.helix = new MyCylinder(scene, stacks, slices)
    this.helix.initBuffers();
    
    this.initBuffers();
};

MyDroneHelix.prototype = Object.create(CGFobject.prototype);
MyDroneHelix.prototype.constructor = MyDroneHelix;

MyDroneHelix.prototype.setAngle = function(angulo)
{
    this.angle = angulo;
};


MyDroneHelix.prototype.display = function()
{
    this.scene.pushMatrix();
    this.helix.display();
    this.scene.popMatrix();
};
