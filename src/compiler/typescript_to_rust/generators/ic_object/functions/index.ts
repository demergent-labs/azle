import { generateIcObjectFunctionAcceptMessage } from './accept_message';
import { generateIcObjectFunctionArgDataRaw } from './arg_data_raw';
import { generateIcObjectFunctionArgDataRawSize } from './arg_data_raw_size';
import { generateIcObjectFunctionCaller } from './caller';
import { generateIcObjectFunctionCanisterBalance } from './canister_balance';
import { generateIcObjectFunctionCanisterBalance128 } from './canister_balance128';
import { generateIcObjectFunctionDataCertificate } from './data_certificate';
import { generateIcObjectFunctionId } from './id';
import { generateIcObjectFunctionMsgCyclesAccept } from './msg_cycles_accept';
import { generateIcObjectFunctionMsgCyclesAccept128 } from './msg_cycles_accept128';
import { generateIcObjectFunctionMsgCyclesAvailable } from './msg_cycles_available';
import { generateIcObjectFunctionMsgCyclesAvailable128 } from './msg_cycles_available128';
import { generateIcObjectFunctionMsgCyclesRefunded } from './msg_cycles_refunded';
import { generateIcObjectFunctionMsgCyclesRefunded128 } from './msg_cycles_refunded128';
import { generateIcObjectFunctionMethodName } from './method_name';
import { generateIcObjectFunctionPrint } from './print';
import { generateIcObjectFunctionReject } from './reject';
import { generateIcObjectFunctionRejectCode } from './reject_code';
import { generateIcObjectFunctionRejectMessage } from './reject_message';
import { generateIcObjectFunctionReply } from './reply';
import { generateIcObjectFunctionSetCertifiedData } from './set_certified_data';
import { generateIcObjectFunctionStableBytes } from './stable_bytes';
import { generateIcObjectFunctionStableGrow } from './stable_grow';
import { generateIcObjectFunctionStableRead } from './stable_read';
import { generateIcObjectFunctionStableSize } from './stable_size';
import { generateIcObjectFunctionStableWrite } from './stable_write';
import { generateIcObjectFunctionStable64Grow } from './stable64_grow';
import { generateIcObjectFunctionStable64Read } from './stable64_read';
import { generateIcObjectFunctionStable64Size } from './stable64_size';
import { generateIcObjectFunctionStable64Write } from './stable64_write';
import { generateIcObjectFunctionTime } from './time';
import { generateIcObjectFunctionTrap } from './trap';
import { CanisterMethodFunctionInfo, Rust } from '../../../../../types';

export function generateIcObjectFunctions(canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]): Rust {
    const icObjectFunctionAcceptMessage: Rust =
        generateIcObjectFunctionAcceptMessage();
    const icObjectFunctionArgDataRaw: Rust =
        generateIcObjectFunctionArgDataRaw();
    const icObjectFunctionArgDataRawSize: Rust =
        generateIcObjectFunctionArgDataRawSize();
    const icObjectFunctionCaller: Rust = generateIcObjectFunctionCaller();
    const icObjectFunctionCanisterBalance: Rust =
        generateIcObjectFunctionCanisterBalance();
    const icObjectFunctionCanisterBalance128: Rust =
        generateIcObjectFunctionCanisterBalance128();
    const icObjectFunctionDataCertificate: Rust =
        generateIcObjectFunctionDataCertificate();
    const icObjectFunctionId: Rust = generateIcObjectFunctionId();
    const icObjectFunctionMethodName: Rust =
        generateIcObjectFunctionMethodName();
    const icObjectFunctionMsgCyclesAccept: Rust =
        generateIcObjectFunctionMsgCyclesAccept();
    const icObjectFunctionMsgCyclesAccept128: Rust =
        generateIcObjectFunctionMsgCyclesAccept128();
    const icObjectFunctionMsgCyclesAvailable: Rust =
        generateIcObjectFunctionMsgCyclesAvailable();
    const icObjectFunctionMsgCyclesAvailable128: Rust =
        generateIcObjectFunctionMsgCyclesAvailable128();
    const icObjectFunctionMsgCyclesRefunded: Rust =
        generateIcObjectFunctionMsgCyclesRefunded();
    const icObjectFunctionMsgCyclesRefunded128: Rust =
        generateIcObjectFunctionMsgCyclesRefunded128();
    const icObjectFunctionPrint: Rust = generateIcObjectFunctionPrint();
    const icObjectFunctionReject: Rust = generateIcObjectFunctionReject();
    const icObjectFunctionRejectCode: Rust =
        generateIcObjectFunctionRejectCode();
    const icObjectFunctionRejectMessage: Rust =
        generateIcObjectFunctionRejectMessage();
    const icObjectFunctionReply: Rust =
        generateIcObjectFunctionReply(canisterMethodFunctionInfos);
    const icObjectFunctionSetCertifiedData: Rust =
        generateIcObjectFunctionSetCertifiedData();
    const icObjectFunctionStableBytes: Rust =
        generateIcObjectFunctionStableBytes();
    const icObjectFunctionStableGrow: Rust =
        generateIcObjectFunctionStableGrow();
    const icObjectFunctionStableRead: Rust =
        generateIcObjectFunctionStableRead();
    const icObjectFunctionStableSize: Rust =
        generateIcObjectFunctionStableSize();
    const icObjectFunctionStableWrite: Rust =
        generateIcObjectFunctionStableWrite();
    const icObjectFunctionStable64Grow: Rust =
        generateIcObjectFunctionStable64Grow();
    const icObjectFunctionStable64Read: Rust =
        generateIcObjectFunctionStable64Read();
    const icObjectFunctionStable64Size: Rust =
        generateIcObjectFunctionStable64Size();
    const icObjectFunctionStable64Write: Rust =
        generateIcObjectFunctionStable64Write();
    const icObjectFunctionTime: Rust = generateIcObjectFunctionTime();
    const icObjectFunctionTrap: Rust = generateIcObjectFunctionTrap();

    return `
        ${icObjectFunctionAcceptMessage}
        ${icObjectFunctionArgDataRaw}
        ${icObjectFunctionArgDataRawSize}
        ${icObjectFunctionCaller}
        ${icObjectFunctionCanisterBalance}
        ${icObjectFunctionCanisterBalance128}
        ${icObjectFunctionDataCertificate}
        ${icObjectFunctionId}
        ${icObjectFunctionMethodName}
        ${icObjectFunctionMsgCyclesAccept}
        ${icObjectFunctionMsgCyclesAccept128}
        ${icObjectFunctionMsgCyclesAvailable}
        ${icObjectFunctionMsgCyclesAvailable128}
        ${icObjectFunctionMsgCyclesRefunded}
        ${icObjectFunctionMsgCyclesRefunded128}
        ${icObjectFunctionPrint}
        ${icObjectFunctionReject}
        ${icObjectFunctionRejectCode}
        ${icObjectFunctionRejectMessage}
        ${icObjectFunctionReply}
        ${icObjectFunctionSetCertifiedData}
        ${icObjectFunctionStableBytes}
        ${icObjectFunctionStableGrow}
        ${icObjectFunctionStableRead}
        ${icObjectFunctionStableSize}
        ${icObjectFunctionStableWrite}
        ${icObjectFunctionStable64Grow}
        ${icObjectFunctionStable64Read}
        ${icObjectFunctionStable64Size}
        ${icObjectFunctionStable64Write}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}
  `;
}
