# Hornero Repositories


Es una metodología de desarrollo basado en MVC, podes una estructura de desarrollo muy comodo para trabajar basado en programación horientada a objeto, posee el Estandar PSR-4 de autocargas de clases, de este modo te permite desarrollar aplicaciones de forma mas simple ordenada y sin tanta capa de astracción de datos, se adapta a todo tipo de desarrollo por mas compleja que sea hastas puedes incluir componentes de tercero sin restrinciones.

Desarrollo rapido y simple, sin tener que aprener tantas cosas adicionales solo saber las buenas pracicas de desarrolo y patrones de diseño

[![Autor](@gbolivarb)](https://twitter.com/gbolivarb)
[![Desarrollo](Tag pre-alpha-02)](https://github.com/CaribesTIC/hornero/tree/pre-alpha-02)
[![Plantilla Plates](https://img.shields.io/badge/source-league/plates-blue.svg?style=flat-square)](http://platesphp.com/)


## Table of Contents

- <a href="#installation">Installation</a>
    - <a href="#clonar">Clonar proyecto</a>
    - <a href="#composer">Composer</a>
    - <a href="#hornero">Hornero</a>
    - <a href="#config">Configurar Base de Datos</a>

## Installation

### Clonar Proyecto

Debes descargar el proyecto desde el repositorio 
```terminal
git clone https://github.com/CaribesTIC/hornero.git 
```

### Composer
Debes descargar todos los paquetes de compases

```terminal
composer install 
```


### Hornero
Hornero es una solucion tecnologica basada en simplifación de 
structuras de trabajos o framework mas complicado, la idea esta 
estructura es simplificar el tiempo de desarrollo y hacer aplicaciones 
en tiempo record, sin tener que saber programar, pero tienes una parte 
desarrolladores donde puedes impementar sistemas as rapidos todo basado
 en PHP igual que las plantillas. 
Puedes ver todas las opciones de la siguiente forma:
```terminal
php hornero 
```
Deberia aparecer algo como lo siguiente:
```terminal
horneroHornero - 1.0

Variebles comandos:
 App
   app:list, Permite listar las aplicacion dentro de tu proyecto
   app nombre, Permite crear una aplicacion dentro de tu proyecto
   app nombre public, Permite publicar tus css, js, e img en la parte web
   app:model nombre-app nombre-modelo, Permite generar el modelo dentro de una aplicacion
 Cache
   cache:clean, permite limpiar el cache de las aplicaciones
```

### Configuracion a Base de Datos
Esta permite tener varias base de datos configuradas hasta el momento, por ahora solo funciona para mariadb y sqlserver, `config/databases.ini`
```php
[default]
    motor = 'sql'
    host = 'localhost'
    port = '3306'
    db  = 'miBaseDatos'
    user = 'miUsuario'
    pass = 'miClave'
    encoding = 'UTF-8'
```
Si necesitas otro puedes agregar mas cambiando el indice ejemplo:

```php
[default]
    motor = 'sql'
    host = 'servidor1.localhost'
    port = '3306'
    db  = 'miBaseDatos'
    user = 'miUsuario'
    pass = 'miClave'
    encoding = 'UTF-8'
[base2]
    motor = 'sql'
    host = 'servidor2.localhost'
    port = '3306'
    db  = 'miBaseDatos'
    user = 'miUsuario'
    pass = 'miClave'
    encoding = 'UTF-8'
[base3]
    motor = 'sql'
    host = 'servidor3.localhost'
    port = '3306'
    db  = 'miBaseDatos'
    user = 'miUsuario'
    pass = 'miClave'
    encoding = 'UTF-8'
```
El sistema siempre se conecta a default, parocuando creas mas bases diferente a la defaul debes conectarte a elle pasando el indice de conexion.