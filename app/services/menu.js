import Ember from 'ember';

//var gui = require('nw.gui');
var gui = window.requireNode('nw.gui');


export default Ember.Service.extend({
    // menu principal
    menubar: new gui.Menu({ type: 'menubar' }),
    // items de menu
    menuArchivo: new gui.Menu(),
    menuAyuda: new gui.Menu(),
    // opciones de items de menu
    itemGuardar: null,
    itemGuardarComo: null,
    itemSeparador: null,
    itemSalir: null,
    itemAcercaDe: null,
    init(){
        var guardar = new gui.MenuItem({
            label: 'Guardar...',
            click: function() {
                //window.fn_guardar_y_regresar();
            },
            enabled: false
        });
        this.set('itemGuardar', guardar);

        var guardar_como = new gui.MenuItem({
            label: 'Guardar Como...',
            click: function() {
                //window.fn_guardar_y_regresar();
            },
            enabled: false
        });
        this.set('itemGuardarComo', guardar_como);

        var cerrar = new gui.MenuItem({
            label: 'Cerrar',
            click: function() {
                //gui.App.closeAllWindows();
            },
            enabled: true
        });
        this.set('itemCerrar', cerrar);

        var salir = new gui.MenuItem({
            label: 'Salir',
            click: function() {
                gui.App.closeAllWindows();
            },
            enabled: true
        });
        this.set('itemSalir', salir);

        var acerca_de = new gui.MenuItem({
            label: 'Acerca de ...',
            click: function() {
                alert('Huayra-Ritmos!');
            },
            enabled: true
        });
        this.set('itemAcercaDe', acerca_de);

        var separador = new gui.MenuItem({type: 'separator'});
        this.set('itemSeparador', separador);

        var menu_archivo = this.get('menuArchivo');
        menu_archivo.append(guardar);
        menu_archivo.append(guardar_como);
        menu_archivo.append(cerrar);
        menu_archivo.append(separador);
        menu_archivo.append(salir);

        var menu_ayuda = this.get('menuAyuda');
        menu_ayuda.append(acerca_de);

        var menubar = this.get('menubar');
        menubar.append(new gui.MenuItem({ label: 'Archivo', submenu: menu_archivo}));
        menubar.append(new gui.MenuItem({ label: 'Ayuda', submenu: menu_ayuda}));

        gui.Window.get().menu = menubar;
    },
    index(){
        var guardar = this.get('itemGuardar');
        guardar.enabled = false;
        this.set('itemGuardar', guardar);

        var guardar_como = this.get('itemGuardarComo');
        guardar_como.enabled = false;
        this.set('itemGuardarComo', guardar_como);

        var cerrar = this.get('itemCerrar');
        cerrar.enabled = false;
        this.set('itemCerrar', cerrar);
    },
    pattern(){
        var guardar = this.get('itemGuardar');
        guardar.enabled = true;
        this.set('itemGuardar', guardar);

        var guardar_como = this.get('itemGuardarComo');
        guardar_como.enabled = true;
        this.set('itemGuardarComo', guardar_como);

        var cerrar = this.get('itemCerrar');
        cerrar.enabled = true;
        this.set('itemCerrar', cerrar);
    }
});
