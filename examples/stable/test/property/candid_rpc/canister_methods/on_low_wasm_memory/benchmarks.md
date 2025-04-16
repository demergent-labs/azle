# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addRandomBytes  | 1_201_998    | 1_070_799 | $0.0000014238 | $1.42             | <font color="green">-4_989</font> |
| 1   | addRandomBytes  | 1_136_692    | 1_044_676 | $0.0000013891 | $1.38             | <font color="green">-1_754</font> |
| 2   | addRandomBytes  | 1_136_994    | 1_044_797 | $0.0000013892 | $1.38             | <font color="green">-2_817</font> |
| 3   | addRandomBytes  | 1_140_671    | 1_046_268 | $0.0000013912 | $1.39             | <font color="red">+30</font>      |
| 4   | addRandomBytes  | 1_140_250    | 1_046_100 | $0.0000013910 | $1.39             | <font color="green">-682</font>   |
| 5   | addRandomBytes  | 1_135_555    | 1_044_222 | $0.0000013885 | $1.38             | <font color="green">-2_006</font> |
| 6   | addRandomBytes  | 1_138_314    | 1_045_325 | $0.0000013899 | $1.38             | <font color="green">-2_060</font> |
| 7   | addRandomBytes  | 1_135_759    | 1_044_303 | $0.0000013886 | $1.38             | <font color="green">-1_900</font> |
| 8   | addRandomBytes  | 1_132_972    | 1_043_188 | $0.0000013871 | $1.38             | <font color="green">-5_221</font> |
| 9   | addRandomBytes  | 1_136_073    | 1_044_429 | $0.0000013887 | $1.38             | <font color="green">-1_089</font> |
| 10  | onLowWasmMemory | 98_223       | 629_289   | $0.0000008367 | $0.83             | <font color="green">-1_277</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addRandomBytes  | 1_206_987    | 1_072_794 | $0.0000014265 | $1.42             |
| 1   | addRandomBytes  | 1_138_446    | 1_045_378 | $0.0000013900 | $1.39             |
| 2   | addRandomBytes  | 1_139_811    | 1_045_924 | $0.0000013907 | $1.39             |
| 3   | addRandomBytes  | 1_140_641    | 1_046_256 | $0.0000013912 | $1.39             |
| 4   | addRandomBytes  | 1_140_932    | 1_046_372 | $0.0000013913 | $1.39             |
| 5   | addRandomBytes  | 1_137_561    | 1_045_024 | $0.0000013895 | $1.38             |
| 6   | addRandomBytes  | 1_140_374    | 1_046_149 | $0.0000013910 | $1.39             |
| 7   | addRandomBytes  | 1_137_659    | 1_045_063 | $0.0000013896 | $1.38             |
| 8   | addRandomBytes  | 1_138_193    | 1_045_277 | $0.0000013899 | $1.38             |
| 9   | addRandomBytes  | 1_137_162    | 1_044_864 | $0.0000013893 | $1.38             |
| 10  | onLowWasmMemory | 99_500       | 629_800   | $0.0000008374 | $0.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
