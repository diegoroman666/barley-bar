# Barley Terraza Restobar — Sitio de pedidos por QR

## Ejecutar en local
```
npm install
npm start
```
- Menú y pedidos (clientes): http://localhost:3000
- Panel manager: http://localhost:3000/manager.html
  - Usuario: barley
  - Contraseña: barley2026
  (cambiar en variables de entorno MANAGER_USER / MANAGER_PASS antes de producción)

## Importante sobre Netlify
Netlify solo sirve archivos estáticos + funciones serverless efímeras: NO puede
correr este servidor Express con un archivo JSON como base de datos persistente
(los pedidos se perderían). Antes de subir a producción hay que:
1. Mover data/orders.json a una base de datos real (Supabase, Firebase o similar), o
2. Alojar server.js en un host que soporte Node persistente (Render, Railway, Fly.io) y
   dejar solo el frontend estático en Netlify apuntando a esa API.
