# Calendario IPUE 2026

Calendario de eventos (nacional, distrital, local) con vista lista y calendario. Conectado a **Firebase Firestore** para guardar eventos y categorías en la nube.

**Después de que el asistente haga cambios:** ejecuta `.\push.ps1` en PowerShell (desde esta carpeta) para hacer commit y push a `main` (y que se despliegue solo).

## Enlace público y deploy automático (GitHub Pages)

1. Sube el repo a GitHub y trabaja en la rama **main**.
2. En el repo: **Settings → Pages**.
3. En **Source** elige **GitHub Actions** (no "Deploy from a branch").
4. Cada vez que hagas **push a main**, se desplegará solo. La app quedará en:
   - `https://<tu-usuario>.github.io/calendario2026/`
5. La raíz del sitio abre `index.html`, que redirige al calendario (`calendario2026.html`).

## Firebase Firestore

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com) (o usa el que ya tienes).
2. Activa **Firestore Database** (modo producción o prueba).
3. En **Project settings → General** copia la configuración de tu app web (apiKey, authDomain, projectId, etc.).
4. En `calendario2026.html` sustituye el objeto `firebaseConfig` (al inicio del script de Firebase) con tus datos:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### Estructura en Firestore

- **Colección `events`**: un documento por evento. ID del documento = `id` numérico del evento. Campos: `name`, `start`, `end`, `desc`, `cat`, `level`, `comite`, `timeStart`, `timeEnd`.
- **Documento `config/app`**: campos `nextId` (número para el siguiente id de evento) y `categories` (array de `{ id, label, color }`).

La primera vez que abras la app con Firebase configurado, si Firestore está vacío se mostrarán los eventos que vienen por defecto en el HTML. Al añadir, editar o eliminar eventos (y al guardar categorías), los cambios se guardan en Firestore.

## Subir a GitHub desde cero

En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Calendario IPUE 2026 con Firestore"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/calendario2026.git
git push -u origin main
```

Luego activa GitHub Pages como se indica arriba.

## Usar index.html como página principal

Para que `https://<usuario>.github.io/calendario2026/` abra el calendario sin escribir `calendario2026.html`, puedes duplicar o renombrar:

- Opción A: renombrar `calendario2026.html` a `index.html` (el sitio mostrará el calendario en la raíz).
- Opción B: dejar ambos; la raíz puede ser una redirección o un `index.html` que redirija a `calendario2026.html`.
