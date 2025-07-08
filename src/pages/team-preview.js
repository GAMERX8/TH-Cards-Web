import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MiniCampo from "../components/MiniCampo"; // Asegúrate que sea el correcto
import styles from "./TeamPreview.module.css";

export default function TeamPreviewPage() {
  const router = useRouter();
  const { teamId } = router.query;
  const [mostrarCampo, setMostrarCampo] = useState(false);

  useEffect(() => {
    if (teamId) setMostrarCampo(true);
  }, [teamId]);

  if (!mostrarCampo) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Cargando alineación...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MiniCampo teamId={teamId} />
    </div>
  );
}
