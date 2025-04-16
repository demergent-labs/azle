# Benchmarks for ic_api

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | dataCertificateNull | 1_677_422    | 1_260_968 | $0.0000016767 | $1.67             | <font color="green">-4_479</font> |
| 1   | setCertifiedData    | 1_208_629    | 1_073_451 | $0.0000014273 | $1.42             | <font color="green">-9_080</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | dataCertificateNull | 1_681_901    | 1_262_760 | $0.0000016791 | $1.67             |
| 1   | setCertifiedData    | 1_217_709    | 1_077_083 | $0.0000014322 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
