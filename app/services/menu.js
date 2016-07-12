import Ember from 'ember';

/**
 * Genera un menu para toolbar tomando precaucion de no fallar
 * si se ejecuta dentro de un navegador sin soporte para node.
 */
function createMenu(options) {

  if (isNodeWebkit) {
    var gui = window.requireNode('nw.gui');
    return new gui.Menu(options);
  }

  return {};
}

/**
 * Genera un item de menu para toolbar tomando precaucion de no fallar
 * si se ejecuta dentro de un navegador sin soporte para node.
 */
function createMenuItem(options) {

  if (isNodeWebkit) {
    var gui = window.requireNode('nw.gui');
    return new gui.MenuItem(options);
  }

  return {};
}


export default Ember.Service.extend({
  // menu principal
  menubar: createMenu({type: 'menubar'}),
  // items de menu
  menuArchivo: createMenu(),
  menuOpciones: createMenu(),
  menuAyuda: createMenu(),
  // items de menu
  itemGuardar: null,
  itemGuardarComo: null,
  itemExportar: null,
  itemSalir: null,
  itemAcercaDe: null,
  itemSeparador: null,
  itemConfigurar: null,

  init() {

    if (!isNodeWebkit) {
      console.warn("Evitando crear el menu por estar fuera de nwjs.");
      return null;
    }

    var guardar = createMenuItem({
      label: 'Guardar...',
      click: function() {
        //window.fn_guardar_y_regresar();
      },
      enabled: false
    });
    this.set('itemGuardar', guardar);

    var guardar_como = createMenuItem({
      label: 'Guardar Como...',
      click: function() { },
      enabled: false
    });
    this.set('itemGuardarComo', guardar_como);

    var exportar = createMenuItem({
      label: 'Exportar...',
      click: function() { },
      enabled: false
    });
    this.set('itemExportar', exportar);

    var cerrar = createMenuItem({
      label: 'Cerrar',
      click: function() { },
      enabled: true
    });
    this.set('itemCerrar', cerrar);

    var salir = createMenuItem({
      label: 'Salir',
      click: function() {
        let gui = window.requireNode('nw.gui');
        gui.App.closeAllWindows();
      },
      enabled: true
    });

    this.set('itemSalir', salir);

    var configurar = createMenuItem({
      label: 'Configuraciones',
      click: function() { },
      enabled: true
    });
    this.set('itemConfigurar', configurar);

    var acerca_de = createMenuItem({
      label: 'Acerca de ...',
      click: function() { },
      enabled: true
    });
    this.set('itemAcercaDe', acerca_de);

    var separador = createMenuItem({type: 'separator'});
    this.set('itemSeparador', separador);

    var menu_archivo = this.get('menuArchivo');

    menu_archivo.append(guardar);
    menu_archivo.append(guardar_como);
    menu_archivo.append(exportar);
    menu_archivo.append(cerrar);
    menu_archivo.append(separador);
    menu_archivo.append(salir);


    var menu_opciones = this.get('menuOpciones');
    menu_opciones.append(configurar);

    var menu_ayuda = this.get('menuAyuda');
    menu_ayuda.append(acerca_de);

    var menubar = this.get('menubar');
    menubar.append(createMenuItem({label: 'Archivo', submenu: menu_archivo}));
    menubar.append(createMenuItem({label: 'Opciones', submenu: menu_opciones}));
    menubar.append(createMenuItem({label: 'Ayuda', submenu: menu_ayuda}));

    let gui = window.requireNode('nw.gui');
    gui.Window.get().menu = menubar;
  },

  index() {

    if (!isNodeWebkit) {
      console.warn("Evitando inicializar menu por estar fuera de nwjs.");
      return null;
    }

    var guardar = this.get('itemGuardar');
    guardar.enabled = false;
    this.set('itemGuardar', guardar);

    var guardar_como = this.get('itemGuardarComo');
    guardar_como.enabled = false;
    this.set('itemGuardarComo', guardar_como);

    var exportar = this.get('itemExportar');
    exportar.enabled = false;
    this.set('itemExportar', exportar);

    var cerrar = this.get('itemCerrar');
    cerrar.enabled = false;
    this.set('itemCerrar', cerrar);
  },

  pattern() {

    if (!isNodeWebkit) {
      console.warn("Evitando inicializar menu por estar fuera de nwjs.");
      return null;
    }

    var guardar = this.get('itemGuardar');
    guardar.enabled = true;
    this.set('itemGuardar', guardar);

    var guardar_como = this.get('itemGuardarComo');
    guardar_como.enabled = true;
    this.set('itemGuardarComo', guardar_como);

    var exportar = this.get('itemExportar');
    exportar.enabled = true;
    this.set('itemExportar', exportar);

    var cerrar = this.get('itemCerrar');
    cerrar.enabled = true;
    this.set('itemCerrar', cerrar);
  }
});
