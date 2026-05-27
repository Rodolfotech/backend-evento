# Especificación de Flujo de Trabajo

## Regla Fundamental (Inquebrantable)

**Nunca trabajar directamente en `main`.**

Todo cambio, sin excepción, debe seguir este flujo:

## Flujo Obligatorio

```
1. cada vez que se comienza sin ramas se debe crear una rama
2. Crear rama desde main → feature/<nombre-descritivo>
3. Hacer cambios en la rama
4. Commit + Push a GitHub
5. Git checkout main + git merge --no-ff <rama>
6. Git push origin main
```

**Prohibido:** Crear Pull Requests en GitHub. El merge se hace local con `--no-ff`.

## Convención de Nombres de Ramas

- `feature/<nombre>` — Nuevas funcionalidades
- `fix/<nombre>` — Correcciones de bugs
- `chore/<nombre>` — Tareas de mantenimiento

## Commits

Usar prefijos semánticos:

- `feat:` — Nueva funcionalidad
- `fix:` — Corrección
- `chore:` — Mantenimiento
- `docs:` — Documentación
- `refactor:` — Refactorización

## Deploy

Solo se deploya desde `main` después del merge.
