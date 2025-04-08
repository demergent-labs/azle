# Benchmarks for call_raw

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCallRaw | 1_664_104    | 1_255_641 | $0.0000016696 | $1.66             | <font color="red">+51_600</font> |
| 1   | executeCallRaw | 2_118_346    | 1_437_338 | $0.0000019112 | $1.91             | <font color="red">+51_852</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | executeCallRaw | 1_612_504    | 1_235_001 | $0.0000016421 | $1.64             |
| 1   | executeCallRaw | 2_066_494    | 1_416_597 | $0.0000018836 | $1.88             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
