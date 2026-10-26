# Despliegue en Google Cloud Run + Cloud SQL

Arquitectura: **Cloud Run** (API, imagen del `Dockerfile`) → **Cloud SQL for PostgreSQL**. Secretos en **Secret Manager**.

Las variables de abajo sustituyen a `.env`; no se copia ningún `.env` a la imagen (está en `.dockerignore`).

## 1. Variables de entorno y secretos

| Variable | Dónde | Valor |
|---|---|---|
| `NODE_ENV` | env | `production` |
| `FRONTEND_URL` | env | `https://www.hoysesale.cl` |
| `DATABASE_URL` | secret | `postgresql://USER:PASS@/DB?host=/cloudsql/PROJECT:REGION:INSTANCE` |
| `JWT_SECRET` | secret | cadena aleatoria larga (ver abajo) |
| `INSTAGRAM_CLIENT_ID` / `INSTAGRAM_CLIENT_SECRET` | secret | de Meta Developers |
| `INSTAGRAM_REDIRECT_URI` | env | URL del frontend de callback |
| `INSTAGRAM_WEBHOOK_TOKEN` | secret | token de verificación del webhook |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REDIRECT_URI` | secret / env | solo si se usa login con Google |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | env / secret | sin `SMTP_HOST` el correo cae en Ethereal (no sirve en producción) |

Generar `JWT_SECRET`:

```bash
openssl rand -base64 48
```

## 2. Variables de shell

```bash
export PROJECT_ID=tu-proyecto
export REGION=southamerica-west1
export SQL_INSTANCE=eventos-db
export DB_NAME=eventos
export DB_USER=eventos_app
export SERVICE=backend-evento
gcloud config set project $PROJECT_ID
```

## 3. APIs y base de datos

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com \
  artifactregistry.googleapis.com sqladmin.googleapis.com secretmanager.googleapis.com

gcloud sql instances create $SQL_INSTANCE \
  --database-version=POSTGRES_16 --tier=db-f1-micro --region=$REGION

gcloud sql databases create $DB_NAME --instance=$SQL_INSTANCE
gcloud sql users create $DB_USER --instance=$SQL_INSTANCE --password='CAMBIAR_ESTA_CLAVE'
```

## 4. Secretos

```bash
printf '%s' "postgresql://$DB_USER:CAMBIAR_ESTA_CLAVE@/$DB_NAME?host=/cloudsql/$PROJECT_ID:$REGION:$SQL_INSTANCE" \
  | gcloud secrets create DATABASE_URL --data-file=-

openssl rand -base64 48 | gcloud secrets create JWT_SECRET --data-file=-

# Repetir para cada secreto restante (INSTAGRAM_CLIENT_SECRET, INSTAGRAM_WEBHOOK_TOKEN, SMTP_PASS, ...)
```

Dar acceso a la cuenta de servicio de Cloud Run (la predeterminada de Compute):

```bash
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
for S in DATABASE_URL JWT_SECRET; do
  gcloud secrets add-iam-policy-binding $S \
    --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role=roles/secretmanager.secretAccessor
done
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role=roles/cloudsql.client
```

## 5. Desplegar

Desde la raíz del proyecto (usa el `Dockerfile`; Cloud Build construye la imagen):

```bash
gcloud run deploy $SERVICE \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --add-cloudsql-instances $PROJECT_ID:$REGION:$SQL_INSTANCE \
  --set-env-vars NODE_ENV=production,FRONTEND_URL=https://www.hoysesale.cl \
  --set-secrets DATABASE_URL=DATABASE_URL:latest,JWT_SECRET=JWT_SECRET:latest
```

Cloud Run asigna `PORT` automáticamente; la app ya lo usa.

Verificar:

```bash
URL=$(gcloud run services describe $SERVICE --region $REGION --format='value(status.url)')
curl -s $URL/health
curl -s -o /dev/null -w "%{http_code}\n" $URL/api/docs
```

## 6. Dominio propio (recomendado)

Las cookies `access_token` usan `sameSite: lax`. Si el frontend está en `hoysesale.cl` y la API en `*.run.app`, son sitios distintos y el navegador no envía la cookie. Con un subdominio del mismo dominio (p. ej. `api.hoysesale.cl`) funciona:

```bash
gcloud run domain-mappings create --service $SERVICE --domain api.hoysesale.cl --region $REGION
```

Después añadir el registro DNS que indique el comando, y actualizar:

- Redirect URIs de Instagram y Google.
- URL del webhook de Instagram en Meta Developers.
- `FRONTEND_URL` solo si cambia el frontend (la API no se lista ahí).

## 7. Notas y pendientes

- **Migraciones:** `start:prod` ejecuta `prisma migrate deploy` al arrancar cada instancia. Funciona, pero con varias instancias conviene moverlo a un Cloud Run Job.
- **SSL hacia Cloud SQL:** con `NODE_ENV=production`, `prisma.service.ts` fuerza SSL (`rejectUnauthorized: false`). Por socket Unix de Cloud SQL puede fallar. **No probado en GCP.** Si ocurre, hay que condicionar el bloque `ssl` a conexiones no-socket.
- **Usuario admin demo:** `src/seed/seed.service.ts` crea o reinicia `admin@eventos.cl` con rol ADMIN y una contraseña fija en el código **en cada arranque**. No desplegar en producción sin decidir qué hacer con esto.
- **Costo:** `--min-instances 0` (por defecto) apaga la instancia cuando no hay tráfico, con arranque en frío. Si necesitas respuesta inmediata, usa `--min-instances 1`.
- **Keep-alive de GitHub Actions:** `.github/workflows/` hace ping a un dominio de Render. En Cloud Run no es necesario.
