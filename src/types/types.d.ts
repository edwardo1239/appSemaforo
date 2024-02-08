export type lotesDataType = {
    enf: string;
    nombre: string;
    descarteLavado: number;
    descarteEncerado: number;
    frutaNacional: number;
    exportacion: number;
    kilosVaciados: number;
    porcentage: string;
    deshidratacion: number;
    semaforo: 'Verde' | 'Rojo';
  };
  
  export type dataArrayType = [
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    'Verde' | 'Rojo',
  ];

  export type stateUseReducerType = {
    type: string,
    data: newDataType
  }

  export type newDataType  = {

    enf?: string;
    nombre?: string;
    descarteLavado?: number;
    descarteEncerado?: number;
    frutaNacional?: number;
    exportacion?: number;
    kilosVaciados?: number;
    porcentage?:string;
    deshidratacion?: number;
    semaforo?: 'Verde' | 'Rojo';
  

  }
  
export type dataExpType  = {
  exportacion:{
    [key: string] : contenedorExporType
  }
}

export type contenedorExporType = {
  [key: string]: number,
  calidad1: number,
  calidad1_5: number
}

export type serverResponse = {
  data:data
  satatus:number
}

interface data {
  descartes:descartes
  infoLotes:infoLotes
  exportacion:any
}

interface descartes {
  descarteEncerado:any
  descarteLavado:any
  frutaNacional:number
}

interface descarteLavado {
  descarteGeneral:number
  pareja:number
  balin:number
  descompuesta:number
  hojas:number
  piel:number
}
interface descarteEncerado {
  descarteGeneral:number
  pareja:number
  balin:number
  extra:numb
  descompuesta:number
  suelo:number
}

interface infoLotes {
  enf:string
  kilosVaciados:number
  nombreLote:string
  tipoFruta:string
  deshidrate:number

}