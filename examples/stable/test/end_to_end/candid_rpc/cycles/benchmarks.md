# Benchmarks for cycles

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveCycles | 1_609_613    | 1_233_845 | $0.0000016406 | $1.64             | <font color="green">-19_888</font> |
| 1   | receiveCycles | 1_606_409    | 1_232_563 | $0.0000016389 | $1.63             | <font color="green">-12_282</font> |
| 2   | receiveCycles | 1_608_339    | 1_233_335 | $0.0000016399 | $1.63             | <font color="green">-8_483</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_629_501    | 1_241_800 | $0.0000016512 | $1.65             |
| 1   | receiveCycles | 1_618_691    | 1_237_476 | $0.0000016454 | $1.64             |
| 2   | receiveCycles | 1_616_822    | 1_236_728 | $0.0000016444 | $1.64             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendCycles       | 1_360_820    | 1_134_328 | $0.0000015083 | $1.50             | <font color="green">-7_246</font>  |
| 1   | sendCyclesNotify | 1_720_120    | 1_278_048 | $0.0000016994 | $1.69             | <font color="green">-11_353</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_368_066    | 1_137_226 | $0.0000015121 | $1.51             |
| 1   | sendCyclesNotify | 1_731_473    | 1_282_589 | $0.0000017054 | $1.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
