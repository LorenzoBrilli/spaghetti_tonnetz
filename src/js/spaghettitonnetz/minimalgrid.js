// --------------- MINIMAL GRID CLASS --------------------

function MinimalGrid() {

    this.updateRequired = true;
    this.redrawRequired = true;
    this.gb = createGraphics(1200*scl,619*scl);
    this.ghostQueue = [];

    // ------------- NOTES ----------------
    // create notes and set positions
    this.notes = [];

    this.notes.push(new Note("C",0,0));          //0
    this.notes.push(new Note("G",200,0));        //1
    this.notes.push(new Note("D",400,0));        //2
    this.notes.push(new Note("A",600,0));        //3
    this.notes.push(new Note("E",800,0));        //4
    this.notes.push(new Note("E",100,173));      //5
    this.notes.push(new Note("B",300,173));      //6
    this.notes.push(new Note("F#",500,173));     //7
    this.notes.push(new Note("C#",700,173));     //8
    this.notes.push(new Note("G#",900,173));     //9
    this.notes.push(new Note("G#",200,346));     //10
    this.notes.push(new Note("D#",400,346));     //11
    this.notes.push(new Note("A#",600,346));     //12
    this.notes.push(new Note("F",800,346));      //13
    this.notes.push(new Note("C",1000,346));     //14
    this.notes.push(new Note("C",300,519));      //15
    this.notes.push(new Note("G",500,519));      //16    
    this.notes.push(new Note("D",700,519));      //17
    this.notes.push(new Note("A",900,519));      //18
    this.notes.push(new Note("E",1100,519));     //19


    // ------------- CONNECTIONS ----------------
    // create connections and bind to relative notes

    this.connections = [];

    this.connections.push(new Connection(this.notes[0],this.notes[1]));
    this.connections.push(new Connection(this.notes[1],this.notes[2]));
    this.connections.push(new Connection(this.notes[2],this.notes[3]));
    this.connections.push(new Connection(this.notes[3],this.notes[4]));

    this.connections.push(new Connection(this.notes[5],this.notes[6]));
    this.connections.push(new Connection(this.notes[6],this.notes[7]));
    this.connections.push(new Connection(this.notes[7],this.notes[8]));
    this.connections.push(new Connection(this.notes[8],this.notes[9]));

    this.connections.push(new Connection(this.notes[10],this.notes[11]));
    this.connections.push(new Connection(this.notes[11],this.notes[12]));
    this.connections.push(new Connection(this.notes[12],this.notes[13]));
    this.connections.push(new Connection(this.notes[13],this.notes[14]));

    this.connections.push(new Connection(this.notes[15],this.notes[16]));
    this.connections.push(new Connection(this.notes[16],this.notes[17]));
    this.connections.push(new Connection(this.notes[17],this.notes[18]));
    this.connections.push(new Connection(this.notes[18],this.notes[19]));

    this.connections.push(new Connection(this.notes[0],this.notes[5]));
    this.connections.push(new Connection(this.notes[1],this.notes[6]));
    this.connections.push(new Connection(this.notes[2],this.notes[7]));
    this.connections.push(new Connection(this.notes[3],this.notes[8]));
    this.connections.push(new Connection(this.notes[4],this.notes[9]));

    this.connections.push(new Connection(this.notes[5],this.notes[10]));
    this.connections.push(new Connection(this.notes[6],this.notes[11]));
    this.connections.push(new Connection(this.notes[7],this.notes[12]));
    this.connections.push(new Connection(this.notes[8],this.notes[13]));
    this.connections.push(new Connection(this.notes[9],this.notes[14]));

    this.connections.push(new Connection(this.notes[10],this.notes[15]));
    this.connections.push(new Connection(this.notes[11],this.notes[16]));
    this.connections.push(new Connection(this.notes[12],this.notes[17]));
    this.connections.push(new Connection(this.notes[13],this.notes[18]));
    this.connections.push(new Connection(this.notes[14],this.notes[19]));

    this.connections.push(new Connection(this.notes[1],this.notes[5]));
    this.connections.push(new Connection(this.notes[2],this.notes[6]));
    this.connections.push(new Connection(this.notes[3],this.notes[7]));
    this.connections.push(new Connection(this.notes[4],this.notes[8]));

    this.connections.push(new Connection(this.notes[6],this.notes[10]));
    this.connections.push(new Connection(this.notes[7],this.notes[11]));
    this.connections.push(new Connection(this.notes[8],this.notes[12]));
    this.connections.push(new Connection(this.notes[9],this.notes[13]));

    this.connections.push(new Connection(this.notes[11],this.notes[15]));
    this.connections.push(new Connection(this.notes[12],this.notes[16]));
    this.connections.push(new Connection(this.notes[13],this.notes[17]));
    this.connections.push(new Connection(this.notes[14],this.notes[18]));


    // ------------- TRIANGLES ----------------
    // create triangles and bind to relative notes

    this.triangles = [];

    this.triangles.push(new Tri(this.notes[0],this.notes[1],this.notes[5]));
    this.triangles.push(new Tri(this.notes[1],this.notes[2],this.notes[6]));
    this.triangles.push(new Tri(this.notes[2],this.notes[3],this.notes[7]));
    this.triangles.push(new Tri(this.notes[3],this.notes[4],this.notes[8]));

    this.triangles.push(new Tri(this.notes[5],this.notes[6],this.notes[1]));
    this.triangles.push(new Tri(this.notes[6],this.notes[7],this.notes[2]));
    this.triangles.push(new Tri(this.notes[7],this.notes[8],this.notes[3]));
    this.triangles.push(new Tri(this.notes[8],this.notes[9],this.notes[4]));

    this.triangles.push(new Tri(this.notes[5],this.notes[6],this.notes[10]));
    this.triangles.push(new Tri(this.notes[6],this.notes[7],this.notes[11]));
    this.triangles.push(new Tri(this.notes[7],this.notes[8],this.notes[12]));
    this.triangles.push(new Tri(this.notes[8],this.notes[9],this.notes[13]));

    this.triangles.push(new Tri(this.notes[10],this.notes[11],this.notes[6]));
    this.triangles.push(new Tri(this.notes[11],this.notes[12],this.notes[7]));
    this.triangles.push(new Tri(this.notes[12],this.notes[13],this.notes[8]));
    this.triangles.push(new Tri(this.notes[13],this.notes[14],this.notes[9]));

    this.triangles.push(new Tri(this.notes[10],this.notes[11],this.notes[15]));
    this.triangles.push(new Tri(this.notes[11],this.notes[12],this.notes[16]));
    this.triangles.push(new Tri(this.notes[12],this.notes[13],this.notes[17]));
    this.triangles.push(new Tri(this.notes[13],this.notes[14],this.notes[18]));

    this.triangles.push(new Tri(this.notes[15],this.notes[16],this.notes[11]));
    this.triangles.push(new Tri(this.notes[16],this.notes[17],this.notes[12]));
    this.triangles.push(new Tri(this.notes[17],this.notes[18],this.notes[13]));
    this.triangles.push(new Tri(this.notes[18],this.notes[19],this.notes[14]));


    // ------------- UPDATE ----------------

    //update note based on key pressed
    this.updateNote = function (key,pressed) {
        for (let i = 0; i < this.notes.length; i++){
            if(this.notes[i].value == key){
                this.notes[i].update(pressed);
                this.updateRequired = true;
            }
        }
        if (this.updateRequired) this.update();
    }


    //update triangles and connections
    this.update = function () { 
        for (let i = 0; i < this.triangles.length; i++){
          this.triangles[i].update();
        }
        for (let i = 0; i < this.connections.length; i++){
          this.connections[i].update();
        }
        this.updateRequired = false;
        this.redrawRequired = true;
    }

    //update all the ghost state
    this.updateGhost = function () {
        let nowMillis = millis();
        for (let i = 0; i < this.ghostQueue.length; i++){         
            if (nowMillis - this.ghostQueue[i][1] > ghostTimeout){
                this.ghostQueue[i][0].isGhost = false;
                this.ghostQueue.splice(i,1); //remove item from array
                i--; //decrement i because of the removed item
                this.redrawRequired = true;
            }
        }
    }

    
    // ------------- DRAW ----------------

    //draw the minimal grid to custom graphics buffer
    //this is used to calculate the graphics only once
    this.drawBuffer = function () {
        this.gb.resizeCanvas(1200*scl,619*scl);
        this.gb.clear();
        //set font
        this.gb.textFont(fontRegular);
        this.gb.textAlign(CENTER,CENTER);
      
        this.gb.strokeWeight(scl * 3);
        this.gb.translate(50*scl,50*scl);

        for (let i = 0; i < this.triangles.length; i++){
            this.triangles[i].draw(this.gb);
        }
        for (let i = 0; i < this.connections.length; i++){
            this.connections[i].draw(this.gb);
        }
        for (let i = 0; i < this.notes.length; i++){
            this.notes[i].draw(this.gb);
        }
        this.redrawRequired = false;
    }

}