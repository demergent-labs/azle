# Benchmarks for factorial

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_253_058    | 1_091_223 | $0.0000014510 | $1.45             | <font color="green">-4_333</font>  |
| 1   | fac         | 1_252_577    | 1_091_030 | $0.0000014507 | $1.45             | <font color="green">-6_107</font>  |
| 2   | fac         | 1_712_755    | 1_275_102 | $0.0000016955 | $1.69             | <font color="green">-6_457</font>  |
| 3   | fac         | 2_949_356    | 1_769_742 | $0.0000023532 | $2.35             | <font color="green">-13_177</font> |
| 4   | fac         | 5_464_574    | 2_775_829 | $0.0000036909 | $3.69             | <font color="green">-29_632</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_257_391    | 1_092_956 | $0.0000014533 | $1.45             |
| 1   | fac         | 1_258_684    | 1_093_473 | $0.0000014540 | $1.45             |
| 2   | fac         | 1_719_212    | 1_277_684 | $0.0000016989 | $1.69             |
| 3   | fac         | 2_962_533    | 1_775_013 | $0.0000023602 | $2.36             |
| 4   | fac         | 5_494_206    | 2_787_682 | $0.0000037067 | $3.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
