# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade | 7_528_824_957 | 5_812_119_982 | $0.0077282016 | $7_728.20         | <font color="green">-120_022</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade | 7_528_944_979 | 5_812_167_991 | $0.0077282654 | $7_728.26         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
