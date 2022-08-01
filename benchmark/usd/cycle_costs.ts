// https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs/
export const CYCLE_COST_TABLE = {
    COMPUTE_PERCENT_ALLOCATED_PER_SECOND: 100_000,
    UPDATE_MESSAGE_EXECUTION: 590_000,
    TEN_UPDATE_INSTRUCTIONS_EXECUTION: 4,
    XNET_CALL: 260_000,
    XNET_BYTE_TRANSMISSION: 1_000,
    INGRESS_MESSAGE_RECEPTION: 1_200_000,
    INGRESS_BYTE_RECEPTION: 2_000,
    GB_STORAGE_PER_SECOND: 127_000
};

const CYCLES_PER_XDR = 1_000_000_000_000;

const USD_XDR_EXCHANGE_RATE = 1.32; // Updated July 27, 2022 https://www.imf.org/external/np/fin/data/rms_sdrv.aspx
export const USD_PER_CYCLE = USD_XDR_EXCHANGE_RATE / CYCLES_PER_XDR;
