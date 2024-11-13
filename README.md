# GlaucomApp-frontend
## Proyecto React Native con Expo

Este proyecto es una aplicación móvil desarrollada con React Native utilizando Expo. A continuación, encontrarás los pasos necesarios para configurar y ejecutar el proyecto en tu entorno local.

## Requisitos previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

1. **Node.js** (versión 18 o superior)
    - Puedes descargar la última versión de Node.js desde su [sitio oficial](https://nodejs.org/en/).
   

2. **Expo CLI**
    - Expo es la herramienta principal utilizada en este proyecto para desarrollar, construir y publicar la aplicación.
    - Para instalar Expo CLI globalmente en tu máquina, ejecuta el siguiente comando:
      ```bash
      npm install -g expo-cli exp
      ```

3. **Yarn**
    - Este proyecto usa `yarn` como gestor de dependencias. Si no lo tienes instalado, puedes hacerlo con:
      ```bash
      yarn install
      ```

## Instalación y Ejecución del proyecto

Instala las depnedencias que necesitas para ejecutar laApp en tu entorno local y cambia el archivo example.env por la ip y puerto local, sigue los pasos a continuación para configurar el entorno y ejecutar la aplicación.


1. **Inicia la aplicación con Expo:**
    - Para iniciar el servidor de desarrollo de Expo, simplemente ejecuta:
      ```bash
      npm install -g expo-cli exp
      yarn install
      yarn start
      ```
    - Esto abrirá la interfaz de Expo en tu navegador, donde podrás ver opciones para ejecutar la aplicación en un emulador, un dispositivo físico, o directamente en el navegador web.


2. **Ejecutar en un dispositivo físico o emulador:**
    - Si deseas ejecutar la app en un dispositivo físico, descarga la aplicación **Expo Go** desde la App Store o Google Play.
    - Escanea el código QR generado en la consola de Expo para ejecutar la app en tu dispositivo.
    - Para ejecutarla en un emulador (iOS o Android), asegúrate de tener instalado el emulador correspondiente y configurado correctamente en tu máquina.

## Estructura del proyecto

La estructura básica del proyecto es la siguiente:

```
GlaucomApp-frontend
│
├── .expo                     # Carpeta creada por Expo para la configuración y caché del proyecto
├── assets                    # Carpeta para almacenar recursos estáticos como imágenes, fuentes, etc.
├── node_modules              # Carpeta donde se almacenan todas las dependencias instaladas
│
├── src                       # Carpeta principal que contiene todo el código fuente del proyecto
│   ├── components            # Carpeta para componentes reutilizables de React
│   ├── hooks                 # Carpeta para custom hooks de React
│   ├── navigation            # Carpeta que contiene la configuración de navegación del proyecto
│   ├── screens               # Carpeta para las pantallas del proyecto
│   ├── services              # Carpeta para los servicios de API y lógica de negocio
│   ├── utils                 # Carpeta para funciones utilitarias y helpers
│   └── validationSchemas     # Carpeta para esquemas de validación de formularios
│
├── example.env               # Archivo de ejemplo para variables de entorno
├── .gitignore                # Archivo que indica qué archivos o carpetas deben ser ignorados por Git
├── App.js                    # Archivo principal de entrada de la aplicación
├── app.json                  # Archivo de configuración de la aplicación Expo
├── babel.config.js           # Archivo de configuración de Babel
├── package.json              # Archivo que contiene las dependencias y scripts del proyecto
├── README.md                 # Archivo README que describe el proyecto y su estructura
└── yarn.lock                 # Archivo que asegura las versiones exactas de las dependencias de Yarn
```

## Scripts útiles

- `yarn start`: Inicia el servidor de desarrollo de Expo.
- `yarn android`: Ejecuta la app en un emulador o dispositivo Android.
- `yarn ios`: Ejecuta la app en un emulador iOS (requiere una máquina Mac).
- `yarn web`: Ejecuta la app en un navegador web.
- `yarn test`: Ejecuta todos los test del respositorio




