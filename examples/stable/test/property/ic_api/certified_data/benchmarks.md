⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                        | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ---------------------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade                        | 1_004_481_168 | 802_382_467 | $0.0010669039 | $1_066.90         | <font color="red">+4_004_044</font> |
| 1   | getDataCertificateInUpdate         | 1_714_244     | 1_275_697   | $0.0000016963 | $1.69             | <font color="red">+4_539</font>     |
| 2   | setData                            | 1_234_487     | 1_083_794   | $0.0000014411 | $1.44             | <font color="green">-4_028</font>   |
| 3   | getDataCertificateInUpdate         | 1_695_544     | 1_268_217   | $0.0000016863 | $1.68             | <font color="red">+6_173</font>     |
| 4   | setData                            | 1_238_191     | 1_085_276   | $0.0000014431 | $1.44             | <font color="red">+3_024</font>     |
| 5   | assertDataCertificateTypesInUpdate | 1_121_510     | 1_038_604   | $0.0000013810 | $1.38             | <font color="red">+4_762</font>     |
| 6   | assertSetCertifiedDataTypes        | 1_413_096     | 1_155_238   | $0.0000015361 | $1.53             | <font color="red">+3_878</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                        | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade                        | 1_000_477_124 | 800_780_849 | $0.0010647743 | $1_064.77         |
| 1   | getDataCertificateInUpdate         | 1_709_705     | 1_273_882   | $0.0000016938 | $1.69             |
| 2   | setData                            | 1_238_515     | 1_085_406   | $0.0000014432 | $1.44             |
| 3   | getDataCertificateInUpdate         | 1_689_371     | 1_265_748   | $0.0000016830 | $1.68             |
| 4   | setData                            | 1_235_167     | 1_084_066   | $0.0000014415 | $1.44             |
| 5   | assertDataCertificateTypesInUpdate | 1_116_748     | 1_036_699   | $0.0000013785 | $1.37             |
| 6   | assertSetCertifiedDataTypes        | 1_409_218     | 1_153_687   | $0.0000015340 | $1.53             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
