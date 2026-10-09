"use client";

import { useEffect, useRef, useState } from "react";
import type { HouseOptions, HouseScene, HouseView } from "./house-scene";

const views: Array<{ id: HouseView; label: string; description: string }> = [
  { id: "exterior", label: "Exterior", description: "La volumetría completa" },
  { id: "interior", label: "Interior", description: "Distribución y mobiliario" },
  { id: "assembly", label: "Montaje", description: "Paneles separados" },
  { id: "panel", label: "Panel DLT", description: "Tablas y tarugos" },
];
const initial: HouseOptions = { view: "exterior", length: 7.8, separation: 100 };
type LoadState = "waiting" | "loading" | "ready" | "error";

export default function HouseSimulator() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HouseScene | null>(null);
  const [options, setOptions] = useState<HouseOptions>(initial);
  const [loadState, setLoadState] = useState<LoadState>("waiting");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let hasStarted = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const fail = () => {
      if (!cancelled) setLoadState("error");
    };

    const initialize = async () => {
      if (hasStarted || cancelled) return;
      hasStarted = true;
      setLoadState("loading");

      try {
        const { createHouseScene } = await import("./house-scene");
        if (cancelled || !hostRef.current) return;

        const createScene = () => {
          if (cancelled || !hostRef.current) return;
          try {
            sceneRef.current = createHouseScene(hostRef.current, initial, fail);
            setLoadState("ready");
          } catch {
            fail();
          }
        };

        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(createScene, { timeout: 1200 });
        } else {
          timeoutId = setTimeout(createScene, 0);
        }
      } catch {
        fail();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void initialize();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) clearTimeout(timeoutId);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);
  useEffect(() => { sceneRef.current?.update(options); }, [loadState, options]);
  const setView = (view: HouseView) => setOptions((current) => ({ ...current, view }));

  return (
    <section className="dlt-simulator" aria-labelledby="dlt-simulator-title">
      <div className="dlt-wrap">
        <div className="dlt-simulator-heading"><div><p className="dlt-kicker">Explora la idea en 3D</p><h2 id="dlt-simulator-title">Una tiny house,<br />capa por capa.</h2></div><p>Gira el modelo y cambia de vista para entender cómo se relacionan los paneles DLT, el espacio interior y el montaje.</p></div>
        <div className="dlt-simulator-shell">
          <div
            className="dlt-canvas-wrap"
            ref={hostRef}
            aria-busy={loadState === "loading"}
          >
            {loadState === "waiting" && (
              <div className="dlt-canvas-placeholder">
                <strong>Modelo 3D interactivo</strong>
                <span>Se cargará automáticamente al acercarte a esta sección.</span>
              </div>
            )}
            {loadState === "loading" && (
              <div className="dlt-canvas-placeholder" role="status">
                <strong>Preparando el modelo 3D…</strong>
                <span>La vista completa estará disponible en un momento.</span>
              </div>
            )}
            {loadState === "error" && (
              <div className="dlt-canvas-fallback">
                <strong>Vista 3D no disponible en este navegador.</strong>
                <span>La explicación y las imágenes del proyecto siguen disponibles más abajo.</span>
              </div>
            )}
          </div>
          <div className="dlt-simulator-controls">
            <div className="dlt-view-tabs" role="tablist" aria-label="Vistas del modelo">{views.map((view) => <button key={view.id} type="button" role="tab" aria-selected={options.view === view.id} className={options.view === view.id ? "is-active" : ""} disabled={loadState !== "ready"} onClick={() => setView(view.id)}><span>{view.label}</span><small>{view.description}</small></button>)}</div>
            <div className="dlt-model-actions"><button type="button" disabled={loadState !== "ready"} onClick={() => sceneRef.current?.rotate(-1)} aria-label="Girar el modelo a la izquierda">← Girar</button><button type="button" disabled={loadState !== "ready"} onClick={() => sceneRef.current?.reset()}>Restablecer</button><button type="button" disabled={loadState !== "ready"} onClick={() => sceneRef.current?.rotate(1)} aria-label="Girar el modelo a la derecha">Girar →</button></div>
            <label className="dlt-length-control" htmlFor="dlt-length"><span><strong>Longitud del ejemplo</strong><small>{options.length.toFixed(1)} m · geometría conceptual</small></span><input id="dlt-length" type="range" min="5.8" max="10.2" step="0.2" value={options.length} disabled={loadState !== "ready"} onChange={(event) => setOptions((current) => ({ ...current, length: Number(event.target.value) }))} /></label>
            <p className="dlt-simulator-note">Arrastra para orbitar · rueda o pellizca para acercar · esta simulación no reemplaza cálculo estructural ni planos de fabricación.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
