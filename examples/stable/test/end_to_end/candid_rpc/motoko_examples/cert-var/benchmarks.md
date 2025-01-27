# Benchmarks for cert-var

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_102_692    | 1_431_076 | $0.0000019029 | $1.90             |
| 1   | inc         | 2_344_555    | 1_527_822 | $0.0000020315 | $2.03             |
| 2   | set         | 2_077_708    | 1_421_083 | $0.0000018896 | $1.88             |
| 3   | inc         | 2_347_612    | 1_529_044 | $0.0000020331 | $2.03             |
| 4   | set         | 2_082_853    | 1_423_141 | $0.0000018923 | $1.89             |
| 5   | inc         | 2_338_962    | 1_525_584 | $0.0000020285 | $2.02             |
| 6   | set         | 2_076_003    | 1_420_401 | $0.0000018887 | $1.88             |
| 7   | inc         | 2_341_742    | 1_526_696 | $0.0000020300 | $2.03             |
| 8   | set         | 2_075_086    | 1_420_034 | $0.0000018882 | $1.88             |
| 9   | inc         | 2_343_295    | 1_527_318 | $0.0000020308 | $2.03             |
| 10  | set         | 2_076_512    | 1_420_604 | $0.0000018889 | $1.88             |
| 11  | inc         | 2_339_067    | 1_525_626 | $0.0000020286 | $2.02             |
| 12  | set         | 2_118_142    | 1_437_256 | $0.0000019111 | $1.91             |

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
