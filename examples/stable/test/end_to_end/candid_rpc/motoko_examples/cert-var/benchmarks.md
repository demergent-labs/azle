⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for cert-var

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 2_081_336    | 1_422_534 | $0.0000018915 | $1.89             | <font color="red">+4_415</font>   |
| 1   | inc         | 2_314_022    | 1_515_608 | $0.0000020153 | $2.01             | <font color="red">+4_370</font>   |
| 2   | set         | 2_055_845    | 1_412_338 | $0.0000018779 | $1.87             | <font color="red">+9_793</font>   |
| 3   | inc         | 2_315_689    | 1_516_275 | $0.0000020161 | $2.01             | <font color="red">+4_652</font>   |
| 4   | set         | 2_052_197    | 1_410_878 | $0.0000018760 | $1.87             | <font color="red">+7_169</font>   |
| 5   | inc         | 2_314_734    | 1_515_893 | $0.0000020156 | $2.01             | <font color="red">+4_964</font>   |
| 6   | set         | 2_051_581    | 1_410_632 | $0.0000018757 | $1.87             | <font color="red">+7_482</font>   |
| 7   | inc         | 2_310_743    | 1_514_297 | $0.0000020135 | $2.01             | <font color="red">+2_418</font>   |
| 8   | set         | 2_054_039    | 1_411_615 | $0.0000018770 | $1.87             | <font color="red">+6_478</font>   |
| 9   | inc         | 2_314_583    | 1_515_833 | $0.0000020156 | $2.01             | <font color="green">-496</font>   |
| 10  | set         | 2_055_586    | 1_412_234 | $0.0000018778 | $1.87             | <font color="red">+5_711</font>   |
| 11  | inc         | 2_314_193    | 1_515_677 | $0.0000020154 | $2.01             | <font color="green">-1_135</font> |
| 12  | set         | 2_089_355    | 1_425_742 | $0.0000018958 | $1.89             | <font color="red">+227</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_076_921    | 1_420_768 | $0.0000018892 | $1.88             |
| 1   | inc         | 2_309_652    | 1_513_860 | $0.0000020129 | $2.01             |
| 2   | set         | 2_046_052    | 1_408_420 | $0.0000018727 | $1.87             |
| 3   | inc         | 2_311_037    | 1_514_414 | $0.0000020137 | $2.01             |
| 4   | set         | 2_045_028    | 1_408_011 | $0.0000018722 | $1.87             |
| 5   | inc         | 2_309_770    | 1_513_908 | $0.0000020130 | $2.01             |
| 6   | set         | 2_044_099    | 1_407_639 | $0.0000018717 | $1.87             |
| 7   | inc         | 2_308_325    | 1_513_330 | $0.0000020122 | $2.01             |
| 8   | set         | 2_047_561    | 1_409_024 | $0.0000018735 | $1.87             |
| 9   | inc         | 2_315_079    | 1_516_031 | $0.0000020158 | $2.01             |
| 10  | set         | 2_049_875    | 1_409_950 | $0.0000018748 | $1.87             |
| 11  | inc         | 2_315_328    | 1_516_131 | $0.0000020160 | $2.01             |
| 12  | set         | 2_089_128    | 1_425_651 | $0.0000018956 | $1.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
