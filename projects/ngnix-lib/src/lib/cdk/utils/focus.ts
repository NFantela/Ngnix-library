/**
 * Returns current active element, including shadow dom
 * @return element or null
 */
export function getNativeFocused(documentRef: Document): Element | null {
  if (!documentRef.activeElement || !documentRef.activeElement.shadowRoot) {
    return documentRef.activeElement;
  }

  let element = documentRef.activeElement.shadowRoot.activeElement;

  while (element && element.shadowRoot) {
    element = element.shadowRoot.activeElement;
  }

  return element;
}

/**
 * Checks if element is focused.
 * Could return true even after blur since element remains focused if you switch away from a browser tab.
 *
 * @param node or null (as a common return value of DOM nodes walking)
 * @return true if focused
 */
export function isNativeFocused(node: Node | null): boolean {
  return (
    !!node && !!node.ownerDocument && getNativeFocused(node.ownerDocument) === node
  );
}
