# Benchmarks for cycles

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveCycles | 1_629_501    | 1_241_800 | $0.0000016512 | $1.65             | <font color="red">+6_351</font>    |
| 1   | receiveCycles | 1_618_691    | 1_237_476 | $0.0000016454 | $1.64             | <font color="green">-12_548</font> |
| 2   | receiveCycles | 1_616_822    | 1_236_728 | $0.0000016444 | $1.64             | <font color="green">-12_912</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_623_150    | 1_239_260 | $0.0000016478 | $1.64             |
| 1   | receiveCycles | 1_631_239    | 1_242_495 | $0.0000016521 | $1.65             |
| 2   | receiveCycles | 1_629_734    | 1_241_893 | $0.0000016513 | $1.65             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | sendCycles       | 1_368_066    | 1_137_226 | $0.0000015121 | $1.51             | <font color="green">-498_498</font> |
| 1   | sendCyclesNotify | 1_731_473    | 1_282_589 | $0.0000017054 | $1.70             | <font color="green">-458_628</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_866_564    | 1_336_625 | $0.0000017773 | $1.77             |
| 1   | sendCyclesNotify | 2_190_101    | 1_466_040 | $0.0000019493 | $1.94             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
