/**
 * This file provides an `initAll` function that will trawl through the page,
 * pick up any modules it knows have associated JS, and will initialise the JS
 * class on that component. It will only do this if the component is explicitly
 * listed here, and only if it finds the component on the page, however it
 * loads the JS for *ALL* components, as they're all imported at once.
 *
 * You can keep JS filesizes small by creating different entry files that only
 * include the components needed for a page or section.
 *
 * This file also exports all component classes so that they can be initialized
 * individually, if necessary.
 *
 * `window.theNamespace.initAll()` (where `theNamespace` is the configured name
 * of the npm package.)
 */

// import Datepicker from '../../components/datepicker/datepicker';

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  // scope.querySelectorAll('[data-module="kickstart-datepicker"]').forEach(datepicker => {
  // 	new Datepicker(datepicker);
  // });
}

export { initAll };
