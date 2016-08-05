import Ember from 'ember';

/* Este módulo implementa una inyección de dependencia
 * muy similar a ember.inject.service(), pero con un selector
 * de servicio dependiente del entorno: Si se ejecuta dentro
 * de nwjs, usará el servicio terminado con nwjs y si está
 * en un navegador (o ejecutando tests) retornará el servicio
 * normal.
 */
export default function service(nombre) {
  let modulo;

  let isNodeWebkit = false;

  if (isNodeWebkit) {
    modulo = `${nombre}-nwjs`;
  } else {
    modulo = `${nombre}-browser`;
  }

  return Ember.inject.service(modulo);
}
