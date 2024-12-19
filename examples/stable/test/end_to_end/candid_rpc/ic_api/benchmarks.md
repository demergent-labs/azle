# Benchmarks for ic_api

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | dataCertificateNull | 1_638_799    | 1_245_519 | $0.0000016561 | $1.65             | <font color="green">-5_959</font> |
| 1   | setCertifiedData    | 1_198_794    | 1_069_517 | $0.0000014221 | $1.42             | <font color="red">+29_170</font>  |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | dataCertificateNull | 1_644_758    | 1_247_903 | $0.0000016593 | $1.65             |
| 1   | setCertifiedData    | 1_169_624    | 1_057_849 | $0.0000014066 | $1.40             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
