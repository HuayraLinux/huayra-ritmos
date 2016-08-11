import Ember from 'ember';

const {Menu} = require('electron').remote;

export default Ember.Service.extend(Ember.Evented, {
  // menu principal
  menu: null,

  init() {
    /* Si se modifica esto se tiene que modificar unknownProperty (por ahora) */
    const template = [
      {
        label: 'Archivo',
        submenu: [
          {
            label: 'Guardar...',
            click: this.trigger.bind(this, 'guardar'),
            enabled: false
          },
          {
            label: 'Guardar Como...',
            click: this.trigger.bind(this, 'guardar_como'),
            enabled: false
          },
          {
            label: 'Exportar...',
            click: this.trigger.bind(this, 'exportar'),
            enabled: false
          },
          {
            label: 'Importar...',
            click: this.trigger.bind(this, 'importar'),
            enabled: true
          },
          {
            label: 'Cerrar',
            click: this.trigger.bind(this, 'cerrar'),
            enabled: true
          },
          {
            type: 'separator'
          },
          {
            label: 'Salir',
            role: 'quit',
            enabled: true
          },
        ]
      },
      {
        label: 'Opciones',
        submenu: [
          {
            label: 'Configuraciones',
            click: this.trigger.bind(this, 'configurar'),
            enabled: true
          }
        ]
      },
      {
        label: 'Ayuda',
        submenu: [
          {
            label: 'Acerca de...',
            click: this.trigger.bind(this, 'acerca_de'),
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    this.set('menu', menu);
  },

  index() {
    this.set('guardar.enabled', false);
    this.set('guardar_como.enabled', false);
    this.set('exportar.enabled', false);
    this.set('cerrar.enabled', false);
  },

  pattern() {
    this.set('guardar.enabled', true);
    this.set('guardar_como.enabled', true);
    this.set('exportar.enabled', true);
    this.set('cerrar.enabled', true);
  },

  unknownProperty(key) {
    /* Esta es una lista de cómo acceder a cada ítem del menu
     * debería poder hacerse una solución mejor (que no requiera
     * modificar esta tabla cada vez que se agrega un ítem).
     */
     const menuAccess = {
      guardar:      [0, 0],
      guardar_como: [0, 1],
      exportar:     [0, 2],
      importar:     [0, 3],
      cerrar:       [0, 4],
      salir:        [0, 6],
      configurar:   [1, 0],
      acerca_de:    [2, 0]
    };
    let ubicacion = menuAccess[key];

    if(ubicacion === undefined) {
      return undefined;
    } else {
      return this.get('menu').items[ubicacion[0]].submenu.items[ubicacion[1]];
    }
  }
});
