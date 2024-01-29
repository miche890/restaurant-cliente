/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

const Orden = ({ orden }) => {
  // Context de firebase
  const { firebase } = useContext(FirebaseContext);

  const [tiempoentrega, setTiempoentrega] = useState(0);

  // Definir tiempo de entrega en tiempo real
  const definirTiempo = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({
        tiempoentrega,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Completa el estado de una orden
  const completarOrden = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({
        completado: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold"> {orden.id} </h1>
        {orden.orden.map((platillo) => (
          <p className="text-gray-600" key={platillo.id}>
            {platillo.cantidad} {platillo.nombre}
          </p>
        ))}
        <p className="text-gray-700 font-bold">Total a pagar: ${orden.total}</p>

        {orden.tiempoentrega === 0 && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="tiempoentrega"
            >
              Tiempo de Entrega
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-sm focus:shadow-blue-700/50"
              min={1}
              max={20}
              placeholder="20"
              value={tiempoentrega}
              onChange={(e) => setTiempoentrega(parseInt(e.target.value))}
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              onClick={() => definirTiempo(orden.id)}
            >
              Definir tiempo
            </button>
          </div>
        )}

        {orden.tiempoentrega > 0 && (
          <p className="text-gray-700">
            Tiempo de Entrega:
            <span className="font-bold">{orden.tiempoentrega} minutos</span>
          </p>
        )}

        {!orden.completado && orden.tiempoentrega > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-900 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => completarOrden(orden.id)}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  );
};

export default Orden;
