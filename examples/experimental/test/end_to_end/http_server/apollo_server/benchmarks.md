# Benchmarks for apollo_server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions   | Cycles        | USD           | USD/Million Calls | Change                           |
| --- | ----------- | -------------- | ------------- | ------------- | ----------------- | -------------------------------- |
| 0   | init        | 11_085_082_528 | 8_834_623_011 | $0.0117471332 | $11_747.13        | <font color="red">+60_910</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 11_085_021_618 | 8_834_598_647 | $0.0117471008 | $11_747.10        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
