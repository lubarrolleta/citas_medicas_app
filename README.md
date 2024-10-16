
# Agendador de Citas

Tabla de Contenidos

* Introducción
* Características
* Demo
* Tecnologías Utilizadas
* Instalación
* Requisitos Previos
* Configuración del Frontend
* Configuración del Backend
* Configuración de la Base de Datos
* Uso
* Endpoints de la API
* Contribuciones
* Licencia
* Contacto

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Introducción

Agendador de Citas es una aplicación web diseñada para ayudar a los usuarios a programar, gestionar y rastrear citas de manera eficiente. Desarrollada con JavaScript nativo y CSS en el frontend, y PHP en el backend, esta aplicación ofrece una experiencia de usuario fluida y responsiva sin depender de librerías o frameworks externos.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Características


* Gestión de Citas: Crear, editar, eliminar y visualizar citas.
* Vista de Calendario Semanal: Representación visual de las citas por semana, mostrando solo los días laborales (lunes a viernes) con intervalos horarios.
* Diseño Responsivo: Optimizado para computadoras de escritorio, tablets y dispositivos móviles.
* Validación en Tiempo Real: Retroalimentación instantánea en los formularios para asegurar la integridad de los datos.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Demo

Enlace a la Demo

Nota: Reemplaza el enlace anterior con la URL real de tu demo en vivo.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Tecnologías Utilizadas

Frontend

* HTML5: Estructura y semántica de las páginas web.
* CSS3: Estilos y diseño responsivo.
* JavaScript (Nativo): Funcionalidad y interactividad en el lado del cliente.

Backend

* PHP: Procesamiento del lado del servidor y manejo de la API.
* MySQL: Gestión y almacenamiento de la base de datos.

Otros

* Bootstrap (Opcional): Para estilos mejorados y diseños responsivos (si se utiliza).

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Instalación

Requisitos Previos

Antes de configurar la aplicación, asegúrate de tener lo siguiente instalado en tu sistema:

* Servidor Web: Apache o Nginx.
* PHP: Versión 7.4 o superior.
* MySQL: Versión 5.7 o superior.
* Composer: Gestor de dependencias para PHP (si se utilizan paquetes PHP).

Configuración del Frontend

Clonar el Repositorio

bash

Copiar código

git clone  https://github.com/lubarrolleta/citas_medicas_app.git

1. Navegar al Directorio del Proyecto

bash

Copiar código

cd agendador-de-citas/frontend

1. 3. Abrir index.html en tu Navegador

Puedes abrir el archivo index.html directamente o servirlo usando un servidor de desarrollo local.

Usando el Servidor Integrado de PHP:

bash

Copiar código

php -S localhost:8000

* \* Usando la Extensión Live Server en VSCode:
* Instala la extensión Live Server.
* Haz clic derecho en index.html y selecciona "Open with Live Server".

Configuración del Backend

Navegar al Directorio del Backend

bash

Copiar código

cd ../agendamiento_citas

1. Instalar Dependencias

Si tu backend utiliza Composer para dependencias, instálalas:

bash

Copiar código

composer install




* Iniciar el Servidor PHP

bash

Copiar código

php -S localhost:8001

4\. Tu API backend estará accesible en http://localhost:8001.

Configuración de la Base de Datos

Crear la Base de Datos

Inicia sesión en tu servidor MySQL y crea una nueva base de datos:

sql

Copiar código

CREATE DATABASE agendador\_citas;

1. Importar el Esquema de la Base de Datos

Navega al directorio database e importa el esquema:

bash

Copiar código

cd ../database

mysql -u tuusuario -p agendador\_citas < esquema.sql

1. Asegúrate de tener el archivo esquema.sql con las tablas y relaciones necesarias.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Uso

1. Acceder a la Aplicación
* Frontend: Abre tu navegador y navega a http://localhost:8000.
* Backend API: Accesible en http://localhost:8001.

2\. Registrar un Nuevo Usuario

* Haz clic en el botón "Registrarse".
* Completa los detalles requeridos y envía el formulario.

3\. Iniciar Sesión

* Introduce tus credenciales y accede al panel de control.

4\. Gestionar Citas

* Crear Cita: Selecciona una fecha, elige un horario disponible y añade los detalles.
* Ver Citas: Navega por el calendario semanal para ver las citas programadas.
* Editar/Eliminar Cita: Haz clic en una cita existente para modificarla o eliminarla.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Endpoints de la API

El backend PHP expone varios endpoints de la API para gestionar usuarios y citas. A continuación, se presenta una visión general:

Autenticación

Registrar Usuario

http

Copiar código

##Citas
GET /agendamiento_citas/citas

*Trae los medicos y la agenda semanal


POST /agendamiento_citas/citas //crear cita

* idPaciente:
* id_turno (string)
* fecha (string)
* hora:
* Testado.

PUT /agendamiento_citas/citas // edita la cita

* header x-type = <id>

DELETE /agendamiento_citas/citas //Elimina la cita

* header x-type = <id>



Nota: Reemplaza <id> con el ID de la cita correspondiente.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Contribuciones

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirarse y crear. Cualquier contribución que realices es muy apreciada.

1. Haz un Fork del Proyecto

Haz clic en el botón "Fork" en la parte superior derecha de este repositorio.

Crea tu Rama de Característica

bash

Copiar código

git checkout -b feature/CaracterísticaAsombrosa

1. Realiza tus Cambios y Haz Commit

bash

Copiar código

git commit -m "Agrega una Característica Asombrosa"

1. Empuja a la Rama

bash

Copiar código

git push origin feature/CaracterísticaAsombrosa

1. 5. Abre un Pull Request

Ve al repositorio en GitHub y haz clic en "New pull request".

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más información.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


Contacto

* LUIS BARROLLETA
* Correo Electrónico: luisbarr_19@outlook.com
* LinkedIn: linkedin.com/in/lubarrolleta
* GitHub: github.com/lubarrolleta
