# Benchmarks for proxy

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 95_132_295   | 38_642_918 | $0.0000513823 | $51.38            | <font color="green">-12_232</font>  |
| 1   | icrc2_approve       | 102_700_183  | 41_670_073 | $0.0000554074 | $55.40            | <font color="green">-77_047</font>  |
| 2   | icrc2_transfer_from | 100_252_542  | 40_691_016 | $0.0000541056 | $54.10            | <font color="green">-119_831</font> |
| 3   | icrc2_allowance     | 86_620_187   | 35_238_074 | $0.0000468550 | $46.85            | <font color="green">-84_240</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 95_144_527   | 38_647_810 | $0.0000513888 | $51.38            |
| 1   | icrc2_approve       | 102_777_230  | 41_700_892 | $0.0000554484 | $55.44            |
| 2   | icrc2_transfer_from | 100_372_373  | 40_738_949 | $0.0000541694 | $54.16            |
| 3   | icrc2_allowance     | 86_704_427   | 35_271_770 | $0.0000468998 | $46.89            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
