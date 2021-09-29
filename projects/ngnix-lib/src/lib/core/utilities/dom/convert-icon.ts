const START = '<svg';
const WIDTH_START = 'width="';
const HEIGHT_START = 'height="';

export function convertIcon(source: string, name: string): string {
  // short circuit
  if (source.includes(`id="${name}"`)) {
    return source;
  }
  const src = source.substring(source.indexOf(START));
  // attributes grab everything in <svg x="50%" y="50%">
  const attributes = src.substring(0, src.indexOf('>'));

  // The <g> SVG element is a container used to group other SVG elements.
  if (
    !attributes ||
    !attributes.includes(WIDTH_START) ||
    !attributes.includes(HEIGHT_START)
  ) {
    return (
      src.replace(
        START,
        `<svg xmlns="http://www.w3.org/2000/svg"><g id="${name}" xmlns="http://www.w3.org/2000/svg"><svg`,
      ) + '</g></svg>'
    );
  }

  const indexOfWidth = attributes.indexOf(WIDTH_START);
  const indexOfHeight = attributes.indexOf(HEIGHT_START);
  const widthOffset = indexOfWidth + WIDTH_START.length;
  const heightOffset = indexOfHeight + HEIGHT_START.length;
  const widthString = attributes.substring(
    widthOffset,
    attributes.indexOf('"', widthOffset),
  );
  const heightString = attributes.substring(
    heightOffset,
    attributes.indexOf('"', heightOffset),
  );

  if (
    !heightString ||
    !widthString ||
    widthString.includes('%') ||
    heightString.includes('%')
  ) {
    return src.replace(START, `<svg id="${name}"`);
  }

  const width = parseInt(widthString, 10);
  const height = parseInt(heightString, 10);
  const transform = `translate(-${width / 2},-${height / 2})`;

  return `<g id="${name}" xmlns="http://www.w3.org/2000/svg" transform="${transform}"><svg x="50%" y="50%">${src}</svg></g>`;
}
