# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 6_033_236_674 | 4_813_884_669 | $0.0064008780 | $6_400.87         |
| 1   | icrc1_transfer      | 96_949_027    | 39_369_610    | $0.0000523486 | $52.34            |
| 2   | icrc2_approve       | 104_595_388   | 42_428_155    | $0.0000564154 | $56.41            |
| 3   | icrc2_transfer_from | 102_258_567   | 41_493_426    | $0.0000551726 | $55.17            |
| 4   | icrc2_allowance     | 88_475_662    | 35_980_264    | $0.0000478419 | $47.84            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
