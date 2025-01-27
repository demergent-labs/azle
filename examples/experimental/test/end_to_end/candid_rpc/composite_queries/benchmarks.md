# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init         | 5_502_714_398 | 4_201_675_759 | $0.0055868422 | $5_586.84         | <font color="red">+3_505_500</font> |
| 1   | simpleUpdate | 11_321_957    | 5_118_782     | $0.0000068063 | $6.80             | <font color="green">-641_685</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | init         | 5_499_208_898 | 4_200_273_559 | $0.0055849777 | $5_584.97         |
| 1   | simpleUpdate | 11_963_642    | 5_375_456     | $0.0000071476 | $7.14             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
