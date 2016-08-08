import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    track: null,
    onSave: null,
    onRemove: null,
    /* Valores a editar */
    volume: null,
    sound: null,
    color: null,
    title: Ember.computed('track', function() {
        var magic = /^(?:[^/]*\/)*(?:([^.].*)\.[^.]*|(.*))$/;
        var path = this.get('track.sound');
        var match = magic.exec(path);
        return match[1] || match[2];
    }),

    onInit: Ember.on('init', function() {
        this.set('volume', this.get('track.volume'));
        this.set('sound', this.get('track.sound'));
        this.set('color', this.get('track.color'));
    }),

    actions: {

        setSound(sound) {
            this.set('sound', sound.audioClip.file);
        },
        setColor(color) {
            this.set('color', color);
        },

        saveTrack() {
            this.sendAction('onSave', this.get('track'), {
                volume: this.get('volume'),
                sound: this.get('sound'),
                color: this.get('color')
            });
        },

        removeTrack() {
            this.sendAction('onRemove', this.get('track'));
        },
    }
});
