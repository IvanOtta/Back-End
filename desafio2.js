const fs = require("fs");

class Contenedor {
  constructor(nameOfFile) {
    this.nameOfFile = "./" + nameOfFile + ".json";
  }

  async getData() {
    try {
      return await fs.promises.readFile(this.nameOfFile, "utf-8");
    } catch (error) {
      if (error.code == "ENOENT") {
        fs.promises.writeFile(this.nameOfFile, "[]", (error) => {
          if (error) {
            console.log("no pudo ser creado ", error);
          }
        });
      }
    }
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }

  async save(objeto) {
    try {
      let data = await this.getData();
      let contentJSON = JSON.parse(data);
      let arr = [];
      const indice = contentJSON.map((obj) => obj.id).sort();
      objeto.id = indice[indice.length - 1] + 1;

      if (!objeto.id) {
        objeto.id = 1;
        arr = [{ id: 1, ...objeto }];
        await fs.promises.writeFile(this.nameOfFile, JSON.stringify(arr));
        return arr[0].id;
      }
      contentJSON.push(objeto);

      await fs.promises.writeFile(this.nameOfFile, JSON.stringify(contentJSON));
    } catch (error) {
      console.log("no se pudo guardar");
    }
  }


  async deleteById(id){
    try {
      const data = await this.getData()
      const dataJSON = JSON.parse(data)
      if(dataJSON.some(el => el.id === id)){
        let obj = dataJSON.find(el => el.id === id)
        let objPos = dataJSON.indexOf(obj)
        dataJSON.splice(objPos, 1)
        fs.promises.writeFile(this.nameOfFile, JSON.stringify(dataJSON, null, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }


  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nameOfFile, JSON.stringify([]));
      console.log("se borro el contenido");
    } catch (error) {
      console.log(error);
    }
  }
}

const objectPers = {
  id: 1,
  nombre: "Ivan",
  apellido: "Otta",
};

const object1 = new Contenedor("file");

object1.getData();
object1.save(objectPers);
object1.deleteById(2);
// object1.deleteAll()

