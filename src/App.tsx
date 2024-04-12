import React, { useState, useEffect } from 'react';
import './App.css';

interface Futbolista {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  caracteristicas: string;
  posicion: {
    id: number;
    nombrePosicion: string;
  };
}

function App() {
  const [futbolistas, setFutbolistas] = useState<Futbolista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/futbolistas')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los futbolistas');
        }
        return response.json();
      })
      .then((data: Futbolista[]) => {
        setFutbolistas(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener futbolistas:', error);
        setError('Error al obtener los futbolistas. Por favor, inténtelo de nuevo más tarde.');
        setIsLoading(false);
      });
  }, []);

  const mostrarInfoJugador = (futbolista: Futbolista) => {
    const { id, nombres, apellidos, fechaNacimiento, caracteristicas, posicion } = futbolista;
    const fechaFormateada = fechaNacimiento.substring(0, 10); 
    alert(`ID: ${id}\nNombre: ${nombres} ${apellidos}\nFecha de nacimiento: ${fechaFormateada}\nCaracterísticas: ${caracteristicas}\nPosición: ${posicion.nombrePosicion}`);
  };

  return (
    <div className="App">
      <h1>Lista de Futbolistas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Fecha de nacimiento</th>
              <th>Posición</th>
            </tr>
          </thead>
          <tbody>
            {futbolistas.map(futbolista => (
              <tr key={futbolista.id} onClick={() => mostrarInfoJugador(futbolista)}>
                <td>{futbolista.id}</td>
                <td>{futbolista.nombres}</td>
                <td>{futbolista.apellidos}</td>
                <td>{futbolista.fechaNacimiento.substring(0, 10)}</td>
                <td>{futbolista.posicion.nombrePosicion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;


