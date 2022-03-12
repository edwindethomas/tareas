const { guardarDB, leerDB } = require('./helpers/interaccionesDB');
const { 
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

const main = async () =>{
  let opt='';
  const tareas = new Tareas();

  const tareasDB = leerDB();  

  if(tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción de la tarea: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleComplete(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        const confirm =await confirmar('Estas seguro?');
        if(confirm){
          tareas.borrarTarea(id);
          console.log('Tarea borrada');
        }
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();

  } while (opt!=='0');
}

main();