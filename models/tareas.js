const Tarea = require("./tarea");
require('colors');

class Tareas {

  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach(key=>{
      listado.push(this._listado[key]);
    })
    return listado;
  }

  constructor () {
    this._listado = {};
  }

  borrarTarea(id='') {
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas=[]) {
    tareas.forEach(tarea=>{
      this._listado[tarea.id] = tarea;
    })
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea,ind)=>{
      const {desc,completadoEn} = tarea;
      const i = `${ind+1}`.green;
      const status = completadoEn ?'Completada'.green:'Pendiente'.red;
      console.log(`${i} ${desc} ${'::'.cyan} ${status}`);
    })
  }

  listarPendientesCompletadas(tipo=true) {
    let lisFil;
    if(tipo) lisFil = this.listadoArr.filter(tarea=> tarea.completadoEn)
    else lisFil = this.listadoArr.filter(tarea=> !tarea.completadoEn)
    
    lisFil.forEach((tareas,ind)=>{
      const {desc,completadoEn} = tareas;
      const i = `${ind+1}`.green;
      console.log(`${i} ${desc} ${'::'.cyan} ${completadoEn?completadoEn.green : 'Pendiente'.red}`);
    })
  }

toggleComplete(ids=[]) {
  ids.forEach(id=>{
    const tarea = this._listado[id];
    if(!tarea.completadoEn) {
      tarea.completadoEn = new Date().toISOString();
    }
  });
  this.listadoArr.forEach(tar=>{
    if(!ids.includes(tar.id)){
      this._listado[tar.id].completadoEn = null;
    }
  })
}

}

module.exports = Tareas;