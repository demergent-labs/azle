# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | icrc1_transfer      | 15_755_588   | 6_892_235 | $0.0000091644 | $9.16             | <font color="red">+945_913</font>   |
| 1   | icrc2_approve       | 19_421_532   | 8_358_612 | $0.0000111142 | $11.11            | <font color="red">+1_154_994</font> |
| 2   | icrc2_transfer_from | 18_340_973   | 7_926_389 | $0.0000105395 | $10.53            | <font color="red">+1_284_800</font> |
| 3   | icrc2_allowance     | 10_659_637   | 4_853_854 | $0.0000064540 | $6.45             | <font color="red">+789_499</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 14_809_675   | 6_513_870 | $0.0000086613 | $8.66             |
| 1   | icrc2_approve       | 18_266_538   | 7_896_615 | $0.0000104999 | $10.49            |
| 2   | icrc2_transfer_from | 17_056_173   | 7_412_469 | $0.0000098561 | $9.85             |
| 3   | icrc2_allowance     | 9_870_138    | 4_538_055 | $0.0000060341 | $6.03             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
