# Benchmarks for management_canister

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_226_956   | 6_280_782  | $0.0000083514 | $8.35             |
| 1   | executeUpdateSettings     | 15_440_531   | 6_766_212  | $0.0000089968 | $8.99             |
| 2   | getCanisterStatus         | 3_551_963    | 2_010_785  | $0.0000026737 | $2.67             |
| 3   | executeInstallCode        | 29_052_385   | 12_210_954 | $0.0000162365 | $16.23            |
| 4   | executeUninstallCode      | 4_193_258    | 2_267_303  | $0.0000030148 | $3.01             |
| 5   | getCanisterStatus         | 3_558_200    | 2_013_280  | $0.0000026770 | $2.67             |
| 6   | executeUploadChunk        | 18_378_780   | 7_941_512  | $0.0000105596 | $10.55            |
| 7   | getStoredChunks           | 2_881_284    | 1_742_513  | $0.0000023170 | $2.31             |
| 8   | getStoredChunks           | 2_881_513    | 1_742_605  | $0.0000023171 | $2.31             |
| 9   | executeInstallChunkedCode | 19_781_914   | 8_502_765  | $0.0000113059 | $11.30            |
| 10  | executeUninstallCode      | 4_183_985    | 2_263_594  | $0.0000030098 | $3.00             |
| 11  | executeClearChunkStore    | 2_883_450    | 1_743_380  | $0.0000023181 | $2.31             |
| 12  | getStoredChunks           | 2_884_273    | 1_743_709  | $0.0000023186 | $2.31             |
| 13  | getCanisterStatus         | 3_548_016    | 2_009_206  | $0.0000026716 | $2.67             |
| 14  | executeDepositCycles      | 2_888_058    | 1_745_223  | $0.0000023206 | $2.32             |
| 15  | getCanisterStatus         | 3_541_662    | 2_006_664  | $0.0000026682 | $2.66             |
| 16  | executeUninstallCode      | 4_180_841    | 2_262_336  | $0.0000030082 | $3.00             |
| 17  | getCanisterStatus         | 3_543_371    | 2_007_348  | $0.0000026691 | $2.66             |
| 18  | executeStopCanister       | 2_880_847    | 1_742_338  | $0.0000023167 | $2.31             |
| 19  | getCanisterStatus         | 3_547_393    | 2_008_957  | $0.0000026712 | $2.67             |
| 20  | getCanisterStatus         | 3_544_528    | 2_007_811  | $0.0000026697 | $2.66             |
| 21  | executeStartCanister      | 2_879_750    | 1_741_900  | $0.0000023162 | $2.31             |
| 22  | getCanisterStatus         | 3_541_118    | 2_006_447  | $0.0000026679 | $2.66             |
| 23  | getCanisterStatus         | 3_533_762    | 2_003_504  | $0.0000026640 | $2.66             |
| 24  | getCanisterInfo           | 6_295_885    | 3_108_354  | $0.0000041331 | $4.13             |
| 25  | executeStopCanister       | 2_871_987    | 1_738_794  | $0.0000023120 | $2.31             |
| 26  | executeDeleteCanister     | 2_871_565    | 1_738_626  | $0.0000023118 | $2.31             |
| 27  | getRawRand                | 1_289_949    | 1_105_979  | $0.0000014706 | $1.47             |

## Baseline benchmarks Azle version: 0.24.2-rc.92

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
