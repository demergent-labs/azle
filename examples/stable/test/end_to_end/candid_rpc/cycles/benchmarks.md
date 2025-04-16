# Benchmarks for cycles

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | receiveCycles | 1_615_487    | 1_236_194 | $0.0000016437 | $1.64             | <font color="red">+3_272</font> |
| 1   | receiveCycles | 1_610_803    | 1_234_321 | $0.0000016412 | $1.64             | <font color="red">+4_671</font> |
| 2   | receiveCycles | 1_609_623    | 1_233_849 | $0.0000016406 | $1.64             | <font color="red">+2_224</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_612_215    | 1_234_886 | $0.0000016420 | $1.64             |
| 1   | receiveCycles | 1_606_132    | 1_232_452 | $0.0000016388 | $1.63             |
| 2   | receiveCycles | 1_607_399    | 1_232_959 | $0.0000016394 | $1.63             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendCycles       | 1_410_337    | 1_154_134 | $0.0000015346 | $1.53             | <font color="green">-1_128</font> |
| 1   | sendCyclesNotify | 1_724_254    | 1_279_701 | $0.0000017016 | $1.70             | <font color="red">+409</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_411_465    | 1_154_586 | $0.0000015352 | $1.53             |
| 1   | sendCyclesNotify | 1_723_845    | 1_279_538 | $0.0000017014 | $1.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
