 var degToRad = Math.PI / 180.0;
 var time = 0;
 var lastTime = 0;

function MyDrone(scene)
{
    CGFobject.call(this, scene);

    this.xpos = -6;
    this.ypos = 4;
    this.zpos = -10;
    this.rotate = -2*Math.PI/3-Math.PI/4;
    
    this.leftrotate = -2*Math.PI/3-Math.PI/4;
    this.rightrotate = 0;

    this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.initBuffers = function()
{
    this.vertices = [
    .5,.3,0,
    -.5,.3,0,
    0,.3,2
    ];
    this.indices = [
    0,1,2,
    2,1,0
    ];
    this.normals = [
    0,0,1,
    0,0,1,
    0,0,1
    ];   

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyDrone.prototype.moveForward  = function(speed)
{
   /*
   time = ((currTime - lastTime)/1000);
   this.distance = speed*time;
   this.xpos += distance;
   lastTime = currTime;
   */
   this.xpos += 0.50;
};

MyDrone.prototype.moveBackward = function(speed)
{
    /*
    time = ((currTime - lastTime)/1000);
    this.distance = speed*time;
    this.xpos -= distance;
    lastTime = currTime;
    */
    this.xpos -= 0.50;
};

MyDrone.prototype.rotateLeft = function(speed)
{
    this.rotate -= (speed*degToRad);
};

MyDrone.prototype.rotateRight = function(speed)
{
    this.rotate += (speed*degToRad);
};

MyDrone.prototype.moveUp = function(speed)
{
    /*
   time = ((currTime - lastTime)/1000);
   this.distance = speed*time;
   this.zpos += this.distance;
   lastTime = currTime;
   */
   this.zpos += 0.50;
};

MyDrone.prototype.moveDown = function(speed)
{
   /*
   time = ((currTime - lastTime)/1000);
   this.distance = speed*time;
   this.zpos -= distance;
   lastTime = currTime;
   */
   this.zpos -= 0.50;
};


MyDrone.prototype.update = function(currTime)
{
    
};
