import { Component, OnInit } from '@angular/core';
import { Cancion } from '../model/canciones';
import { CancionesService } from '../providers/canciones.service';


@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.scss']
})
export class CancionesComponent implements OnInit {

  //canciones
  canciones : Cancion[]; 
  cancionSeleccionada : Cancion;
  nombreCancion : String;
  IsValid: boolean;

  constructor( private cancionesService: CancionesService) { 
    console.log('CancionesComponent constructor');
    //inicializar atributos
    this.canciones = [];
    this.cancionSeleccionada = new Cancion(-1,"");   
    this.IsValid=false;
    this.nombreCancion="";
    //this.mockData();
  }

  ngOnInit() {
    console.log('CancionesComponent ngOnInit');
    //llamadas a los servicios
    this.recargar();
  }

  eliminar( id: number ){
    console.log(`CancionesComponent eliminar ${id}`);
    if (confirm("¿quieres eliminar la cancion?")){
      this.cancionesService.delete(id).subscribe(
        result=>{
          this.recargar();
          console.log(`Cancion eliminada` )},
        error=>{
          console.warn(`error al eliminar ${error}`);
        }
      );
    }
  }
  crearCancion(){
    console.log(`CancionesComponent crear `+ this.nombreCancion);
    this.nombreCancion=this.nombreCancion.trim();
    if (this.nombreCancion.length >0){
      this.IsValid=true;      
      console.log(`crear cancion ${this.nombreCancion}`);
      this.cancionesService.crear(this.nombreCancion).subscribe(
        result=>{
          this.nombreCancion="";
          this.recargar();
          console.log(`Cancion creada` )},
          
        error=>{
          console.warn(`error al crear %o`, error);
        }
      );

    }
    else{
      this.IsValid=false;
      console.warn(`Nombre cancion vacio o no correcta`);
    }
  }

  mockData(){
    this.canciones.push( new Cancion(1,"Macarena"));
    this.canciones.push( new Cancion(13,"Betoben"));
    this.canciones.push( new Cancion(14,"Baszilara sobre tu tumbar"));
    this.canciones.push( new Cancion(31,"La lloreona"));
    this.canciones.push( new Cancion(31,"Need a coffe"));
    this.canciones.push( new Cancion(16,"Descanso please"));
    this.canciones.push( new Cancion(1756,"Angular again o no"));
  }
  /**
   * Recarga las canciones mediante GET
   */
  recargar(){
    console.log('Canciones recargar');
    this.canciones =[];
    this.cancionesService.getAll().subscribe(
      result=>{
        console.log('response correcto %o', result);
        //let cancion: Cancion;
        if (result !=null){
          result.forEach( element => {            
            this.canciones.push( element );
          });  
        }      
      },
      error=>{
        console.warn(error);
      }
    );
  }

  modificar (index: number){
    let cancion =this.canciones[index];
    console.log ('CancionesCompoent modificar onfocusout cancion %o', cancion);
    if (cancion.nombre.trim().length>0){
      this.cancionesService.modificar(cancion).subscribe(
        result=>{        
          this.recargar();
        },error=>{
          console.warn('Error al modificar %o', error );
        }
      );
    }else{
      console.warn('Nombre cancion NO valido');
    }
  }


}
