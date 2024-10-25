# Benchmarks for management_canister

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_173_248   | 6_259_299  | $0.0000083228 | $8.32             |
| 1   | executeUpdateSettings     | 15_403_174   | 6_751_269  | $0.0000089770 | $8.97             |
| 2   | getCanisterStatus         | 3_563_689    | 2_015_475  | $0.0000026799 | $2.67             |
| 3   | executeInstallCode        | 29_081_839   | 12_222_735 | $0.0000162522 | $16.25            |
| 4   | executeUninstallCode      | 4_174_024    | 2_259_609  | $0.0000030045 | $3.00             |
| 5   | getCanisterStatus         | 3_556_402    | 2_012_560  | $0.0000026760 | $2.67             |
| 6   | executeUploadChunk        | 18_383_792   | 7_943_516  | $0.0000105623 | $10.56            |
| 7   | getStoredChunks           | 2_889_955    | 1_745_982  | $0.0000023216 | $2.32             |
| 8   | getStoredChunks           | 2_885_378    | 1_744_151  | $0.0000023191 | $2.31             |
| 9   | executeInstallChunkedCode | 19_832_456   | 8_522_982  | $0.0000113328 | $11.33            |
| 10  | executeUninstallCode      | 4_173_200    | 2_259_280  | $0.0000030041 | $3.00             |
| 11  | executeClearChunkStore    | 2_886_375    | 1_744_550  | $0.0000023197 | $2.31             |
| 12  | getStoredChunks           | 2_885_105    | 1_744_042  | $0.0000023190 | $2.31             |
| 13  | getCanisterStatus         | 3_556_928    | 2_012_771  | $0.0000026763 | $2.67             |
| 14  | executeDepositCycles      | 2_901_265    | 1_750_506  | $0.0000023276 | $2.32             |
| 15  | getCanisterStatus         | 3_556_963    | 2_012_785  | $0.0000026763 | $2.67             |
| 16  | executeUninstallCode      | 4_171_009    | 2_258_403  | $0.0000030029 | $3.00             |
| 17  | getCanisterStatus         | 3_552_101    | 2_010_840  | $0.0000026738 | $2.67             |
| 18  | executeStopCanister       | 2_893_030    | 1_747_212  | $0.0000023232 | $2.32             |
| 19  | getCanisterStatus         | 3_560_923    | 2_014_369  | $0.0000026784 | $2.67             |
| 20  | getCanisterStatus         | 3_558_363    | 2_013_345  | $0.0000026771 | $2.67             |
| 21  | executeStartCanister      | 2_896_008    | 1_748_403  | $0.0000023248 | $2.32             |
| 22  | getCanisterStatus         | 3_561_267    | 2_014_506  | $0.0000026786 | $2.67             |
| 23  | getCanisterStatus         | 3_558_029    | 2_013_211  | $0.0000026769 | $2.67             |
| 24  | getCanisterInfo           | 6_308_537    | 3_113_414  | $0.0000041398 | $4.13             |
| 25  | executeStopCanister       | 2_888_586    | 1_745_434  | $0.0000023209 | $2.32             |
| 26  | executeDeleteCanister     | 2_896_421    | 1_748_568  | $0.0000023250 | $2.32             |
| 27  | getRawRand                | 1_305_065    | 1_112_026  | $0.0000014786 | $1.47             |

## Baseline benchmarks Azle version: 0.24.2-rc.61

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
