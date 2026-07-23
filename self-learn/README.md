# self-learn

Memoria operativa **corta** para agentes y humanos en el repo **Idea Madera** (`tienda`). Objetivo: menos tokens y decisiones consistentes.

## Cómo usarlo (IA)

1. Abrir el `INDEX.md` del dominio.
2. Leer **solo** el archivo listado para la tarea.
3. No cargar `docs/gsc-informe-*.md` ni diagnósticos largos enteros salvo métricas pedidas.
4. Tras un cambio ops: 1 línea en `CHANGELOG.md` + actualizar `STATE.md` si cambia el snapshot.
5. Nunca commitear `.secrets/` ni `.env.local`.

## Dominios

| Dominio | Entrada |
|---|---|
| SEO orgánico + GSC | [seo/INDEX.md](./seo/INDEX.md) |

## Docs pesados (evitar en contexto salvo pedido)

- `docs/gsc-informe-YYYY-MM-DD.md`
- `docs/seo-diagnostico-completo-2026-07-23.md`
- `docs/gsc-conexion.md`
- `SEO_GSC_EXECUTION_PLAN_2026-07-01.md` (histórico pre-tanda)

Skill SEO genérico del repo: `.agents/skills/seo/SKILL.md`
