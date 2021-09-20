/**
 * Gets actual event target works with opetn shadow DOM or regular
 * The first one is where event originated
 */
export function getEventTarget(event: Event): Node {
    if ('composedPath' in event) {
        return (event as any).composedPath()[0];
    }

    return (event as any).target;
}
