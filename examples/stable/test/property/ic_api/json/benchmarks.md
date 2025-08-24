# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | processJsonUpdate | 2_148_453    | 7_148_453  | $0.0000097934 | $9.79             |
| 1   | processJsonUpdate | 65_059_075   | 70_059_075 | $0.0000959809 | $95.98            |
| 2   | processJsonUpdate | 1_767_515    | 6_767_515  | $0.0000092715 | $9.27             |
| 3   | processJsonUpdate | 8_881_512    | 13_881_512 | $0.0000190177 | $19.01            |
| 4   | processJsonUpdate | 3_444_376    | 8_444_376  | $0.0000115688 | $11.56            |
| 5   | processJsonUpdate | 29_363_817   | 34_363_817 | $0.0000470784 | $47.07            |
| 6   | processJsonUpdate | 4_494_214    | 9_494_214  | $0.0000130071 | $13.00            |
| 7   | processJsonUpdate | 26_112_277   | 31_112_277 | $0.0000426238 | $42.62            |
| 8   | processJsonUpdate | 2_372_079    | 7_372_079  | $0.0000100997 | $10.09            |
| 9   | processJsonUpdate | 5_087_028    | 10_087_028 | $0.0000138192 | $13.81            |
| 10  | processJsonUpdate | 60_280_423   | 65_280_423 | $0.0000894342 | $89.43            |
| 11  | processJsonUpdate | 2_857_701    | 7_857_701  | $0.0000107651 | $10.76            |
| 12  | processJsonUpdate | 10_105_424   | 15_105_424 | $0.0000206944 | $20.69            |
| 13  | processJsonUpdate | 69_959_739   | 74_959_739 | $0.0001026948 | $102.69           |
| 14  | processJsonUpdate | 68_703_158   | 73_703_158 | $0.0001009733 | $100.97           |
| 15  | processJsonUpdate | 4_322_067    | 9_322_067  | $0.0000127712 | $12.77            |
| 16  | processJsonUpdate | 66_731_362   | 71_731_362 | $0.0000982720 | $98.27            |
| 17  | processJsonUpdate | 20_779_110   | 25_779_110 | $0.0000353174 | $35.31            |
| 18  | processJsonUpdate | 23_273_755   | 28_273_755 | $0.0000387350 | $38.73            |
| 19  | processJsonUpdate | 2_029_070    | 7_029_070  | $0.0000096298 | $9.62             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
