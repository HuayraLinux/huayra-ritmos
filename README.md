¡Hola, esto es huayra-ritmos!
==========================

- Demo: http://huayralinux.github.io/huayra-ritmos

[![Build Status](https://travis-ci.org/HuayraLinux/huayra-ritmos.svg?branch=master)](https://travis-ci.org/HuayraLinux/huayra-ritmos)


Este proyecto está construido a partir de nwjs-ember-seed,
un marco de aplicación pensado como punto de partida
para hacer aplicaciones de escritorio usando javascript.

![](preview/1.png)

![](preview/2.png)

Esta aplicación integra las herramientas [ember](http://emberjs.com/), [ember-cli](http://www.ember-cli.com/)
y [nwjs](http://nwjs.io/) junto a unas configuraciones iniciales
para poder editar código y observar los resultados inmediatamente (livereload).

¿Cómo empezar?
--------------

Al clonar el repositorio, podrías escribir el comando ``make``
para ver las tareas disponibles:

![](public/make.png)

Si tenes instalado nwjs, lo mejor es lanzar el comando
``make mac_test`` y en la misma consola ``make watch`` para
activar el modo livereload.

En cambio, si usas *chrome*, usá el comando ``make server`` y listo :)


Sitio Demo
-----------

Si bien esta aplicación ha sido diseñada para ser usada de forma offline, contamos
con una versión alternativa tipo demostración que funciona directamente en la
web:

http://huayralinux.github.io/huayra-ritmos

Si querés actualizar esa versión deberías ejecutar los siguientes comandos
una vez clonado el repositorio:


	ember github-pages:commit --message "Deploy de prueba." 

luego:

	git push origin gh-pages:gh-pages

