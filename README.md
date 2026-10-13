# Green World — frontend

Aplicación React/Vite de Green World, conectada a [GreenWorld-BackEnd](https://github.com/fabianalexanderchirivi-a11y/GreenWorld-BackEnd). Incluye inicio de sesión, cursos, progreso y descarga de certificados PDF autenticada.

## Ejecución local

Requiere Node.js/npm y la API real con su base SQL Server configurada.

```powershell
npm ci
Copy-Item .env.example .env
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Vite publica `http://127.0.0.1:5173` y envía `/api` a `http://localhost:4000`. El ejemplo de configuración solo contiene la URL de API; añade credenciales de prueba mediante variables de entorno locales cuando ejecutes Cypress.

## Validación

```powershell
npm run build
npm run lint
$env:CYPRESS_USER_EMAIL = Read-Host 'Correo de la cuenta de prueba'
$env:CYPRESS_USER_PASSWORD = Read-Host -MaskInput 'Contraseña de la cuenta de prueba'
$env:CYPRESS_NO_COMMAND_LOG = '1'
npm run cy:run -- --spec 'cypress/e2e/ppi/*.cy.js'
```

Los ocho casos oficiales necesitan frontend, backend y SQL Server reales. La cuenta debe tener cursos publicados sin iniciar y un curso terminado para el caso de certificado. Dos casos dejan cursos terminados; para repetirlos prepara otra cuenta controlada o suficientes cursos disponibles. Las capturas y videos quedan en `cypress/evidence/`, y los PDF descargados en `cypress/downloads/`; ambas carpetas se mantienen locales.

Consulta [el estado de validación y sus limitaciones](docs/VALIDACION-PPI.md). La última regresión real, del 9 de octubre de 2026, aprobó 8/8 casos. El criterio de finalización por actividades de GW-02/GW-09 sigue pendiente de confirmación.
