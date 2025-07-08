// pages/index.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import styles from "./index.module.css";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const verificarCodigo = async () => {
    if (!codigo.trim()) {
      alert("Por favor ingresa tu código.");
      return;
    }

    try {
      const snapshot = await getDocs(collection(db, "cards"));
      const cartas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const carta = cartas.find((c) => c.codigo === codigo.trim());

      if (!carta) {
        alert("Código no válido. Verifica el código ingresado.");
        return;
      }

      router.push(`/carta?codigoJugador=${carta.codigo}`);
    } catch (error) {
      console.error("Error buscando código:", error);
      alert("Hubo un problema al verificar tu código.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ingresa tu código</h1>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Código único"
        className={styles.input}
      />
      <button onClick={verificarCodigo} className={styles.button}>
        Ver Carta
      </button>
    </div>
  );
}
