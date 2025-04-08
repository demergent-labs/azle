# Benchmarks for superheroes

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | create      | 4_442_591    | 2_367_036 | $0.0000031474 | $3.14             | <font color="red">+6_069</font>  |
| 1   | create      | 5_695_271    | 2_868_108 | $0.0000038136 | $3.81             | <font color="red">+21_825</font> |
| 2   | update      | 6_128_555    | 3_041_422 | $0.0000040441 | $4.04             | <font color="red">+33_422</font> |
| 3   | update      | 4_372_951    | 2_339_180 | $0.0000031103 | $3.11             | <font color="red">+2_664</font>  |
| 4   | deleteHero  | 1_229_304    | 1_081_721 | $0.0000014383 | $1.43             | <font color="red">+3_589</font>  |
| 5   | deleteHero  | 1_221_530    | 1_078_612 | $0.0000014342 | $1.43             | <font color="red">+3_193</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_436_522    | 2_364_608 | $0.0000031441 | $3.14             |
| 1   | create      | 5_673_446    | 2_859_378 | $0.0000038020 | $3.80             |
| 2   | update      | 6_095_133    | 3_028_053 | $0.0000040263 | $4.02             |
| 3   | update      | 4_370_287    | 2_338_114 | $0.0000031089 | $3.10             |
| 4   | deleteHero  | 1_225_715    | 1_080_286 | $0.0000014364 | $1.43             |
| 5   | deleteHero  | 1_218_337    | 1_077_334 | $0.0000014325 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
