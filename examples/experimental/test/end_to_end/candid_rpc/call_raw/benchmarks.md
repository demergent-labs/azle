# Benchmarks for call_raw

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | executeCallRaw | 1_529_682    | 1_201_872 | $0.0000015981 | $1.59             | <font color="green">-2_769</font> |
| 1   | executeCallRaw | 2_033_417    | 1_403_366 | $0.0000018660 | $1.86             | <font color="green">-4_808</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | executeCallRaw | 1_532_451    | 1_202_980 | $0.0000015996 | $1.59             |
| 1   | executeCallRaw | 2_038_225    | 1_405_290 | $0.0000018686 | $1.86             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
