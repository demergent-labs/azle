# Benchmarks for management_canister

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_226_875   | 6_280_750  | $0.0000083513 | $8.35             |
| 1   | executeUpdateSettings     | 15_440_612   | 6_766_244  | $0.0000089969 | $8.99             |
| 2   | getCanisterStatus         | 3_551_998    | 2_010_799  | $0.0000026737 | $2.67             |
| 3   | executeInstallCode        | 29_052_397   | 12_210_958 | $0.0000162365 | $16.23            |
| 4   | executeUninstallCode      | 4_193_316    | 2_267_326  | $0.0000030148 | $3.01             |
| 5   | getCanisterStatus         | 3_558_130    | 2_013_252  | $0.0000026770 | $2.67             |
| 6   | executeUploadChunk        | 18_378_906   | 7_941_562  | $0.0000105597 | $10.55            |
| 7   | getStoredChunks           | 2_881_249    | 1_742_499  | $0.0000023169 | $2.31             |
| 8   | getStoredChunks           | 2_881_432    | 1_742_572  | $0.0000023170 | $2.31             |
| 9   | executeInstallChunkedCode | 19_781_984   | 8_502_793  | $0.0000113059 | $11.30            |
| 10  | executeUninstallCode      | 4_184_020    | 2_263_608  | $0.0000030099 | $3.00             |
| 11  | executeClearChunkStore    | 2_883_508    | 1_743_403  | $0.0000023182 | $2.31             |
| 12  | getStoredChunks           | 2_884_331    | 1_743_732  | $0.0000023186 | $2.31             |
| 13  | getCanisterStatus         | 3_547_981    | 2_009_192  | $0.0000026716 | $2.67             |
| 14  | executeDepositCycles      | 2_888_116    | 1_745_246  | $0.0000023206 | $2.32             |
| 15  | getCanisterStatus         | 3_541_507    | 2_006_602  | $0.0000026681 | $2.66             |
| 16  | executeUninstallCode      | 4_180_760    | 2_262_304  | $0.0000030081 | $3.00             |
| 17  | getCanisterStatus         | 3_543_383    | 2_007_353  | $0.0000026691 | $2.66             |
| 18  | executeStopCanister       | 2_880_928    | 1_742_371  | $0.0000023168 | $2.31             |
| 19  | getCanisterStatus         | 3_547_358    | 2_008_943  | $0.0000026712 | $2.67             |
| 20  | getCanisterStatus         | 3_544_528    | 2_007_811  | $0.0000026697 | $2.66             |
| 21  | executeStartCanister      | 2_879_727    | 1_741_890  | $0.0000023161 | $2.31             |
| 22  | getCanisterStatus         | 3_541_164    | 2_006_465  | $0.0000026679 | $2.66             |
| 23  | getCanisterStatus         | 3_533_727    | 2_003_490  | $0.0000026640 | $2.66             |
| 24  | getCanisterInfo           | 6_295_955    | 3_108_382  | $0.0000041331 | $4.13             |
| 25  | executeStopCanister       | 2_872_022    | 1_738_808  | $0.0000023120 | $2.31             |
| 26  | executeDeleteCanister     | 2_871_554    | 1_738_621  | $0.0000023118 | $2.31             |
| 27  | getRawRand                | 1_289_868    | 1_105_947  | $0.0000014705 | $1.47             |

## Baseline benchmarks Azle version: 0.24.2-rc.87

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
