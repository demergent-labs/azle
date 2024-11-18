# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 5_473_573_238 | 4_190_019_295 | $0.0055713430 | $5_571.34         | <font color="red">+3_765_237</font> |
| 1   | ethGetBalance       | 170_475_528   | 68_780_211    | $0.0000914550 | $91.45            | <font color="green">-7_008</font>   |
| 2   | ethGetBalance       | 170_473_072   | 68_779_228    | $0.0000914537 | $91.45            | <font color="red">+30_677</font>    |
| 3   | ethGetBalance       | 170_663_077   | 68_855_230    | $0.0000915547 | $91.55            | <font color="red">+212_897</font>   |
| 4   | ethGetBlockByNumber | 169_453_108   | 68_371_243    | $0.0000909112 | $90.91            | <font color="red">+53_213</font>    |
| 5   | ethGetBlockByNumber | 169_392_856   | 68_347_142    | $0.0000908791 | $90.87            | <font color="green">-69_787</font>  |
| 6   | ethGetBlockByNumber | 169_439_603   | 68_365_841    | $0.0000909040 | $90.90            | <font color="red">+27_717</font>    |

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
