 var degToRad = Math.PI / 180.0;
 var time = 0;
 var lastTime = 0;

function MyDrone(scene, slices, stacks)
{
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

   this.droneAppearance = new CGFappearance(scene);
   this.droneAppearance.setDiffuse(1, 1, 1, 1);
   this.droneAppearance.setSpecular(1, 1, 1, 1);
   this.droneAppearance.setAmbient(1, 1, 1, 1);
   this.droneAppearance.setShininess(100);
    

    this.xpos = 8;
    this.zpos = 8;
    this.ypos = 5;
    this.rotate = Math.PI+Math.PI/7;
    this.rotateSpeedForward  = 1;
    this.rotateSpeedBackward = 1;
    this.rotateSpeeRight     = 1;
    this.rotateSpeedLeft     = 1;

    this.bodycylinder = new MyCylinder(scene, slices, stacks);
    this.bodycylinder.initBuffers();

    this.body = new MyHalfSphere(scene, slices, stacks);
    this.body.initBuffers();

    this.wingcylinder = new MyCylinder(scene, slices, stacks);
    this.wingcylinder.initBuffers();

    this.dronelegs = new MyDroneLegs(scene, slices, stacks);
    this.dronelegs.initBuffers();

    this.dronelegscylinder = new MyCylinder(scene,stacks, slices);
    this.dronelegscylinder.initBuffers();

    //helixes
    this.helix = new MyDroneHelix(scene, stacks, slices, 0);
    this.helix.initBuffers();


   this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;


MyDrone.prototype.moveForward  = function(speed)
{  
    this.zpos += speed*Math.cos(this.rotate)/14;
    this.xpos += speed*Math.sin(this.rotate)/14;
     if(this.zpos < 2){
        this.zpos = 2;
    } else if(this.zpos > 13){
        this.zpos = 13;
    }
    if(this.xpos < 2){
        this.xpos = 2;
    } else if(this.xpos > 13){
        this.xpos = 13;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveBackward = function(speed)
{   
    this.zpos -= speed*Math.cos(this.rotate)/14;
    this.xpos -= speed*Math.sin(this.rotate)/14;
    if(this.zpos < 2){
        this.zpos = 2;
    } else if(this.zpos > 13){
        this.zpos = 13;
    }
    if(this.xpos < 2){
        this.xpos = 2;
    } else if(this.xpos > 13){
        this.xpos = 13;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveUp = function(speed)
{   
    this.ypos += speed*Math.cos(this.rotate)/14;
    if(this.ypos > 8){
        this.ypos = 8;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveDown = function(speed)
{   
    this.ypos -= speed*Math.cos(this.rotate)/14;
    if(this.ypos < 1.2) {
    this.ypos = 1.2;
    }
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
    this.helix1.setAngle(currTime)
};

MyDrone.prototype.display = function()
{ 
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1, 4);
    this.scene.translate(0, -1, -0.5);
    this.bodycylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(90*degToRad, 0, 1, 0);
    this.scene.translate(0, -0.1, -2);
    this.scene.scale(0.1, 0.1, 4);
    this.bodycylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180*degToRad, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.body.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, -0.6);
    this.scene.rotate(90*degToRad, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, 0.4);
    this.scene.rotate(90*degToRad, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(-this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();   

    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(-this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();
};


MyDrone.prototype.update = function(currTime)
{
      this.helix.setAngle(currTime * 360/1000);
};


MyDrone.prototype.setUpdatePeriod = function(value)
 {
   this.updatePeriod = value;  
 };
