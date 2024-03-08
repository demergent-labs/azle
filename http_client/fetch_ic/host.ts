export function getHostFromBrowser(): string {
    const runningLocally =
        window.location.host.includes(`localhost:`) ||
        window.location.host.includes(`127.0.0.1:`);

    const host =
        runningLocally === true ? window.location.host : 'http://icp-api.io';

    return host;
}
