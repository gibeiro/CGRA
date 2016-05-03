 var degToRad = Math.PI / 180.0;
 var time = 0;
 var lastTime = 0;

function MyDrone(scene)
{
    CGFobject.call(this, scene);

   this.droneAppearance = new CGFappearance(scene);
   this.droneAppearance.setDiffuse(1, 1, 1, 1);
   this.droneAppearance.setSpecular(1, 1, 1, 1);
   this.droneAppearance.setAmbient(1, 1, 1, 1);
   this.droneAppearance.setShininess(100);
    

    this.xpos = 0;
    this.zpos = 0;

    this.ypos = 4;
    
    this.rotate = 0;

   this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.initBuffers = function()
{
    this.vertices = [
    .5,.3,-.4,
    -.5,.3,-.4,
    0,.3,1.6
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
/*
MyDrone.prototype.update = function(){
    console.log("drone.display()");
    this.materialDefault.apply();
    this.scene.pushMatrix();   
    this.scene.rotate(this.rotate, 0, 1, 0);
	this.scene.translate(this.xpos, this.ypos, this.zpos);
	this.scene.popMatrix();
	this.moved = 0;
};
*/
MyDrone.prototype.moveForward  = function(speed)
{  
    this.zpos += speed*Math.cos(this.rotate);
    this.xpos += speed*Math.sin(this.rotate);
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveBackward = function(speed)
{   
    this.zpos -= speed*Math.cos(this.rotate);
    this.xpos -= speed*Math.sin(this.rotate);
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.rotateLeft = function(speed)
{
 
    this.rotate += speed*degToRad;

    if(this.rotate >= 2*Math.PI)
        this.rotate %= 2*Math.PI;

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);

};

MyDrone.prototype.rotateRight = function(speed)
{
    this.rotate -= speed*degToRad;

    if(this.rotate < 0)
        this.rotate += 2*Math.PI;    

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.draw = function(scene){

    this.droneAppearance.apply();

    scene.pushMatrix();

    scene.rotate(this.rotate,0,1,0);

    var tmpz = (Math.cos(this.rotate)*this.zpos + Math.sin(this.rotate)*this.xpos)/
               (Math.pow(Math.sin(this.rotate),2) + Math.pow(Math.cos(this.rotate),2));

    var tmpx = -(Math.sin(this.rotate)*this.zpos - Math.cos(this.rotate)*this.xpos)/
               (Math.pow(Math.sin(this.rotate),2) + Math.pow(Math.cos(this.rotate),2));               
/*
    //vetor diretor da orientação do drone
    var v = [Math.cos(this.rotate),Math.sin(this.rotate)];

    //vetor posição do drone
    var x = [this.xpos,this.zpos];

    //vetor da projeção do vetor x na reta formada por v
    var proj = 
             [
             (x[0]*v[0]+x[1]*v[1])*v[0]/(Math.pow(v[0],2)+Math.pow(v[1],2)),
             (x[0]*v[0]+x[1]*v[1])*v[1]/(Math.pow(v[0],2)+Math.pow(v[1],2)) 
             ];

    //vetor proj-x
    var dist = [proj[0]-x[0],proj[1]-x[1]];

    var tmpx = Math.sqrt(Math.pow(dist[0],2)+Math.pow(dist[1],2));
    var tmpz = Math.sqrt(Math.pow(proj[0],2)+Math.pow(proj[1],2));

    if(this.rotate >= 0 && this.rotate < Math.PI/2){
       // tmpz = - tmpz;
        tmpx = - tmpx;
    }
    else  if(this.rotate >= Math.PI/2 && this.rotate < Math.PI){
        tmpz = - tmpz;
        tmpx = - tmpx;
    }
    else if(this.rotate >= Math.PI && this.rotate < 3*Math.PI/2){
        tmpz = - tmpz;
    }
*/
    scene.translate(tmpx,this.ypos,tmpz);

    /*
     this.tmp_rot = this.rotate;

     while(this.tmp_rot >= Math.PI/2)
         this.tmp_rot %= Math.PI/2;     

    if(this.xpos != 0 && this.zpos != 0)
        this.tmp_rot += Math.abs(Math.atan(this.xpos/this.zpos));       
    
    this.tmp_rad = Math.sqrt(Math.pow(this.xpos,2)+Math.pow(this.zpos,2));

    this.tmpx = Math.sin(this.tmp_rot)*this.tmp_rad;
    this.tmpz = Math.cos(this.tmp_rot)*this.tmp_rad;   

    scene.translate(this.tmpx,this.ypos,this.tmpz);
    */

    this.display();

    scene.popMatrix();
};

MyDrone.prototype.update = function(currTime)
{
    
};
