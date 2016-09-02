export function initialize(/* application */) {
  /* Esto es horrible, pero necesito cambiarlo para que la app de ember y node usen el mismo
   * punto de partida para el path relativo.
   */
  let inElectron = (window && window.process && window.process.type) === "renderer";

  if(inElectron) {
  	process.chdir(__dirname);
  }
}

export default {
  name: 'set-node-dir',
  initialize
};
