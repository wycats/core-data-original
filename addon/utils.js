export function asDict(input) {
    return input;
}
export function expect(val, msg) {
    if (val === null || val === undefined) {
        throw new Error(msg || `Assertion failure`);
    }
}
export function assert(cond, msg) {
    if (!cond) {
        throw new Error(msg || `Assertion error`);
    }
}
export function unreachable(_never, msg) {
    throw new Error(msg || `Unreachable code`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLFVBQVUsTUFBTSxDQUFJLEtBQVE7SUFDaEMsT0FBTyxLQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQ3BCLEdBQXlCLEVBQ3pCLEdBQVk7SUFFWixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0tBQzdDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsSUFBUyxFQUFFLEdBQVk7SUFDNUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLENBQUM7S0FDM0M7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFhLEVBQUUsR0FBWTtJQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEFzRGljdDxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFRba2V5b2YgVF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc0RpY3Q8VD4oaW5wdXQ6IFQpOiBBc0RpY3Q8VD4ge1xuICByZXR1cm4gaW5wdXQgYXMgYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwZWN0PFQ+KFxuICB2YWw6IFQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBtc2c/OiBzdHJpbmdcbik6IGFzc2VydHMgdmFsIHtcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgYEFzc2VydGlvbiBmYWlsdXJlYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kOiBhbnksIG1zZz86IHN0cmluZyk6IGFzc2VydHMgY29uZCB7XG4gIGlmICghY29uZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgYEFzc2VydGlvbiBlcnJvcmApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlYWNoYWJsZShfbmV2ZXI6IG5ldmVyLCBtc2c/OiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCBgVW5yZWFjaGFibGUgY29kZWApO1xufVxuIl19