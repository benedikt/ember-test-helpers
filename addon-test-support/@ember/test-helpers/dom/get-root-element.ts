import { getContext } from '../setup-context';
import { isDocument, isElement } from './-target';

/**
  Get the root element of the application under test (usually `#ember-testing`)

  @public
  @returns {Element} the root element
*/
export default function getRootElement(): Element | Document {
  let context = getContext();
  let owner = context && context.owner;

  if (!owner) {
    throw new Error('Must setup rendering context before attempting to interact with elements.');
  }

  let rootElement;
  // When the host app uses `setApplication` (instead of `setResolver`) the owner has
  // a `rootElement` set on it with the element or id to be used
  if (owner && owner._emberTestHelpersMockOwner === undefined) {
    rootElement = owner.rootElement;
  } else {
    rootElement = '#ember-testing';
  }

  if (isElement(rootElement) || isDocument(rootElement) || rootElement instanceof Window) {
    return rootElement;
  } else if (typeof rootElement === 'string') {
    let _rootElement = document.querySelector(rootElement);
    if (_rootElement) {
      return _rootElement;
    }

    throw new Error(`Application.rootElement (${rootElement}) not found`);
  } else {
    throw new Error('Application.rootElement must be an element or a selector string');
  }
}
