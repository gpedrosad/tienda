import { FiClock, FiLink, FiRefreshCw, FiSun } from "react-icons/fi";
import { technicalUrl } from "./content";

const benefits = [
  { Icon: FiRefreshCw, title: "Madera renovable", text: "Un recurso que puede regenerarse cuando proviene de bosques gestionados responsablemente.", label: "Origen responsable", color: "green" },
  { Icon: FiClock, title: "Menos trabajo en terreno", text: "Paneles preparados en taller para avanzar con un montaje más ágil y planificado.", label: "Prefabricación", color: "gold" },
  { Icon: FiLink, title: "Madera unida con madera", text: "Los tarugos unen las tablas del panel sin adhesivos en esa unión.", label: "Unión mecánica", color: "blue" },
  { Icon: FiSun, title: "Calidez a la vista", text: "La textura de la madera forma parte del interior. El confort térmico se diseña junto con aislación, ventanas y ventilación.", label: "Material natural", color: "rose" },
];

export default function DltBenefits() {
  return (
    <section id="ventajas" className="dlt-wrap dlt-section dlt-benefits" aria-labelledby="dlt-benefits-title">
      <div className="dlt-section-intro">
        <h2 id="dlt-benefits-title">¿Por qué construir<br />con DLT?</h2>
        <p>Tablas de madera maciza unidas con tarugos. Una idea simple para construir tu tiny house.</p>
        <figure className="dlt-panel-diagram">
          <svg viewBox="0 0 400 285" role="img" aria-labelledby="dlt-panel-title dlt-panel-description">
            <title id="dlt-panel-title">Cómo se forma un panel DLT</title>
            <desc id="dlt-panel-description">Siete tablas contiguas forman un panel. Las líneas azules muestran esquemáticamente los tarugos que atraviesan las tablas para unirlas.</desc>
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i} transform={`translate(${35 + i * 26}, ${147 + i * 9})`}>
                <path d="M0 0 25 8.65 129 -51.35 104 -60Z" fill={i % 2 ? "#d3ac78" : "#e5bf8c"} />
                <path d="M0 0 25 8.65 25 35.65 0 27Z" fill="#b78b56" />
                <path d="M25 8.65 129 -51.35 129 -24.35 25 35.65Z" fill="#967047" />
                <path d="M8 -3 112 -63" transform="translate(0 5)" stroke="#8c643b" strokeOpacity=".3" fill="none" />
              </g>
            ))}
            <g stroke="#93cddd" strokeWidth="5" strokeLinecap="round">
              <path d="M60 129 248 194" strokeDasharray="8 7" />
              <path d="M113 98 301 163" strokeDasharray="8 7" />
            </g>
            <g fill="#93cddd"><ellipse cx="60" cy="129" rx="5" ry="7" /><ellipse cx="113" cy="98" rx="5" ry="7" /></g>
          </svg>
          <figcaption><span><i className="dlt-legend-wood" />Tablas</span><b aria-hidden="true">+</b><span><i className="dlt-legend-dowel" />Tarugos</span><b aria-hidden="true">=</b><strong>Panel DLT</strong></figcaption>
          <p className="dlt-diagram-note">Esquema de la unión. Tarugos resaltados en azul.</p>
        </figure>
        <a className="dlt-text-link" href={technicalUrl} target="_blank" rel="noopener noreferrer">Conoce el sistema DLT · Think Wood ↗</a>
      </div>
      <div className="dlt-benefit-list">
        {benefits.map(({ Icon, title, text, label, color }) => (
          <article key={title} className={`dlt-benefit dlt-benefit-${color}`}>
            <Icon className="dlt-benefit-symbol" size={30} strokeWidth={1.5} aria-hidden="true" />
            <div><h3>{title}</h3><p>{text}</p><span className="dlt-benefit-label">{label}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
