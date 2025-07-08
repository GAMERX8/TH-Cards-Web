import React from "react";
import styles from "./PlayerCard.module.css";

export default function PlayerCard({ carta }) {
  if (!carta) return null;

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${carta.diseñoCarta || "/template.png"})`,
        }}
      >
        {/* Badge de capitán */}
        {carta.isCapitan && (
          <img src="/badge.png" alt="Capitán" className={styles.badge} />
        )}

        {/* OVR y posición */}
        <div className={styles.ovrContainer}>
          <div className={styles.ovr}>{carta.ovr}</div>
          <div className={styles.pos}>{carta.posicion}</div>
        </div>

        {/* Imagen del jugador */}
        <div className={styles.playerWrapper}>
          {carta.imagenJugador && (
            <img
              src={carta.imagenJugador}
              alt={carta.nombre}
              className={styles.playerImage}
            />
          )}
          <div className={styles.fade}></div>
        </div>

        {/* Nombre */}
        <div className={styles.nombre}>{carta.nombre}</div>

        {/* Stats */}
        <div className={styles.statsContainer}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>PAC {carta.stats?.pac}</div>
            <div className={styles.stat}>SHO {carta.stats?.sho}</div>
            <div className={styles.stat}>PAS {carta.stats?.pas}</div>
            <div className={styles.stat}>DRI {carta.stats?.dri}</div>
            <div className={styles.stat}>DEF {carta.stats?.def}</div>
            <div className={styles.stat}>PHY {carta.stats?.phy}</div>
          </div>
        </div>

        {/* Iconos */}
        <div className={styles.iconsRow}>
          {carta.bandera && (
            <img src={carta.bandera} alt="Bandera" className={styles.icon} />
          )}
          {carta.escudoEquipo && (
            <img src={carta.escudoEquipo} alt="Escudo" className={styles.icon} />
          )}
        </div>
      </div>
    </div>
  );
}
