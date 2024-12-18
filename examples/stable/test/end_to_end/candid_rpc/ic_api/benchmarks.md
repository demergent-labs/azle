# Benchmarks for ic_api

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | dataCertificateNull | 1_638_799    | 1_245_519 | $0.0000016561 | $1.65             | <font color="green">-28_153</font> |
| 1   | setCertifiedData    | 1_198_794    | 1_069_517 | $0.0000014221 | $1.42             | <font color="green">-35_066</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | dataCertificateNull | 1_666_952    | 1_256_780 | $0.0000016711 | $1.67             |
| 1   | setCertifiedData    | 1_233_860    | 1_083_544 | $0.0000014408 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
