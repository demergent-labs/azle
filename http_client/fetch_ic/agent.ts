import { Agent, HttpAgent, Identity } from '@dfinity/agent';

export async function createAgent(
    identity: Identity,
    host: string
): Promise<Agent> {
    const runningLocally =
        host.includes(`localhost:`) || host.includes(`127.0.0.1:`);

    const agent = new HttpAgent({
        host,
        identity
    });

    if (runningLocally === true) {
        await agent.fetchRootKey();
    }

    return agent;
}
