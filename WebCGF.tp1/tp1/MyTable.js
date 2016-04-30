/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube = new MyUnitCubeQuad(this);
	
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function(){

	
} 