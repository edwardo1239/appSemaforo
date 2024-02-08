import React, {
  useEffect,
  useReducer,
  useState,
} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {io} from 'socket.io-client';
import {
  dataExpType,
  lotesDataType,
  newDataType,
  serverResponse,
  stateUseReducerType,
} from '../types/types';
import {INITIAL_STATE, reducer} from '../functions/reducer';

const socket = io('ws://192.168.0.172:3000/');

export default function Body() {
  const [satate, dispatch] = useReducer<
    React.Reducer<lotesDataType, stateUseReducerType>
  >(reducer, INITIAL_STATE);

  const [semaforo, setSemaforo] = useState<'Rojo' | 'Verde'>('Rojo');
  const [deshidrate, setDeshidrate] = useState<number>(2);


  //useeffect que tiene los eventos del servidor
  useEffect(() => {
    //recibe cuando se vacia el lote
    socket.on('loteVaciando', infoLote => {

      const newDataLote: newDataType = {
        enf: infoLote.enf,
        nombre: infoLote.nombreLote,
        kilosVaciados: infoLote.kilosVaciados,
      };
      dispatch({type: 'loteVaciado', data: newDataLote});
    });
    socket.emit('obtenerSemaforoInicial','request', (serverResponse: serverResponse) => {
      console.log(serverResponse)
        const kilos: number = sumarExportacion(serverResponse.data)
        const descarteEncerado = Object.keys(
          serverResponse.data.descartes.descarteEncerado,
        ).reduce(
          (acu, descarte) =>
            (acu +=
              serverResponse.data.descartes.descarteEncerado[
                descarte as keyof typeof serverResponse.data.descartes.descarteEncerado
              ]),
          0,
        );
        const descarteLavado = Object.keys(
          serverResponse.data.descartes.descarteLavado,
        ).reduce(
          (acu, descarte) =>
            (acu +=
              serverResponse.data.descartes.descarteLavado[
                descarte as keyof typeof serverResponse.data.descartes.descarteLavado
              ]),
          0,
        );

        const newDataLote: newDataType = {
          enf: serverResponse.data.infoLotes.enf,
          nombre: serverResponse.data.infoLotes.nombreLote,
          kilosVaciados: serverResponse.data.infoLotes.kilosVaciados,
          descarteEncerado: descarteEncerado,
          descarteLavado: descarteLavado,
          exportacion: kilos,
          frutaNacional: serverResponse.data.descartes.frutaNacional,
        };

        dispatch({type: 'initial', data: newDataLote});
       
        setDeshidrate(serverResponse.data.infoLotes.deshidrate);
      },
    );
  }, []);

  useEffect(()=>{
    socket.on('datosSemaforo', (serverResponse: serverResponse) => {
     
      const descarteEncerado = Object.keys(
        serverResponse.data.descartes.descarteEncerado,
      ).reduce(
        (acu, descarte) =>
          (acu +=
            serverResponse.data.descartes.descarteEncerado[
              descarte as keyof typeof serverResponse.data.descartes.descarteEncerado
            ]),
        0,
      );
      const descarteLavado = Object.keys(
        serverResponse.data.descartes.descarteLavado,
      ).reduce(
        (acu, descarte) =>
          (acu +=
            serverResponse.data.descartes.descarteLavado[
              descarte as keyof typeof serverResponse.data.descartes.descarteLavado
            ]),
        0,
      );
      const kilos: number = sumarExportacion(serverResponse.data)
      const newDataLote: newDataType = {
        enf: serverResponse.data.infoLotes.enf,
        nombre: serverResponse.data.infoLotes.nombreLote,
        kilosVaciados: serverResponse.data.infoLotes.kilosVaciados,
        descarteEncerado: descarteEncerado,
        descarteLavado: descarteLavado,
        exportacion: kilos,
        frutaNacional: serverResponse.data.descartes.frutaNacional,
      };

      dispatch({type: 'initial', data: newDataLote});
     
      setDeshidrate(serverResponse.data.infoLotes.deshidrate);
    });
    return () => {
      socket.off('datosSemaforo');
    };
  },[])

  const sumarExportacion = (dataExp: dataExpType | 0): number => {
    
    if (typeof dataExp === 'object') {
      const kilos = Object.keys(dataExp.exportacion).reduce((acu1, contenedor) => (
        acu1 += Object.keys(dataExp.exportacion[contenedor]).reduce((acu2, calidades) => (
          acu2 += dataExp.exportacion[contenedor][calidades]
        ),0)
      ),0)
      return kilos
    }
    return 0
  };

  const obtenerPorcentage = (
    satate: lotesDataType,
  ): ['Verde' | 'Rojo', number] => {
    if (satate.kilosVaciados === 0) return ['Rojo', 0];
    const sum =
      satate.descarteEncerado +
      satate.descarteLavado +
      satate.exportacion +
      satate.frutaNacional;
    const porcentage = (sum * 100) / satate.kilosVaciados;
    console.log(deshidrate);

    if (porcentage >= 100 - deshidrate && porcentage <= 100) {
      return ['Verde', porcentage];
    } else {
      return ['Rojo', porcentage];
    }
  };

  const obtenerPorcentageReduce = (satate: lotesDataType) => {
    if (satate.kilosVaciados === 0) return 0 + '%';
    const sum =
      satate.descarteEncerado +
      satate.descarteLavado +
      satate.exportacion +
      satate.frutaNacional;
    const porcentage = (sum * 100) / satate.kilosVaciados;
    return porcentage;
  };

  const obtenerDeshidrate = (satate: lotesDataType) => {
    if (satate.kilosVaciados === 0) return 0 + '%';
    const sum =
      satate.descarteEncerado +
      satate.descarteLavado +
      satate.exportacion +
      satate.frutaNacional;
    const kilos = Number(satate.kilosVaciados - sum);
    return kilos;
  };

  const porcentageasd: number = Number(obtenerPorcentageReduce(satate));
  const deshidrateAsd: number = Number(obtenerDeshidrate(satate));


  useEffect(() => {
    const changeBandera = async () => {
      const res = obtenerPorcentage(satate);
      setSemaforo(res[0]);
    };
    changeBandera();
  }, [satate]);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>EF1</Text>
          <Text style={styles.tableHeader}>Nombre Predio</Text>
          <Text style={styles.tableHeader}>Descarte Lavado</Text>
          <Text style={styles.tableHeader}>Descarte Encerado</Text>
          <Text style={styles.tableHeader}>Fruta Nacional</Text>
          <Text style={styles.tableHeader}>Exportación</Text>
          <Text style={styles.tableHeader}>Kilos Vaciados</Text>
          <Text style={styles.tableHeader}>Porcentage</Text>
          <Text style={styles.tableHeader}>Deshidratacion</Text>
          <Text style={styles.tableHeader}>Semaforo</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableData}>{satate.enf}</Text>
          <Text style={styles.tableData}>{satate.nombre}</Text>
          <Text style={styles.tableData}>{satate.descarteLavado}</Text>
          <Text style={styles.tableData}>{satate.descarteEncerado}</Text>
          <Text style={styles.tableData}>{satate.frutaNacional}</Text>
          <Text style={styles.tableData}>{satate.exportacion}</Text>
          <Text style={styles.tableData}>{satate.kilosVaciados}</Text>
          <Text style={styles.tableData}>{porcentageasd + '%'}</Text>
          <Text style={styles.tableData}>{deshidrateAsd + 'Kg'}</Text>

          <View style={styles.tableData}>
            {semaforo === 'Rojo' ? (
              <View style={styles.semaforoRojo}></View>
            ) : semaforo === 'Verde' ? (
              <View style={styles.semaforoVerde}></View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#7D9F3A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 0,
    marginTop: 15,
    color: '#0D0600',
    flexDirection: 'row',
    display: 'flex',
  },
  tableRow: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderBottomRightRadius: 1,
    borderLeftWidth: 0,
    color: '#7D9F3A',
    borderBottomColor: '#7D9F3A',
    flex: 1,
  },
  tableHeader: {
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#7D9F3A',
    color: '#fff',
    height: 50,
  },
  tableData: {
    height: 50,
    padding: 8,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#7D9F3A',
    borderLeftWidth: 1,
    borderLeftColor: '#7D9F3A',
    borderRightWidth: 1,
    borderRightColor: '#7D9F3A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  semaforoCell: {},
  semaforoCircle: {},
  semaforoRojo: {
    backgroundColor: '#c5170f',
    height: 30,
    width: 30,
    borderRadius: 30,
  },

  semaforoVerde: {
    backgroundColor: '#7D9F3A',
    height: 30,
    width: 30,
    borderRadius: 30,
  },
});
