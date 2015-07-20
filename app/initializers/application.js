import naturalSort from '../utils/natural-sort';


export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  naturalSort();
}

export default {
  name: 'application',
  initialize: initialize
};
