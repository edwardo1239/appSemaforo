import {lotesDataType, stateUseReducerType} from '../types/types';

export const INITIAL_STATE: lotesDataType = {
  enf: 'N/A',
  nombre: 'N/A',
  descarteLavado: 0,
  descarteEncerado: 0,
  frutaNacional: 0,
  exportacion: 0,
  kilosVaciados: 0,
  porcentage: '0%',
  deshidratacion: 0,
  semaforo: 'Rojo',
};

export const reducer = (
  state: lotesDataType,
  action: stateUseReducerType,
): lotesDataType => {
  let porcentage;
  let deshidratacion;

  switch (action.type) {
    case 'loteVaciado':
      return {
        enf: action.data.enf || state.enf,
        nombre: action.data.nombre || state.nombre,
        kilosVaciados: action.data.kilosVaciados || state.kilosVaciados,
        descarteLavado: 0,
        descarteEncerado: 0,
        frutaNacional: 0,
        exportacion: 0,
        deshidratacion: 0,
        porcentage: '0%',
        semaforo: 'Rojo',
      };
    case 'initial':
      return {
        ...state,
        enf: action.data.enf || state.enf,
        nombre: action.data.nombre || state.nombre,
        kilosVaciados: action.data.kilosVaciados || state.kilosVaciados,
        descarteLavado: action.data.descarteLavado || state.descarteLavado,
        descarteEncerado:
          action.data.descarteEncerado || state.descarteEncerado,
        frutaNacional: action.data.frutaNacional || state.frutaNacional,
        porcentage: porcentage || state.porcentage,
        exportacion: action.data.exportacion || state.exportacion,
        deshidratacion: Number(deshidratacion) || state.deshidratacion,
      };
    case 'cambiarSemaforo':
      return {
        ...state,
        semaforo: action.data.semaforo || state.semaforo,
      };
    default:
      return state;
  }
};
