# Benchmarks for factorial

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | fac         | 1_253_584    | 1_091_433 | $0.0000014512 | $1.45             | <font color="red">+1_790</font>   |
| 1   | fac         | 1_255_034    | 1_092_013 | $0.0000014520 | $1.45             | <font color="red">+4_351</font>   |
| 2   | fac         | 1_712_024    | 1_274_809 | $0.0000016951 | $1.69             | <font color="red">+4_170</font>   |
| 3   | fac         | 2_945_331    | 1_768_132 | $0.0000023510 | $2.35             | <font color="red">+4_396</font>   |
| 4   | fac         | 5_465_355    | 2_776_142 | $0.0000036914 | $3.69             | <font color="green">-2_231</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_251_794    | 1_090_717 | $0.0000014503 | $1.45             |
| 1   | fac         | 1_250_683    | 1_090_273 | $0.0000014497 | $1.44             |
| 2   | fac         | 1_707_854    | 1_273_141 | $0.0000016929 | $1.69             |
| 3   | fac         | 2_940_935    | 1_766_374 | $0.0000023487 | $2.34             |
| 4   | fac         | 5_467_586    | 2_777_034 | $0.0000036925 | $3.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
