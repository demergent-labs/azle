# Benchmarks for proxy

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | icrc1_transfer      | 95_314_918   | 38_715_967 | $0.0000514795 | $51.47            | <font color="red">+130_319</font> |
| 1   | icrc2_approve       | 102_897_690  | 41_749_076 | $0.0000555125 | $55.51            | <font color="red">+123_565</font> |
| 2   | icrc2_transfer_from | 100_417_824  | 40_757_129 | $0.0000541935 | $54.19            | <font color="red">+12_988</font>  |
| 3   | icrc2_allowance     | 86_801_557   | 35_310_622 | $0.0000469515 | $46.95            | <font color="red">+125_060</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 95_184_599   | 38_663_839 | $0.0000514101 | $51.41            |
| 1   | icrc2_approve       | 102_774_125  | 41_699_650 | $0.0000554468 | $55.44            |
| 2   | icrc2_transfer_from | 100_404_836  | 40_751_934 | $0.0000541866 | $54.18            |
| 3   | icrc2_allowance     | 86_676_497   | 35_260_598 | $0.0000468850 | $46.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
