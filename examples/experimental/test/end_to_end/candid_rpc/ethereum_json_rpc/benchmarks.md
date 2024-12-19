# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_575_626_958 | 4_230_840_783 | $0.0056256221 | $5_625.62         | <font color="red">+105_818_957</font> |
| 1   | ethGetBalance       | 170_834_754   | 68_923_901    | $0.0000916460 | $91.64            | <font color="red">+352_218</font>     |
| 2   | ethGetBalance       | 170_482_271   | 68_782_908    | $0.0000914586 | $91.45            | <font color="red">+39_876</font>      |
| 3   | ethGetBalance       | 170_552_926   | 68_811_170    | $0.0000914961 | $91.49            | <font color="red">+102_746</font>     |
| 4   | ethGetBlockByNumber | 169_416_655   | 68_356_662    | $0.0000908918 | $90.89            | <font color="red">+16_760</font>      |
| 5   | ethGetBlockByNumber | 169_499_446   | 68_389_778    | $0.0000909358 | $90.93            | <font color="red">+36_803</font>      |
| 6   | ethGetBlockByNumber | 169_485_694   | 68_384_277    | $0.0000909285 | $90.92            | <font color="red">+73_808</font>      |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
