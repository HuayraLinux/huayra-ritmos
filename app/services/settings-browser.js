import Ember from 'ember';

export default Ember.Service.extend({
  userHome: '',
  configPath: '',
  config: null,
  getUserPrefix: '',

  setUserPrefix(newPath){
    this.set('getUserPrefix', newPath);
  },

  getPrefix() {
    return '';
  }
});
