import Ember from 'ember';

/* Compara el primer item con el resto */
export function isEqual(params, hash) {
  /* Dice si es igual al primer ítem */
  var first = params[0];
  var rest = params.slice(1);
  var equalsTheFirst = (cosa) => cosa === first;

  return hash.someone === true || hash.everyone === false ?
    rest.some(equalsTheFirst) :
    rest.every(equalsTheFirst);
}

export default Ember.HTMLBars.makeBoundHelper(isEqual);
