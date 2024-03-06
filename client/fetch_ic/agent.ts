import { Agent, HttpAgent, Identity } from '@dfinity/agent';

// TODO actually I think we want to get the host from the URL maybe...
// TODO but what if they use a custom domain? Maybe they really need to set this...
// TODO this is a bit of a bummer though
// TODO maybe we can detect the canister id scheme and use that automatically
// TODO and then allow them to set an environment variable if they are using a custom domain
export async function getAgent(identity: Identity): Promise<Agent> {
    // TODO we need to infer all of this first
    // TODO if VITE_CANISTER_ORIGIN exists then use that, otherwise we must get it from the URL
    const agent = new HttpAgent({
        host: import.meta.env.VITE_CANISTER_ORIGIN,
        identity
    });

    // TODO make this a little bit more robust, check for dots and ports maybe
    if (
        import.meta.env.VITE_CANISTER_ORIGIN?.includes(`localhost`) ||
        import.meta.env.VITE_CANISTER_ORIGIN?.includes(`127.0.0.1`)
    ) {
        await agent.fetchRootKey();
    }

    return agent;
}
