# Benchmarks for call_raw

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | executeCallRaw | 1_574_361    | 1_219_744 | $0.0000016219 | $1.62             | <font color="red">+44_032</font> |
| 1   | executeCallRaw | 2_081_070    | 1_422_428 | $0.0000018914 | $1.89             | <font color="red">+49_578</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | executeCallRaw | 1_530_329    | 1_202_131 | $0.0000015984 | $1.59             |
| 1   | executeCallRaw | 2_031_492    | 1_402_596 | $0.0000018650 | $1.86             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
