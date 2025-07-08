// components/MiniCampoWeb.jsx
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import "./MiniCampo.module.css"; // Asegúrate de que este archivo exista y tenga los estilos

const formacionesMap = {
  "2-2-1": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "35%" },
    { posicion: "DEF2", top: "72%", left: "65%" },
    { posicion: "MID1", top: "50%", left: "35%" },
    { posicion: "MID2", top: "50%", left: "65%" },
    { posicion: "FWD1", top: "20%", left: "50%" },
  ],
  "1-2-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "50%" },
    { posicion: "MID1", top: "50%", left: "35%" },
    { posicion: "MID2", top: "50%", left: "65%" },
    { posicion: "FWD1", top: "20%", left: "40%" },
    { posicion: "FWD2", top: "20%", left: "60%" },
  ],
  "2-2-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "35%" },
    { posicion: "DEF2", top: "72%", left: "65%" },
    { posicion: "MID1", top: "50%", left: "35%" },
    { posicion: "MID2", top: "50%", left: "65%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "3-2-1": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "30%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "70%" },
    { posicion: "MID1", top: "50%", left: "40%" },
    { posicion: "MID2", top: "50%", left: "60%" },
    { posicion: "FWD1", top: "28%", left: "50%" },
  ],
  "2-3-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "40%" },
    { posicion: "DEF2", top: "72%", left: "60%" },
    { posicion: "MID1", top: "50%", left: "30%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "70%" },
    { posicion: "FWD1", top: "20%", left: "40%" },
    { posicion: "FWD2", top: "20%", left: "60%" },
  ],
  "3-2-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "25%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "75%" },
    { posicion: "MID1", top: "50%", left: "35%" },
    { posicion: "MID2", top: "50%", left: "65%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "64%" },
  ],
  "3-3-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "30%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "70%" },
    { posicion: "MID1", top: "50%", left: "30%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "70%" },
    { posicion: "FWD1", top: "20%", left: "40%" },
    { posicion: "FWD2", top: "20%", left: "60%" },
  ],
  "2-4-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "40%" },
    { posicion: "DEF2", top: "72%", left: "60%" },
    { posicion: "MID1", top: "50%", left: "20%" },
    { posicion: "MID2", top: "50%", left: "40%" },
    { posicion: "MID3", top: "50%", left: "60%" },
    { posicion: "MID4", top: "50%", left: "80%" },
    { posicion: "FWD1", top: "20%", left: "40%" },
    { posicion: "FWD2", top: "20%", left: "60%" },
  ],
  "3-3-2 (ATA)": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "25%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "75%" },
    { posicion: "MID1", top: "50%", left: "25%" },
    { posicion: "MID2", top: "40%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "3-3-2 (DEF)": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "25%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "75%" },
    { posicion: "MID1", top: "45%", left: "25%" },
    { posicion: "MID2", top: "55%", left: "50%" },
    { posicion: "MID3", top: "45%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "3-3-3": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "25%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "75%" },
    { posicion: "MID1", top: "50%", left: "25%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "25%" },
    { posicion: "FWD2", top: "20%", left: "50%" },
    { posicion: "FWD3", top: "20%", left: "75%" },
  ],
  "4-3-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "20%" },
    { posicion: "DEF2", top: "72%", left: "40%" },
    { posicion: "DEF3", top: "72%", left: "60%" },
    { posicion: "DEF4", top: "72%", left: "80%" },
    { posicion: "MID1", top: "50%", left: "25%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "4-3-3": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "20%" },
    { posicion: "DEF2", top: "72%", left: "40%" },
    { posicion: "DEF3", top: "72%", left: "60%" },
    { posicion: "DEF4", top: "72%", left: "80%" },
    { posicion: "MID1", top: "50%", left: "25%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "25%" },
    { posicion: "FWD2", top: "20%", left: "50%" },
    { posicion: "FWD3", top: "20%", left: "75%" },
  ],
  "3-4-3": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "30%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "70%" },
    { posicion: "MID1", top: "50%", left: "20%" },
    { posicion: "MID2", top: "50%", left: "40%" },
    { posicion: "MID3", top: "50%", left: "60%" },
    { posicion: "MID4", top: "50%", left: "80%" },
    { posicion: "FWD1", top: "20%", left: "25%" },
    { posicion: "FWD2", top: "20%", left: "50%" },
    { posicion: "FWD3", top: "20%", left: "75%" },
  ],
  "3-5-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "30%" },
    { posicion: "DEF2", top: "72%", left: "50%" },
    { posicion: "DEF3", top: "72%", left: "70%" },
    { posicion: "MID1", top: "50%", left: "15%" },
    { posicion: "MID2", top: "50%", left: "35%" },
    { posicion: "MID3", top: "35%", left: "50%" },
    { posicion: "MID4", top: "50%", left: "65%" },
    { posicion: "MID5", top: "50%", left: "85%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "5-3-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "70%", left: "10%" },
    { posicion: "DEF2", top: "72%", left: "30%" },
    { posicion: "DEF3", top: "72%", left: "50%" },
    { posicion: "DEF4", top: "72%", left: "70%" },
    { posicion: "DEF5", top: "70%", left: "90%" },
    { posicion: "MID1", top: "50%", left: "25%" },
    { posicion: "MID2", top: "50%", left: "50%" },
    { posicion: "MID3", top: "50%", left: "75%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ],
  "4-4-2": [
    { posicion: "GK", top: "90%", left: "50%" },
    { posicion: "DEF1", top: "72%", left: "20%" },
    { posicion: "DEF2", top: "72%", left: "40%" },
    { posicion: "DEF3", top: "72%", left: "60%" },
    { posicion: "DEF4", top: "72%", left: "80%" },
    { posicion: "MID1", top: "50%", left: "20%" },
    { posicion: "MID2", top: "50%", left: "40%" },
    { posicion: "MID3", top: "50%", left: "60%" },
    { posicion: "MID4", top: "50%", left: "80%" },
    { posicion: "FWD1", top: "20%", left: "35%" },
    { posicion: "FWD2", top: "20%", left: "65%" },
  ]
};

