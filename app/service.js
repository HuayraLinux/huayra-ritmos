import Ember from 'ember';

/* Este módulo implementa una inyección de dependencia
 * muy similar a ember.inject.service(), pero con un selector
 * de servicio dependiente del entorno: Si se ejecuta dentro
 * de electron, usará el servicio cuyo nombre termine con electron y si está
 * en un navegador (o ejecutando tests) retornará el servicio
 * normal (cuyo nombre termina con browser).
 */
export default function service(nombre) {
  let inElectron = (window && window.process && window.process.type);
  let modulo;

  if (inElectron === "renderer") {
    modulo = `${nombre}-electron`;
  } else {
    modulo = `${nombre}-browser`;
  }

  console.log(`Inyectando servicio ${modulo}`);

  return Ember.inject.service(modulo);
}
