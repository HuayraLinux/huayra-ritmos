export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  window.p5Instance = new p5();
}

export default {
  name: 'p5',
  initialize
};
