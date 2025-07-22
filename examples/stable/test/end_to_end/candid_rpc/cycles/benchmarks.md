# Benchmarks for cycles

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | receiveCycles | 1_297_084    | 1_108_833 | $0.0000014744 | $1.47             | <font color="green">-315_131</font> |
| 1   | receiveCycles | 1_362_026    | 1_134_810 | $0.0000015089 | $1.50             | <font color="green">-244_106</font> |
| 2   | receiveCycles | 1_360_495    | 1_134_198 | $0.0000015081 | $1.50             | <font color="green">-246_904</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_612_215    | 1_234_886 | $0.0000016420 | $1.64             |
| 1   | receiveCycles | 1_606_132    | 1_232_452 | $0.0000016388 | $1.63             |
| 2   | receiveCycles | 1_607_399    | 1_232_959 | $0.0000016394 | $1.63             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendCycles       | 1_341_073    | 1_126_429 | $0.0000014978 | $1.49             | <font color="green">-70_392</font> |
| 1   | sendCyclesNotify | 1_686_679    | 1_264_671 | $0.0000016816 | $1.68             | <font color="green">-37_166</font> |

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
