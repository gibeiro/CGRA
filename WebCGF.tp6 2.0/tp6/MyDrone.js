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
    this.rotateSpeedFront  = 1;
    this.rotateSpeedBack   = 1;
    this.rotateSpeedRigh   = 1;
    this.rotateSpeedLeft   = 1;
    this.hookx = 1;
    this.hooky = 1;
    this.hookz = 1;
    this.tiltFront = 0;
    this.ropeLength = -0.5;

    this.bodycylinderAppearance = new CGFappearance(this.scene);
    this.bodycylinderAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.bodycylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.bodycylinderAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.bodycylinderAppearance.setShininess(5);
    //this.bodycylinderAppearance.loadTexture("../resources/images/ferrolho.png");

    this.bodyAppearance = new CGFappearance(this.scene);
    this.bodyAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.bodyAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.bodyAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.bodyAppearance.setShininess(5);
    //this.bodyAppearance.loadTexture("../resources/images/ferrolho.png");

    this.wingcylinderAppearance = new CGFappearance(this.scene);
    this.wingcylinderAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.wingcylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.wingcylinderAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.wingcylinderAppearance.setShininess(5);
    //this.wingcylinderAppearance.loadTexture("../resources/images/ferrolho.png");

    this.dronelegsAppearance = new CGFappearance(this.scene);
    this.dronelegsAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.dronelegsAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.dronelegsAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.dronelegsAppearance.setShininess(5);
    //this.dronelegsAppearance.loadTexture("../resources/images/ferrolho.png");

    this.dronelegscylinderAppearance = new CGFappearance(this.scene);
    this.dronelegscylinderAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.dronelegscylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.dronelegscylinderAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.dronelegscylinderAppearance.setShininess(5);
  //this.dronelegscylinderAppearance.loadTexture("../resources/images/ferrolho.png");

    
    this.hookAppearance = new CGFappearance(this.scene);
    this.hookAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.hookAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.hookAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.hookAppearance.setShininess(5);
   // this.hookAppearance.loadTexture("../resources/images/ferrolho.png");

    this.helixAppearance = new CGFappearance(this.scene);
    this.helixAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.helixAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.helixAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.helixAppearance.setShininess(5);
    //this.helixAppearance.loadTexture("../resources/images/ferrolho.png");

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

    this.hook = new MyHook(scene, stacks, slices);
    this.hook.initBuffers();

    //helixes
    this.helix = new MyDroneHelix(scene, stacks, slices, 0);
    this.helix.initBuffers();


   this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.moveHookUp = function(speed)
{
    this.ropeLength += speed/32;
    this.hookx = this.xpos;
    this.hooky = this.ypos - this.ropeLength;
    this.hookz = this.zpos;
    console.log("ropeLength: %f | posx: %f | posy: %f | posz: %f ", this.ropeLength, this.xpos, this.ypos, this.zpos);
    console.log("hookx: %f | hooky: %f | hookz: %f",this.hookx,this.hooky,this.hookz);
    if(this.ropeLength > this.ypos-0.2){
        this.ropeLength = this.ypos-0.2;
    }       
};

MyDrone.prototype.moveHookDown = function(speed)
{
    this.ropeLength -= speed/32;
    this.hookx = this.xpos;
    this.hooky = this.ypos + this.ropeLength;
    this.hookz = this.zpos;
    console.log("ropeLength: %f | posx: %f | posy: %f | posz: %f ", this.ropeLength, this.xpos, this.ypos, this.zpos);
    console.log("hookx: %f | hooky: %f | hookz: %f",this.hookx,this.hooky,this.hookz);
    if(this.ropeLength < -0.5){
        this.ropeLength = -0.5;
    }
};


MyDrone.prototype.moveForward  = function(speed)
{  
    this.zpos += speed*Math.cos(this.rotate)/14;
    this.xpos += speed*Math.sin(this.rotate)/14;
    this.rotateSpeedBack  *= speed;
    this.rotateSpeedFront *= 0.5;
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
    this.rotateSpeedBack  *= 0.5;
    this.rotateSpeedFront *= speed;
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
    this.ypos += speed*Math.cos(this.rotate)/12;
    this.rotateSpeedFront *= speed;
    this.rotateSpeedBack  *= speed;
    this.rotateSpeedLeft  *= speed;
    this.rotateSpeedRight *= speed;
    if(this.ypos > 8){
        this.ypos = 8;
    }
    if(this.ypos < 1.2) {
    this.ypos = 1.2;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveDown = function(speed)
{   
    this.ypos -= speed*Math.cos(this.rotate)/12;
    this.rotateSpeedFront *= 0.5;
    this.rotateSpeedBack  *= 0.5;
    this.rotateSpeedLeft  *= 0.5;
    this.rotateSpeedRight *= 0.5;
    if(this.ypos < 1.2) {
    this.ypos = 1.2;
    }
    if(this.ypos > 8){
        this.ypos = 8;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.rotateLeft = function(speed)
{
 
    this.rotate += speed*degToRad;
    this.rotateSpeedBack  *= 0.5;
    this.rotateSpeedFront *= 0.5;
    this.rotateSpeedLeft  *= speed;
    this.rotateSpeedRight *= speed;
    if(this.rotate >= 2*Math.PI)
        this.rotate %= 2*Math.PI;

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);

};

MyDrone.prototype.rotateRight = function(speed)
{
    this.rotate -= speed*degToRad;
    this.rotateSpeedBack  *= (1/2);
    this.rotateSpeedFront *= (1/2);
    this.rotateSpeedLeft  *= speed;
    this.rotateSpeedRight *= speed;

    if(this.rotate < 0)
        this.rotate += 2*Math.PI;    

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.releaseForwardBackward = function()
{
  this.rotateSpeedFront = 1;
  this.rotateSpeedBack  = 1;  
};

MyDrone.prototype.releaseRotate = function()
{
  this.rotateSpeedFront = 1;
  this.rotateSpeedBack  = 1;
  this.rotateSpeedLeft  = 1;
  this.rotateSpeedRight = 1;  
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
    this.bodycylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1, 4);
    this.scene.translate(0, -1, -0.5);
    this.bodycylinder.display();
    this.scene.popMatrix();

    this.bodycylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.rotate(90*degToRad, 0, 1, 0);
    this.scene.translate(0, -0.1, -2);
    this.scene.scale(0.1, 0.1, 4);
    this.bodycylinder.display();
    this.scene.popMatrix();

    this.bodyAppearance.apply();
    this.scene.pushMatrix();
    this.scene.rotate(180*degToRad, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.body.display();
    this.scene.popMatrix();

    this.wingcylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.wingcylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.wingcylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();

    this.wingcylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(90*degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder.display();
    this.scene.popMatrix();
    
    this.dronelegsAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, -0.6);
    this.scene.rotate(90*degToRad, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs.display();
    this.scene.popMatrix();

    this.dronelegsAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, 0.4);
    this.scene.rotate(90*degToRad, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs.display();
    this.scene.popMatrix();

    this.dronelegsAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(-1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder.display();
    this.scene.popMatrix();

    this.dronelegscylinderAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder.display();
    this.scene.popMatrix();

    this.helixAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(this.rotateSpeedFront*this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();

    this.helixAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(-this.rotateSpeedLeft*this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();   

    this.helixAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(-this.rotateSpeedRight*this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();

    this.helixAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(this.rotateSpeedBack*this.helix.angulo*degToRad, 0, 1, 0);
    this.helix.display();
    this.scene.popMatrix();

    this.hookAppearance.apply();
    this.scene.pushMatrix();
    this.hook.display(this.ropeLength);
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
