# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_844_601    | 2_527_840 | $0.0000033612 | $3.36             | <font color="green">-101_168</font> |
| 1   | getTransferFee    | 2_104_567    | 1_431_826 | $0.0000019039 | $1.90             | <font color="green">-6_634</font>   |
| 2   | executeTransfer   | 13_239_054   | 5_885_621 | $0.0000078259 | $7.82             | <font color="green">-112_913</font> |
| 3   | executeTransfer   | 13_210_000   | 5_874_000 | $0.0000078105 | $7.81             | <font color="green">-145_964</font> |
| 4   | getBlocks         | 5_692_719    | 2_867_087 | $0.0000038123 | $3.81             | <font color="green">-58_375</font>  |
| 5   | getSymbol         | 1_615_095    | 1_236_038 | $0.0000016435 | $1.64             | <font color="green">-6_227</font>   |
| 6   | getName           | 1_614_213    | 1_235_685 | $0.0000016431 | $1.64             | <font color="green">-13_049</font>  |
| 7   | getDecimals       | 1_612_702    | 1_235_080 | $0.0000016422 | $1.64             | <font color="green">-13_460</font>  |
| 8   | getArchives       | 1_612_325    | 1_234_930 | $0.0000016420 | $1.64             | <font color="green">-14_031</font>  |
| 9   | executeTransfer   | 13_212_453   | 5_874_981 | $0.0000078118 | $7.81             | <font color="green">-139_768</font> |
| 10  | getAccountBalance | 4_796_107    | 2_508_442 | $0.0000033354 | $3.33             | <font color="green">-108_099</font> |
| 11  | executeTransfer   | 13_156_845   | 5_852_738 | $0.0000077822 | $7.78             | <font color="green">-158_849</font> |
| 12  | executeTransfer   | 13_208_099   | 5_873_239 | $0.0000078095 | $7.80             | <font color="green">-124_633</font> |
| 13  | executeTransfer   | 13_996_752   | 6_188_700 | $0.0000082289 | $8.22             | <font color="green">-132_066</font> |
| 14  | executeTransfer   | 13_977_132   | 6_180_852 | $0.0000082185 | $8.21             | <font color="green">-130_857</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_945_769    | 2_568_307 | $0.0000034150 | $3.41             |
| 1   | getTransferFee    | 2_111_201    | 1_434_480 | $0.0000019074 | $1.90             |
| 2   | executeTransfer   | 13_351_967   | 5_930_786 | $0.0000078860 | $7.88             |
| 3   | executeTransfer   | 13_355_964   | 5_932_385 | $0.0000078881 | $7.88             |
| 4   | getBlocks         | 5_751_094    | 2_890_437 | $0.0000038433 | $3.84             |
| 5   | getSymbol         | 1_621_322    | 1_238_528 | $0.0000016468 | $1.64             |
| 6   | getName           | 1_627_262    | 1_240_904 | $0.0000016500 | $1.64             |
| 7   | getDecimals       | 1_626_162    | 1_240_464 | $0.0000016494 | $1.64             |
| 8   | getArchives       | 1_626_356    | 1_240_542 | $0.0000016495 | $1.64             |
| 9   | executeTransfer   | 13_352_221   | 5_930_888 | $0.0000078861 | $7.88             |
| 10  | getAccountBalance | 4_904_206    | 2_551_682 | $0.0000033929 | $3.39             |
| 11  | executeTransfer   | 13_315_694   | 5_916_277 | $0.0000078667 | $7.86             |
| 12  | executeTransfer   | 13_332_732   | 5_923_092 | $0.0000078758 | $7.87             |
| 13  | executeTransfer   | 14_128_818   | 6_241_527 | $0.0000082992 | $8.29             |
| 14  | executeTransfer   | 14_107_989   | 6_233_195 | $0.0000082881 | $8.28             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
