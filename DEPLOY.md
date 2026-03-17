# Guía de Despliegue - IA Tools 2026

Para publicar tu aplicación en internet de forma gratuita, usaremos **Vercel** o **Netlify**. Son las mejores opciones para este tipo de proyectos.

## Opción 1: Vercel (Recomendada)

1.  **Login**: Ejecuta el siguiente comando en tu terminal:
    ```bash
    npx vercel login
    ```
    *   Deberás seleccionar tu proveedor (GitHub, GitLab, Email, etc.) y autorizar en el navegador.

2.  **Despliegue**: Una vez logueado, ejecuta:
    ```bash
    npx vercel
    ```
    *   Acepta las opciones por defecto (Yes, Yes, etc.).

3.  **Producción**: Para el dominio final, ejecuta:
    ```bash
    npx vercel --prod
    ```

## Opción 2: Netlify

1.  **Despliegue Manual**:
    *   Ejecuta `npm run build` (ya lo hicimos).
    *   Ve a [Netlify Drop](https://app.netlify.com/drop).
    *   Arrastra la carpeta `dist` que se creó en tu proyecto.

## Opción 3: GitHub Pages (Si tienes cuenta de GitHub)

1.  Crea un repositorio en GitHub.
2.  Sube el código.
3.  Configura GitHub Pages para leer de `gh-pages` branch o usa una acción de deploy.

---

**Nota**: Yo intentaré ejecutar los comandos de Vercel por ti, pero necesitaré que interactúes con la ventana de login que se abra.
