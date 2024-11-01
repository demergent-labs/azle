# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 5_473_588_724 | 4_190_025_489 | $0.0055713512 | $5_571.35         | <font color="red">+3_780_723</font> |
| 1   | ethGetBalance       | 170_663_659   | 68_855_463    | $0.0000915550 | $91.55            | <font color="red">+181_123</font>   |
| 2   | ethGetBalance       | 170_574_381   | 68_819_752    | $0.0000915076 | $91.50            | <font color="red">+131_986</font>   |
| 3   | ethGetBalance       | 170_533_048   | 68_803_219    | $0.0000914856 | $91.48            | <font color="red">+82_868</font>    |
| 4   | ethGetBlockByNumber | 169_527_532   | 68_401_012    | $0.0000909508 | $90.95            | <font color="red">+127_637</font>   |
| 5   | ethGetBlockByNumber | 169_494_470   | 68_387_788    | $0.0000909332 | $90.93            | <font color="red">+31_827</font>    |
| 6   | ethGetBlockByNumber | 169_513_486   | 68_395_394    | $0.0000909433 | $90.94            | <font color="red">+101_600</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_469_808_001 | 4_188_513_200 | $0.0055693403 | $5_569.34         |
| 1   | ethGetBalance       | 170_482_536   | 68_783_014    | $0.0000914587 | $91.45            |
| 2   | ethGetBalance       | 170_442_395   | 68_766_958    | $0.0000914374 | $91.43            |
| 3   | ethGetBalance       | 170_450_180   | 68_770_072    | $0.0000914415 | $91.44            |
| 4   | ethGetBlockByNumber | 169_399_895   | 68_349_958    | $0.0000908829 | $90.88            |
| 5   | ethGetBlockByNumber | 169_462_643   | 68_375_057    | $0.0000909163 | $90.91            |
| 6   | ethGetBlockByNumber | 169_411_886   | 68_354_754    | $0.0000908893 | $90.88            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
