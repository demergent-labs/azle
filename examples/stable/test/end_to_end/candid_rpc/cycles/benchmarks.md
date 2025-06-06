⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for cycles

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | receiveCycles | 1_612_215    | 1_234_886 | $0.0000016420 | $1.64             | <font color="red">+2_602</font> |
| 1   | receiveCycles | 1_606_132    | 1_232_452 | $0.0000016388 | $1.63             | <font color="green">-277</font> |
| 2   | receiveCycles | 1_607_399    | 1_232_959 | $0.0000016394 | $1.63             | <font color="green">-940</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_609_613    | 1_233_845 | $0.0000016406 | $1.64             |
| 1   | receiveCycles | 1_606_409    | 1_232_563 | $0.0000016389 | $1.63             |
| 2   | receiveCycles | 1_608_339    | 1_233_335 | $0.0000016399 | $1.63             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | sendCycles       | 1_411_465    | 1_154_586 | $0.0000015352 | $1.53             | <font color="red">+50_603</font> |
| 1   | sendCyclesNotify | 1_723_845    | 1_279_538 | $0.0000017014 | $1.70             | <font color="red">+3_725</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_360_862    | 1_134_344 | $0.0000015083 | $1.50             |
| 1   | sendCyclesNotify | 1_720_120    | 1_278_048 | $0.0000016994 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
