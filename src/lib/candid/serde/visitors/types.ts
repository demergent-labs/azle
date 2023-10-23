/*
 * The VisitorData gives us js_data which is the data that is about to be
 * encoded or was just decoded. js_class is the CandidType that can be used to
 * create the class.
 */
export type VisitorData = { js_data: any; candidType: any };
/**
 * The VisitorResult is the transformed version of js_data that is ready to
 * be consumed by the js or ready to be encoded.
 */
export type VisitorResult = any;
