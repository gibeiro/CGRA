/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.indices = [];
	this.normals = [];

	var stack_h = 1 / this.stacks;

	//BASE INFERIOR
	//gerar os vertices da base
	for(i = 0; i < this.slices; i++){
		this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),0);
		this.normals.push(0,0,-1);
	}

	//gerar os triangulos da base
	for(i = 0; i < this.slices - 2; i++){
		//poligono de n lado é decomposto em n-2 triangulos
		this.indices.push(0,i+1,i+2);
	}

	//CORPO
	//gerar os vertices das faces
	for(i = 0; i < this.stacks + 1; i++){
		for(j = 0; j < this.slices; j++){

			this.vertices.push(Math.sin(j*Math.PI*2/this.slices),Math.cos(j*Math.PI*2/this.slices),i*stack_h);
			this.vertices.push(Math.sin((j+1)*Math.PI*2/this.slices),Math.cos((j+1)*Math.PI*2/this.slices),i*stack_h);

			//normais perpendiculares ao rectangulo
			this.normals.push(Math.sin((j+.5)*Math.PI*2/this.slices),Math.cos((j+.5)*Math.PI*2/this.slices),0);
			this.normals.push(Math.sin((j+.5)*Math.PI*2/this.slices),Math.cos((j+.5)*Math.PI*2/this.slices),0);

		}
	}

	//gerar triagulos das faces
	for(i = this.slices; i - this.slices < this.stacks*this.slices*2; i += 2){

			this.indices.push(i + 1, i, i + this.slices*2);
			this.indices.push(i + 1, i + this.slices*2, i + this.slices*2 + 1);

	}

//BASE SUPERIOR
//gerar os vertices da base
for(i = 0; i < this.slices; i++){
	this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),1);
	this.normals.push(0,0,1);
}

//gerar os triangulos da base
for(i = 0; i < this.slices - 2; i++){
	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(this.slices*(3 + 2*this.stacks) + i + 2, this.slices*(3 + 2*this.stacks) + i + 1,this.slices*(3 + 2*this.stacks));
}

/* VERSAO COM VERTICES REDUNDANTES
//BASE INFERIOR
for(i = 0; i < this.slices; i++){
	this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),0);
	this.normals.push(0,0,-1);
}

for(i = 0; i < this.slices - 2; i++){
	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(0,i+1,i+2);
}

//CORPO
for(i = 0; i < this.stacks; i++){
	for(j = 0; j < this.slices; j++){

		//4 vertices de um rectangulo correspondente a uma face
		this.vertices.push(Math.sin(j*Math.PI*2/this.slices),Math.cos(j*Math.PI*2/this.slices),i*stack_h);
		this.vertices.push(Math.sin(j*Math.PI*2/this.slices),Math.cos(j*Math.PI*2/this.slices),(i+1)*stack_h);
		this.vertices.push(Math.sin((j+1)*Math.PI*2/this.slices),Math.cos((j+1)*Math.PI*2/this.slices),i*stack_h);
		this.vertices.push(Math.sin((j+1)*Math.PI*2/this.slices),Math.cos((j+1)*Math.PI*2/this.slices),(i+1)*stack_h);

		//normais perpendiculares ao rectangulo
		this.normals.push(Math.sin((j+.5)*Math.PI*2/this.slices),Math.cos((j+.5)*Math.PI*2/this.slices),0);
		this.normals.push(Math.sin((j+.5)*Math.PI*2/this.slices),Math.cos((j+.5)*Math.PI*2/this.slices),0);
		this.normals.push(Math.sin((j+1.5)*Math.PI*2/this.slices),Math.cos((j+1.5)*Math.PI*2/this.slices),0);
		this.normals.push(Math.sin((j+1.5)*Math.PI*2/this.slices),Math.cos((j+1.5)*Math.PI*2/this.slices),0);

		//2 triangulos que formam o rectangulo
		this.indices.push(this.slices + j*4 + i*4*this.slices, this.slices + j*4+ i*4*this.slices+ 1, this.slices + j*4+ i*4*this.slices+ 2);
		this.indices.push(this.slices + j*4+ i*4*this.slices + 3, this.slices + j*4+ i*4*this.slices+ 2, this.slices + j*4+ i*4*this.slices+ 1);
				
		}
}

//BASE SUPERIOR
for(i = 0; i < this.slices; i++){
	this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),1);
	this.normals.push(0,0,1);
}

for(i = 0; i < this.slices - 2; i++){
	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(this.slices*(1 + 4*this.stacks) + i + 2,this.slices*(1 + 4*this.stacks) + i+1,this.slices*(1 + 4*this.stacks));
}
*/
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
