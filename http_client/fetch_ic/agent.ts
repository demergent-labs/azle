import { Agent, HttpAgent, Identity } from '@dfinity/agent';

export async function getAgent(identity: Identity): Promise<Agent> {
    const runningLocally =
        window.location.host.includes(`localhost:`) ||
        window.location.host.includes(`127.0.0.1:`);

    const host = runningLocally === false ? 'http://icp-api.io' : undefined;

    const agent = new HttpAgent({
        host,
        identity
    });

    if (runningLocally === true) {
        await agent.fetchRootKey();
    }

    return agent;
}
