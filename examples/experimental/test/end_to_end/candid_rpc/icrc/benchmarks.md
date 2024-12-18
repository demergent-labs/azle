# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_612_140_019 | 4_245_446_007 | $0.0056450422 | $5_645.04         |
| 1   | icrc1_transfer      | 97_167_851    | 39_457_140    | $0.0000524650 | $52.46            |
| 2   | icrc2_approve       | 104_763_011   | 42_495_204    | $0.0000565046 | $56.50            |
| 3   | icrc2_transfer_from | 102_401_677   | 41_550_670    | $0.0000552487 | $55.24            |
| 4   | icrc2_allowance     | 88_604_050    | 36_031_620    | $0.0000479102 | $47.91            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
