# Benchmarks for factorial

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_251_794    | 1_090_717 | $0.0000014503 | $1.45             | <font color="green">-4_756</font>  |
| 1   | fac         | 1_250_683    | 1_090_273 | $0.0000014497 | $1.44             | <font color="green">-7_058</font>  |
| 2   | fac         | 1_707_854    | 1_273_141 | $0.0000016929 | $1.69             | <font color="green">-10_164</font> |
| 3   | fac         | 2_940_935    | 1_766_374 | $0.0000023487 | $2.34             | <font color="green">-26_664</font> |
| 4   | fac         | 5_467_586    | 2_777_034 | $0.0000036925 | $3.69             | <font color="green">-52_838</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_256_550    | 1_092_620 | $0.0000014528 | $1.45             |
| 1   | fac         | 1_257_741    | 1_093_096 | $0.0000014535 | $1.45             |
| 2   | fac         | 1_718_018    | 1_277_207 | $0.0000016983 | $1.69             |
| 3   | fac         | 2_967_599    | 1_777_039 | $0.0000023629 | $2.36             |
| 4   | fac         | 5_520_424    | 2_798_169 | $0.0000037206 | $3.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
