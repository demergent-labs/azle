# Benchmarks for whoami

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade | 1_014_492_637 | 806_387_054 | $0.0010722287 | $1_072.22         | <font color="green">-331_341_819</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade | 1_345_834_456 | 938_923_782 | $0.0012484588 | $1_248.45         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
