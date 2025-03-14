⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                        | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade                        | 1_000_477_124 | 800_780_849 | $0.0010647743 | $1_064.77         |
| 1   | getDataCertificateInUpdate         | 1_709_705     | 1_273_882   | $0.0000016938 | $1.69             |
| 2   | setData                            | 1_238_515     | 1_085_406   | $0.0000014432 | $1.44             |
| 3   | getDataCertificateInUpdate         | 1_689_371     | 1_265_748   | $0.0000016830 | $1.68             |
| 4   | setData                            | 1_235_167     | 1_084_066   | $0.0000014415 | $1.44             |
| 5   | assertDataCertificateTypesInUpdate | 1_116_748     | 1_036_699   | $0.0000013785 | $1.37             |
| 6   | assertSetCertifiedDataTypes        | 1_409_218     | 1_153_687   | $0.0000015340 | $1.53             |

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
