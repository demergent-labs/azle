# Benchmarks for factorial

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | fac         | 1_253_441    | 1_091_376 | $0.0000014512 | $1.45             | <font color="red">+1_440</font>  |
| 1   | fac         | 1_253_558    | 1_091_423 | $0.0000014512 | $1.45             | <font color="red">+448</font>    |
| 2   | fac         | 1_711_423    | 1_274_569 | $0.0000016948 | $1.69             | <font color="red">+1_099</font>  |
| 3   | fac         | 2_953_572    | 1_771_428 | $0.0000023554 | $2.35             | <font color="red">+4_797</font>  |
| 4   | fac         | 5_473_205    | 2_779_282 | $0.0000036955 | $3.69             | <font color="red">+10_207</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_252_001    | 1_090_800 | $0.0000014504 | $1.45             |
| 1   | fac         | 1_253_110    | 1_091_244 | $0.0000014510 | $1.45             |
| 2   | fac         | 1_710_324    | 1_274_129 | $0.0000016942 | $1.69             |
| 3   | fac         | 2_948_775    | 1_769_510 | $0.0000023529 | $2.35             |
| 4   | fac         | 5_462_998    | 2_775_199 | $0.0000036901 | $3.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
