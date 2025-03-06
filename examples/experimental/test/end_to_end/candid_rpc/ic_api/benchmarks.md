# Benchmarks for ic_api

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | dataCertificateNull | 1_680_361    | 1_262_144 | $0.0000016782 | $1.67             | <font color="red">+6_773</font> |
| 1   | setCertifiedData    | 1_215_510    | 1_076_204 | $0.0000014310 | $1.43             | <font color="red">+7_518</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | dataCertificateNull | 1_673_588    | 1_259_435 | $0.0000016746 | $1.67             |
| 1   | setCertifiedData    | 1_207_992    | 1_073_196 | $0.0000014270 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
