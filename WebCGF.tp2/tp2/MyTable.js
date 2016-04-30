var cube;

function MyTable(scene) {
    CGFobject.call(this,scene);	
	cube = new MyUnitCubeQuad(scene);
};

MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

    this.scene.pushMatrix();
    this.scene.translate(0,3.65,0);
    this.scene.scale(5,.3,3);    
    cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.75,-1.35);
    this.scene.scale(.3,3.5,.3);
    cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.75,1.35);
    this.scene.scale(.3,3.5,.3);
    cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.75,-1.35);
    this.scene.scale(.3,3.5,.3);
    cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.75,1.35);
    this.scene.scale(.3,3.5,.3);
    cube.display();
    this.scene.popMatrix();

};
