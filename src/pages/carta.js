import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase/firebaseClient";
import { collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import PlayerCard from "../components/PlayerCard.js"; // Asegúrate que es correcto
import styles from "./CartaPage.module.css";

export default function Carta() {
  const router = useRouter();
  const { codigoJugador } = router.query;

  const [miCarta, setMiCarta] = useState(null);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [animacion, setAnimacion] = useState(""); // 'sube' | 'baja' | ''

  const prevOVR = useRef(null);

  useEffect(() => {
    if (!codigoJugador) return;

    const q = query(collection(db, "cards"), where("codigo", "==", codigoJugador));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        const nuevaCarta = { id: docData.id, ...docData.data() };

        // Obtener nombre del equipo
        if (nuevaCarta.equipo) {
          const equipoRef = doc(db, "equipos", nuevaCarta.equipo);
          const equipoSnap = await getDoc(equipoRef);
          if (equipoSnap.exists()) {
            setNombreEquipo(equipoSnap.data().nombre || nuevaCarta.equipo);
          }
        }

        // animación si cambia OVR
        if (prevOVR.current !== null && nuevaCarta.ovr !== prevOVR.current) {
          setAnimacion(nuevaCarta.ovr > prevOVR.current ? "sube" : "baja");
          setTimeout(() => setAnimacion(""), 1000);
        }

        prevOVR.current = nuevaCarta.ovr;
        setMiCarta(nuevaCarta);
      }
    });

    return () => unsubscribe();
  }, [codigoJugador]);

  if (!miCarta) return <p className={styles.loading}>Cargando carta...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Esta es tu carta {miCarta.nombre}</h1>

      <div className={`${styles.cardWrapper} ${animacion === "sube" ? styles.sube : animacion === "baja" ? styles.baja : ""}`}>
        <PlayerCard carta={miCarta} />
      </div>

      {miCarta.equipo ? (
        <button
          className={styles.button}
          onClick={() => router.push(`/team-preview?teamId=${miCarta.equipo}`)}
        >
          Ver alineación de {nombreEquipo}
        </button>
      ) : (
        <p className={styles.noTeam}>No estás asignado a ningún equipo.</p>
      )}
    </div>
  );
}