export default function MiniCampoWeb({ teamId }) {
  const [jugadoresConPos, setJugadoresConPos] = useState([]);
  const [formacion, setFormacion] = useState(null);
  const [equipoDesign, setEquipoDesign] = useState(null);

  useEffect(() => {
    if (!teamId) return;

    const unsub = onSnapshot(doc(db, "equipos", teamId), async (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      const alineacion = data.alineacion?.jugadores || [];
      const form = data.alineacion?.formacion || "4-4-2";
      const diseñoCartaEquipo = data.diseñoCarta || null;
      setFormacion(form);
      setEquipoDesign(diseñoCartaEquipo);

      const cartasSnap = await getDocs(collection(db, "cards"));
      const todasCartas = cartasSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const jugadoresData = alineacion.map(({ jugadorId, posicion }) => {
        const card = todasCartas.find((c) => c.id === jugadorId);
        return {
          id: jugadorId,
          nombre: card?.nombre || "Desconocido",
          imagenJugador: card?.imagenJugador || null,
          diseñoCarta: card?.diseñoCarta || diseñoCartaEquipo || "/template.png",
          posicion: posicion || null,
        };
      });

      setJugadoresConPos(jugadoresData);
    });

    return () => unsub();
  }, [teamId]);

  const layout = formacionesMap[formacion] || [];

  return (
    <div className="campo">
      {layout.map(({ posicion, top, left }) => {
        const jugador = jugadoresConPos.find((j) => j.posicion === posicion);
        if (!jugador) return null;

        return (
          <div
            key={jugador.id}
            className="mini-card"
            style={{ top, left }}
          >
            {/* fondo diseño de carta */}
            <img src={jugador.diseñoCarta} alt="diseño" className="carta-bg" />

            {/* imagen jugador */}
            {jugador.imagenJugador && (
              <img
                src={jugador.imagenJugador}
                alt={jugador.nombre}
                className="jugador"
              />
            )}

            {/* nombre */}
            <div className="nombre">{jugador.nombre}</div>
          </div>
        );
      })}
    </div>
  );
}
