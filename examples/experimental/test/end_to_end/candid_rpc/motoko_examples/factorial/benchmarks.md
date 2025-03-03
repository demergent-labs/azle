# Benchmarks for factorial

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | fac         | 1_256_550    | 1_092_620 | $0.0000014528 | $1.45             | <font color="red">+3_492</font>  |
| 1   | fac         | 1_257_741    | 1_093_096 | $0.0000014535 | $1.45             | <font color="red">+5_164</font>  |
| 2   | fac         | 1_718_018    | 1_277_207 | $0.0000016983 | $1.69             | <font color="red">+5_263</font>  |
| 3   | fac         | 2_967_599    | 1_777_039 | $0.0000023629 | $2.36             | <font color="red">+18_243</font> |
| 4   | fac         | 5_520_424    | 2_798_169 | $0.0000037206 | $3.72             | <font color="red">+55_850</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_253_058    | 1_091_223 | $0.0000014510 | $1.45             |
| 1   | fac         | 1_252_577    | 1_091_030 | $0.0000014507 | $1.45             |
| 2   | fac         | 1_712_755    | 1_275_102 | $0.0000016955 | $1.69             |
| 3   | fac         | 2_949_356    | 1_769_742 | $0.0000023532 | $2.35             |
| 4   | fac         | 5_464_574    | 2_775_829 | $0.0000036909 | $3.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
