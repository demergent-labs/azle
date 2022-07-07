import { Rust } from '../../../../../types';

import { generateIcObjectFunctionAcceptMessage } from './accept_message';
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
import { generateIcObjectFunctionSetCertifiedData } from './set_certified_data';
import { generateIcObjectFunctionStableGrow } from './stable_grow';
import { generateIcObjectFunctionStableRead } from './stable_read';
import { generateIcObjectFunctionStableSize } from './stable_size';
import { generateIcObjectFunctionStableWrite } from './stable_write';
import { generateIcObjectFunctionStable64Grow } from './stable64_grow';
import { generateIcObjectFunctionStable64Size } from './stable64_size';
import { generateIcObjectFunctionTime } from './time';
import { generateIcObjectFunctionTrap } from './trap';

export function generateIcObjectFunctions(): Rust {
    const icObjectFunctionAcceptMessage: Rust =
        generateIcObjectFunctionAcceptMessage();
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
    const icObjectFunctionSetCertifiedData: Rust =
        generateIcObjectFunctionSetCertifiedData();
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
    const icObjectFunctionStable64Size: Rust =
        generateIcObjectFunctionStable64Size();
    const icObjectFunctionTime: Rust = generateIcObjectFunctionTime();
    const icObjectFunctionTrap: Rust = generateIcObjectFunctionTrap();

    return `
        ${icObjectFunctionAcceptMessage}
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
        ${icObjectFunctionSetCertifiedData}
        ${icObjectFunctionStableGrow}
        ${icObjectFunctionStableRead}
        ${icObjectFunctionStableSize}
        ${icObjectFunctionStableWrite}
        ${icObjectFunctionStable64Grow}
        ${icObjectFunctionStable64Size}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}
  `;
}
