# Benchmarks for management_canister

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_173_359   | 6_259_343  | $0.0000083229 | $8.32             |
| 1   | executeUpdateSettings     | 15_403_209   | 6_751_283  | $0.0000089770 | $8.97             |
| 2   | getCanisterStatus         | 3_563_666    | 2_015_466  | $0.0000026799 | $2.67             |
| 3   | executeInstallCode        | 29_081_862   | 12_222_744 | $0.0000162522 | $16.25            |
| 4   | executeUninstallCode      | 4_174_024    | 2_259_609  | $0.0000030045 | $3.00             |
| 5   | getCanisterStatus         | 3_556_448    | 2_012_579  | $0.0000026761 | $2.67             |
| 6   | executeUploadChunk        | 18_383_896   | 7_943_558  | $0.0000105623 | $10.56            |
| 7   | getStoredChunks           | 2_889_990    | 1_745_996  | $0.0000023216 | $2.32             |
| 8   | getStoredChunks           | 2_885_355    | 1_744_142  | $0.0000023191 | $2.31             |
| 9   | executeInstallChunkedCode | 19_832_751   | 8_523_100  | $0.0000113329 | $11.33            |
| 10  | executeUninstallCode      | 4_173_234    | 2_259_293  | $0.0000030041 | $3.00             |
| 11  | executeClearChunkStore    | 2_886_375    | 1_744_550  | $0.0000023197 | $2.31             |
| 12  | getStoredChunks           | 2_885_140    | 1_744_056  | $0.0000023190 | $2.31             |
| 13  | getCanisterStatus         | 3_556_998    | 2_012_799  | $0.0000026764 | $2.67             |
| 14  | executeDepositCycles      | 2_901_265    | 1_750_506  | $0.0000023276 | $2.32             |
| 15  | getCanisterStatus         | 3_556_963    | 2_012_785  | $0.0000026763 | $2.67             |
| 16  | executeUninstallCode      | 4_171_055    | 2_258_422  | $0.0000030030 | $3.00             |
| 17  | getCanisterStatus         | 3_551_985    | 2_010_794  | $0.0000026737 | $2.67             |
| 18  | executeStopCanister       | 2_893_053    | 1_747_221  | $0.0000023232 | $2.32             |
| 19  | getCanisterStatus         | 3_560_842    | 2_014_336  | $0.0000026784 | $2.67             |
| 20  | getCanisterStatus         | 3_558_363    | 2_013_345  | $0.0000026771 | $2.67             |
| 21  | executeStartCanister      | 2_895_950    | 1_748_380  | $0.0000023248 | $2.32             |
| 22  | getCanisterStatus         | 3_561_290    | 2_014_516  | $0.0000026786 | $2.67             |
| 23  | getCanisterStatus         | 3_558_064    | 2_013_225  | $0.0000026769 | $2.67             |
| 24  | getCanisterInfo           | 6_308_572    | 3_113_428  | $0.0000041398 | $4.13             |
| 25  | executeStopCanister       | 2_888_632    | 1_745_452  | $0.0000023209 | $2.32             |
| 26  | executeDeleteCanister     | 2_896_409    | 1_748_563  | $0.0000023250 | $2.32             |
| 27  | getRawRand                | 1_305_042    | 1_112_016  | $0.0000014786 | $1.47             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
