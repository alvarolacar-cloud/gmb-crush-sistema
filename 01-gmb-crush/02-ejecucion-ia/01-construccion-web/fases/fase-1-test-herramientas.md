# Fase 1 — Test de Herramientas

## Contrato

- **Inputs esperados:** ninguno. Es la primera fase.
- **Outputs producidos:** tabla de capacidades disponibles + plan B por cada capacidad faltante + decisión del operador.
- **Gate de salida:** operador dice «arranca» (explícito o tácito si todo ✓) o «conecto X primero» (espera).
- **Si falta un input bloqueante:** no aplica — esta fase no depende de inputs.

---

**Cuándo se ejecuta:** lo primero. Antes de cualquier interacción significativa con el operador.

**Tipo de parada:** blocking. La IA no pasa a Fase 2 hasta presentar este test al operador y, si falta capacidad crítica, ofrecer plan B y esperar decisión.

---

## Qué hace esta fase

La IA hace un self-check de qué herramientas tiene disponibles en esta sesión, las declara al operador, y propone plan B por cada capacidad que falte.

Esto resuelve el problema de "la IA descubre a mitad de Fase 4 que no puede tomar screenshots y ya hay 3 horas de trabajo invertidas". Si lo declara aquí, las decisiones críticas (pasar a manual, posponer, conectar otro MCP) se toman antes de invertir nada.

---

## Cómo verificar cada capacidad

No declares ✓ por optimismo. Verifica con el comando exacto antes de marcar:

| Capacidad | Cómo verificar | Marca ✓ si… |
|-----------|----------------|-------------|
| Navegador real | Intenta `mcp__Claude_in_Chrome__list_connected_browsers` o `mcp__computer-use__screenshot` | el tool responde sin error y hay al menos un browser/display |
| Screenshot | Igual que arriba (mismo MCP cubre ambas) | screenshot devuelve imagen |
| CSS inspection | `javascript_tool` o `preview_eval` disponibles en la sesión | el tool existe en el toolset actual |
| Shell | Ejecuta `Bash` o `PowerShell` con `echo ok` | responde `ok` |
| Git + gh CLI | `git --version && gh --version` | ambos devuelven versión (sin "command not found") |
| pnpm | `pnpm --version` | devuelve versión |

Si un comando devuelve error, la capacidad es ✗ — no la marques ✓ "porque suele estar".

---

## Output exacto al operador

```
Capacidades disponibles para este proyecto:

✓/✗ Navegador real (Google Maps, web ref)  → Fase 2, Fase 4
✓/✗ Screenshot capability                   → Fase 4
✓/✗ CSS inspection (DevTools / JS eval)     → Fase 4
✓/✗ Shell (bash/PowerShell)                 → Fase 5
✓/✗ Git + gh CLI                            → Fase 5
✓/✗ pnpm                                    → Fase 5

Resumen: [todo OK / falta X — plan B: el operador hace Y manualmente]
```

---

## Plan B por capacidad faltante

| Si falta… | Afecta a | Plan B propuesto |
|-----------|----------|------------------|
| Navegador real | Fase 2 (investigación) | El operador busca en Google Maps manualmente y pega los resultados |
| Navegador real | Fase 4 (diseño) | El operador toma screenshots full-page de la web ref y los pega |
| Screenshot / CSS inspection | Fase 4 (diseño) | El operador genera el theme.css con la otra IA o lo entrega prehecho; o el diseño queda como `⚠ pendiente diseño` |
| Shell / git / gh / pnpm | Fase 5 (build + deploy) | La IA entrega el `dist/` listo + instrucciones de subida manual; el deploy queda como `⚠ pendiente tokens` |

---

## Parada blocking — qué esperas del operador

Tras presentar el test:

1. **Si todas las capacidades están ✓** → el operador puede decir "sigue" y pasas a Fase 2 automáticamente. Si no responde en un tiempo razonable, también pasas (la decisión por defecto es continuar cuando no hay fricción).

2. **Si falta alguna capacidad** → propones plan B para cada una. El operador decide:
   - "Acepta los planes B y arranca" → pasas a Fase 2 con esos planes B activos.
   - "Voy a conectar X" → esperas, retomas Fase 1 cuando vuelva.
   - "Renuncio a esa fase, márcala como pendiente" → marcas la fase como `⚠ pendiente capacidad` y avanzas; esa fase no se ejecutará.

3. **Sin decisión clara** → preguntas explícitamente: "¿procedemos con plan B en [fase], conectamos [tool], o dejamos [fase] pendiente?".

---

## Gate de salida

- [ ] Output exacto presentado al operador.
- [ ] Decisión registrada por cada capacidad faltante (plan B aceptado / herramienta a conectar / fase pendiente).
- [ ] Decisión final del operador: "arranca" / "espera" / "pendiente".

Cuando hay "arranca" explícito o tácito (todo ✓ sin respuesta) → avanzar a Fase 2.
