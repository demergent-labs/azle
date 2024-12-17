export const P2WPKH_ADDRESS_FORM =
    'bcrt1qcxzt0xpf8qe3q75rsd30thrhgwzddy85f0cu4w';

export async function getP2wpkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2wpkh-address`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return await response.text();
}
