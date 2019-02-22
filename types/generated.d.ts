export type ErrorValidator
	= (new (...args: any[]) => any)
	| RegExp
	| string
	| ((error: any) => boolean);

export interface Observable {
	subscribe(observer: (value: {}) => void): void;
}
export interface SnapshotOptions {
	id?: string;
}
export type Test = (t: TestContext) => PromiseLike<void> | Iterator<any> | Observable | void;
export type GenericTest<T> = (t: GenericTestContext<T>) => PromiseLike<void> | Iterator<any> | Observable | void;
export type CallbackTest = (t: CallbackTestContext) => void;
export type GenericCallbackTest<T> = (t: GenericCallbackTestContext<T>) => void;

export interface Context<T> { context: T }
export type AnyContext = Context<any>;

export type ContextualTest = GenericTest<AnyContext>;
export type ContextualCallbackTest = GenericCallbackTest<AnyContext>;

export interface AssertContext {
	/**
	 * Passing assertion.
	 */
	pass(message?: string): void;
	/**
	 * Failing assertion.
	 */
	fail(message?: string): void;
	/**
	 * Assert that value is truthy.
	 */
	truthy(value: any, message?: string): void;
	/**
	 * Assert that value is falsy.
	 */
	falsy(value: any, message?: string): void;
	/**
	 * Assert that value is true.
	 */
	true(value: any, message?: string): void;
	/**
	 * Assert that value is false.
	 */
	false(value: any, message?: string): void;
	/**
	 * Assert that value is equal to expected.
	 */
	is<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is not equal to expected.
	 */
	not<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is deep equal to expected.
	 */
	deepEqual<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is not deep equal to expected.
	 */
	notDeepEqual<U>(value: U, expected: U, message?: string): void;
 	/**
 	 * Assert that function throws an error or promise rejects.
 	 * @param error Can be a constructor, regex, error message or validation function.
 	 */
	throws(value: PromiseLike<any>, error?: ErrorValidator, message?: string): Promise<any>;
	throws(value: () => void, error?: ErrorValidator, message?: string): any;
	/**
	 * Assert that function doesn't throw an error or promise resolves.
	 */
	notThrows(value: PromiseLike<any>, message?: string): Promise<void>;
	notThrows(value: () => void, message?: string): void;
	/**
	 * Assert that contents matches regex.
	 */
	regex(contents: string, regex: RegExp, message?: string): void;
	/**
	 * Assert that contents matches a snapshot.
	 */
	snapshot(contents: any, message?: string): void;
	snapshot(contents: any, options: SnapshotOptions, message?: string): void;
	/**
	 * Assert that contents does not match regex.
	 */
	notRegex(contents: string, regex: RegExp, message?: string): void;
	/**
	 * Assert that error is falsy.
	 */
	ifError(error: any, message?: string): void;
}
export interface TestContext extends AssertContext {
	/**
	 * Test title.
	 */
	title: string;
	/**
	 * Plan how many assertion there are in the test.
	 * The test will fail if the actual assertion count doesn't match planned assertions.
	 */
	plan(count: number): void;

	skip: AssertContext;
	/**
	 * Log values contextually alongside the test result instead of immediately printing them to `stdout`.
	 */
	log(...values: any[]): void;
}
export interface CallbackTestContext extends TestContext {
	/**
	 * End the test.
	 */
	end(): void;
}

export type GenericTestContext<T> = TestContext & T;
export type GenericCallbackTestContext<T> = CallbackTestContext & T;

export interface Macro<T> {
	(t: T, ...args: any[]): void;
	title? (providedTitle: string, ...args: any[]): string;
}
export type Macros<T> = Macro<T> | Macro<T>[];

interface RegisterBase<T> {
    (name: string, run: GenericTest<T>): void;
    (run: GenericTest<T>): void;
    (name: string, run: Macros<GenericTestContext<T>>, ...args: any[]): void;
    (run: Macros<GenericTestContext<T>>, ...args: any[]): void;
}

interface CallbackRegisterBase<T> {
    (name: string, run: GenericCallbackTest<T>): void;
    (run: GenericCallbackTest<T>): void;
    (name: string, run: Macros<GenericCallbackTestContext<T>>, ...args: any[]): void;
    (run: Macros<GenericCallbackTestContext<T>>, ...args: any[]): void;
}

export default test;
export const test: RegisterContextual<any>;
export interface RegisterContextual<T> extends Register<Context<T>> {
}
export interface Register<T> extends RegisterBase<T> {
	serial: RegisterBase<T> & Register_serial<T>;
	before: RegisterBase<T> & Register_before<T>;
	after: RegisterBase<T> & Register_after<T>;
	skip: RegisterBase<T> & Register_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_failing<T>;
	only: RegisterBase<T> & Register_only<T>;
	beforeEach: RegisterBase<T> & Register_beforeEach<T>;
	afterEach: RegisterBase<T> & Register_afterEach<T>;
	cb: CallbackRegisterBase<T> & Register_cb<T>;
}
interface Register_serial<T> {
	before: Register_before_serial<T>;
	after: Register_after_serial<T>;
	skip: RegisterBase<T> & Register_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_failing_serial<T>;
	only: Register_only_serial<T>;
	beforeEach: Register_beforeEach_serial<T>;
	afterEach: Register_afterEach_serial<T>;
	cb: Register_cb_serial<T>;
	always: Register_always_serial<T>;
}
interface Register_serial_skip<T> {
	before: Register_before_serial_skip<T>;
	after: Register_after_serial_skip<T>;
	failing: Register_failing_serial_skip<T>;
	beforeEach: Register_beforeEach_serial_skip<T>;
	afterEach: Register_afterEach_serial_skip<T>;
	cb: Register_cb_serial_skip<T>;
	always: Register_always_serial_skip<T>;
}
interface Register_serial_todo<T> {
	before: Register_before_serial_todo<T>;
	after: Register_after_serial_todo<T>;
	failing: Register_failing_serial_todo<T>;
	beforeEach: Register_beforeEach_serial_todo<T>;
	afterEach: Register_afterEach_serial_todo<T>;
	cb: Register_cb_serial_todo<T>;
	always: Register_always_serial_todo<T>;
}
interface Register_before<T> {
	serial: RegisterBase<T> & Register_before_serial<T>;
	skip: RegisterBase<T> & Register_before_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_before_failing<T>;
	cb: CallbackRegisterBase<T> & Register_before_cb<T>;
}
interface Register_before_serial<T> {
	skip: RegisterBase<T> & Register_before_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_before_failing_serial<T>;
	cb: Register_before_cb_serial<T>;
}
interface Register_before_serial_skip<T> {
	failing: Register_before_failing_serial_skip<T>;
	cb: Register_before_cb_serial_skip<T>;
}
interface Register_before_serial_todo<T> {
	failing: Register_before_failing_serial_todo<T>;
	cb: Register_before_cb_serial_todo<T>;
}
interface Register_before_skip<T> {
	serial: Register_before_serial_skip<T>;
	failing: Register_before_failing_skip<T>;
	cb: Register_before_cb_skip<T>;
}
interface Register_before_todo<T> {
	serial: Register_before_serial_todo<T>;
	failing: Register_before_failing_todo<T>;
	cb: Register_before_cb_todo<T>;
}
interface Register_before_failing<T> {
	serial: RegisterBase<T> & Register_before_failing_serial<T>;
	skip: RegisterBase<T> & Register_before_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_before_cb_failing<T>;
}
interface Register_before_failing_serial<T> {
	skip: RegisterBase<T> & Register_before_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_before_cb_failing_serial<T>;
}
interface Register_before_failing_serial_skip<T> {
	cb: Register_before_cb_failing_serial<T>['skip'];
}
interface Register_before_failing_serial_todo<T> {
	cb: Register_before_cb_failing_serial<T>['todo'];
}
interface Register_before_failing_skip<T> {
	serial: Register_before_failing_serial_skip<T>;
	cb: Register_before_cb_failing_skip<T>;
}
interface Register_before_failing_todo<T> {
	serial: Register_before_failing_serial_todo<T>;
	cb: Register_before_cb_failing_todo<T>;
}
interface Register_before_cb<T> {
	serial: CallbackRegisterBase<T> & Register_before_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_before_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_before_cb_failing<T>;
}
interface Register_before_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_before_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_before_cb_failing_serial<T>;
}
interface Register_before_cb_serial_skip<T> {
	failing: Register_before_cb_failing_serial<T>['skip'];
}
interface Register_before_cb_serial_todo<T> {
	failing: Register_before_cb_failing_serial<T>['todo'];
}
interface Register_before_cb_skip<T> {
	serial: Register_before_cb_serial_skip<T>;
	failing: Register_before_cb_failing_skip<T>;
}
interface Register_before_cb_todo<T> {
	serial: Register_before_cb_serial_todo<T>;
	failing: Register_before_cb_failing_todo<T>;
}
interface Register_before_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_before_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_before_cb_failing_skip<T>;
	todo: (name: string) => void;
}
interface Register_before_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T>;
	todo: (name: string) => void;
}
interface Register_before_cb_failing_skip<T> {
	serial: Register_before_cb_failing_serial<T>['skip'];
}
interface Register_before_cb_failing_todo<T> {
	serial: Register_before_cb_failing_serial<T>['todo'];
}
interface Register_after<T> {
	serial: RegisterBase<T> & Register_after_serial<T>;
	skip: RegisterBase<T> & Register_after_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_after_failing<T>;
	cb: CallbackRegisterBase<T> & Register_after_cb<T>;
	always: RegisterBase<T> & Register_after_always<T>;
}
interface Register_after_serial<T> {
	skip: RegisterBase<T> & Register_after_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_after_failing_serial<T>;
	cb: Register_after_cb_serial<T>;
	always: Register_after_always_serial<T>;
}
interface Register_after_serial_skip<T> {
	failing: Register_after_failing_serial_skip<T>;
	cb: Register_after_cb_serial_skip<T>;
	always: Register_after_always_serial_skip<T>;
}
interface Register_after_serial_todo<T> {
	failing: Register_after_failing_serial_todo<T>;
	cb: Register_after_cb_serial_todo<T>;
	always: Register_after_always_serial_todo<T>;
}
interface Register_after_skip<T> {
	serial: Register_after_serial_skip<T>;
	failing: Register_after_failing_skip<T>;
	cb: Register_after_cb_skip<T>;
	always: Register_after_always_skip<T>;
}
interface Register_after_todo<T> {
	serial: Register_after_serial_todo<T>;
	failing: Register_after_failing_todo<T>;
	cb: Register_after_cb_todo<T>;
	always: Register_after_always_todo<T>;
}
interface Register_after_failing<T> {
	serial: RegisterBase<T> & Register_after_failing_serial<T>;
	skip: RegisterBase<T> & Register_after_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_after_cb_failing<T>;
	always: Register_after_always_failing<T>;
}
interface Register_after_failing_serial<T> {
	skip: RegisterBase<T> & Register_after_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_after_cb_failing_serial<T>;
	always: Register_after_always_failing_serial<T>;
}
interface Register_after_failing_serial_skip<T> {
	cb: Register_after_cb_failing_serial_skip<T>;
	always: Register_after_always_failing_serial_skip<T>;
}
interface Register_after_failing_serial_todo<T> {
	cb: Register_after_cb_failing_serial_todo<T>;
	always: Register_after_always_failing_serial_todo<T>;
}
interface Register_after_failing_skip<T> {
	serial: Register_after_failing_serial_skip<T>;
	cb: Register_after_cb_failing_skip<T>;
	always: Register_after_always_failing_skip<T>;
}
interface Register_after_failing_todo<T> {
	serial: Register_after_failing_serial_todo<T>;
	cb: Register_after_cb_failing_todo<T>;
	always: Register_after_always_failing_todo<T>;
}
interface Register_after_cb<T> {
	serial: CallbackRegisterBase<T> & Register_after_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_after_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_after_cb_failing<T>;
	always: Register_after_always_cb<T>;
}
interface Register_after_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_after_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_after_cb_failing_serial<T>;
	always: Register_after_always_cb_serial<T>;
}
interface Register_after_cb_serial_skip<T> {
	failing: Register_after_cb_failing_serial_skip<T>;
	always: Register_after_always_cb_serial_skip<T>;
}
interface Register_after_cb_serial_todo<T> {
	failing: Register_after_cb_failing_serial_todo<T>;
	always: Register_after_always_cb_serial_todo<T>;
}
interface Register_after_cb_skip<T> {
	serial: Register_after_cb_serial_skip<T>;
	failing: Register_after_cb_failing_skip<T>;
	always: Register_after_always_cb_skip<T>;
}
interface Register_after_cb_todo<T> {
	serial: Register_after_cb_serial_todo<T>;
	failing: Register_after_cb_failing_todo<T>;
	always: Register_after_always_cb_todo<T>;
}
interface Register_after_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_after_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_after_cb_failing_skip<T>;
	todo: (name: string) => void;
	always: Register_after_always_cb_failing<T>;
}
interface Register_after_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T> & Register_after_cb_failing_serial_skip<T>;
	todo: (name: string) => void;
	always: Register_after_always_cb_failing_serial<T>;
}
interface Register_after_cb_failing_serial_skip<T> {
	always: Register_after_always_cb_failing_serial<T>['skip'];
}
interface Register_after_cb_failing_serial_todo<T> {
	always: Register_after_always_cb_failing_serial<T>['todo'];
}
interface Register_after_cb_failing_skip<T> {
	serial: Register_after_cb_failing_serial_skip<T>;
	always: Register_after_always_cb_failing_skip<T>;
}
interface Register_after_cb_failing_todo<T> {
	serial: Register_after_cb_failing_serial_todo<T>;
	always: Register_after_always_cb_failing_todo<T>;
}
interface Register_after_always<T> {
	serial: RegisterBase<T> & Register_after_always_serial<T>;
	skip: RegisterBase<T> & Register_after_always_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_after_always_failing<T>;
	cb: CallbackRegisterBase<T> & Register_after_always_cb<T>;
}
interface Register_after_always_serial<T> {
	skip: RegisterBase<T> & Register_after_always_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_after_always_failing_serial<T>;
	cb: Register_after_always_cb_serial<T>;
}
interface Register_after_always_serial_skip<T> {
	failing: Register_after_always_failing_serial_skip<T>;
	cb: Register_after_always_cb_serial_skip<T>;
}
interface Register_after_always_serial_todo<T> {
	failing: Register_after_always_failing_serial_todo<T>;
	cb: Register_after_always_cb_serial_todo<T>;
}
interface Register_after_always_skip<T> {
	serial: Register_after_always_serial_skip<T>;
	failing: Register_after_always_failing_skip<T>;
	cb: Register_after_always_cb_skip<T>;
}
interface Register_after_always_todo<T> {
	serial: Register_after_always_serial_todo<T>;
	failing: Register_after_always_failing_todo<T>;
	cb: Register_after_always_cb_todo<T>;
}
interface Register_after_always_failing<T> {
	serial: RegisterBase<T> & Register_after_always_failing_serial<T>;
	skip: RegisterBase<T> & Register_after_always_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_after_always_cb_failing<T>;
}
interface Register_after_always_failing_serial<T> {
	skip: RegisterBase<T> & Register_after_always_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_after_always_cb_failing_serial<T>;
}
interface Register_after_always_failing_serial_skip<T> {
	cb: Register_after_always_cb_failing_serial<T>['skip'];
}
interface Register_after_always_failing_serial_todo<T> {
	cb: Register_after_always_cb_failing_serial<T>['todo'];
}
interface Register_after_always_failing_skip<T> {
	serial: Register_after_always_failing_serial_skip<T>;
	cb: Register_after_always_cb_failing_skip<T>;
}
interface Register_after_always_failing_todo<T> {
	serial: Register_after_always_failing_serial_todo<T>;
	cb: Register_after_always_cb_failing_todo<T>;
}
interface Register_after_always_cb<T> {
	serial: CallbackRegisterBase<T> & Register_after_always_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_after_always_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_after_always_cb_failing<T>;
}
interface Register_after_always_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_after_always_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_after_always_cb_failing_serial<T>;
}
interface Register_after_always_cb_serial_skip<T> {
	failing: Register_after_always_cb_failing_serial<T>['skip'];
}
interface Register_after_always_cb_serial_todo<T> {
	failing: Register_after_always_cb_failing_serial<T>['todo'];
}
interface Register_after_always_cb_skip<T> {
	serial: Register_after_always_cb_serial_skip<T>;
	failing: Register_after_always_cb_failing_skip<T>;
}
interface Register_after_always_cb_todo<T> {
	serial: Register_after_always_cb_serial_todo<T>;
	failing: Register_after_always_cb_failing_todo<T>;
}
interface Register_after_always_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_after_always_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_after_always_cb_failing_skip<T>;
	todo: (name: string) => void;
}
interface Register_after_always_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T>;
	todo: (name: string) => void;
}
interface Register_after_always_cb_failing_skip<T> {
	serial: Register_after_always_cb_failing_serial<T>['skip'];
}
interface Register_after_always_cb_failing_todo<T> {
	serial: Register_after_always_cb_failing_serial<T>['todo'];
}
interface Register_skip<T> {
	serial: Register_serial_skip<T>;
	before: Register_before_skip<T>;
	after: Register_after_skip<T>;
	failing: Register_failing_skip<T>;
	beforeEach: Register_beforeEach_skip<T>;
	afterEach: Register_afterEach_skip<T>;
	cb: Register_cb_skip<T>;
	always: Register_always_skip<T>;
}
interface Register_todo<T> {
	serial: Register_serial_todo<T>;
	before: Register_before_todo<T>;
	after: Register_after_todo<T>;
	failing: Register_failing_todo<T>;
	beforeEach: Register_beforeEach_todo<T>;
	afterEach: Register_afterEach_todo<T>;
	cb: Register_cb_todo<T>;
	always: Register_always_todo<T>;
}
interface Register_failing<T> {
	serial: RegisterBase<T> & Register_failing_serial<T>;
	before: Register_before_failing<T>;
	after: Register_after_failing<T>;
	skip: RegisterBase<T> & Register_failing_skip<T>;
	todo: (name: string) => void;
	only: RegisterBase<T> & Register_failing_only<T>;
	beforeEach: Register_beforeEach_failing<T>;
	afterEach: Register_afterEach_failing<T>;
	cb: Register_cb_failing<T>;
	always: Register_always_failing<T>;
}
interface Register_failing_serial<T> {
	before: Register_before_failing_serial<T>;
	after: Register_after_failing_serial<T>;
	skip: RegisterBase<T> & Register_failing_serial_skip<T>;
	todo: (name: string) => void;
	only: Register_failing_only_serial<T>;
	beforeEach: Register_beforeEach_failing_serial<T>;
	afterEach: Register_afterEach_failing_serial<T>;
	cb: Register_cb_failing_serial<T>;
	always: Register_always_failing_serial<T>;
}
interface Register_failing_serial_skip<T> {
	before: Register_before_failing_serial_skip<T>;
	after: Register_after_failing_serial_skip<T>;
	beforeEach: Register_beforeEach_failing_serial_skip<T>;
	afterEach: Register_afterEach_failing_serial_skip<T>;
	cb: Register_cb_failing_serial_skip<T>;
	always: Register_always_failing_serial_skip<T>;
}
interface Register_failing_serial_todo<T> {
	before: Register_before_failing_serial_todo<T>;
	after: Register_after_failing_serial_todo<T>;
	beforeEach: Register_beforeEach_failing_serial_todo<T>;
	afterEach: Register_afterEach_failing_serial_todo<T>;
	cb: Register_cb_failing_serial_todo<T>;
	always: Register_always_failing_serial_todo<T>;
}
interface Register_failing_skip<T> {
	serial: Register_failing_serial_skip<T>;
	before: Register_before_failing_skip<T>;
	after: Register_after_failing_skip<T>;
	beforeEach: Register_beforeEach_failing_skip<T>;
	afterEach: Register_afterEach_failing_skip<T>;
	cb: Register_cb_failing_skip<T>;
	always: Register_always_failing_skip<T>;
}
interface Register_failing_todo<T> {
	serial: Register_failing_serial_todo<T>;
	before: Register_before_failing_todo<T>;
	after: Register_after_failing_todo<T>;
	beforeEach: Register_beforeEach_failing_todo<T>;
	afterEach: Register_afterEach_failing_todo<T>;
	cb: Register_cb_failing_todo<T>;
	always: Register_always_failing_todo<T>;
}
interface Register_failing_only<T> {
	serial: RegisterBase<T> & Register_failing_only_serial<T>;
	cb: Register_cb_failing_only<T>;
}
interface Register_failing_only_serial<T> {
	cb: Register_cb_failing_only<T>['serial'];
}
interface Register_only<T> {
	serial: RegisterBase<T> & Register_only_serial<T>;
	failing: Register_failing_only<T>;
	cb: Register_cb_only<T>;
}
interface Register_only_serial<T> {
	failing: Register_failing_only_serial<T>;
	cb: Register_cb_only_serial<T>;
}
interface Register_beforeEach<T> {
	serial: RegisterBase<T> & Register_beforeEach_serial<T>;
	skip: RegisterBase<T> & Register_beforeEach_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_beforeEach_failing<T>;
	cb: CallbackRegisterBase<T> & Register_beforeEach_cb<T>;
}
interface Register_beforeEach_serial<T> {
	skip: RegisterBase<T> & Register_beforeEach_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_beforeEach_failing_serial<T>;
	cb: Register_beforeEach_cb_serial<T>;
}
interface Register_beforeEach_serial_skip<T> {
	failing: Register_beforeEach_failing_serial_skip<T>;
	cb: Register_beforeEach_cb_serial_skip<T>;
}
interface Register_beforeEach_serial_todo<T> {
	failing: Register_beforeEach_failing_serial_todo<T>;
	cb: Register_beforeEach_cb_serial_todo<T>;
}
interface Register_beforeEach_skip<T> {
	serial: Register_beforeEach_serial_skip<T>;
	failing: Register_beforeEach_failing_skip<T>;
	cb: Register_beforeEach_cb_skip<T>;
}
interface Register_beforeEach_todo<T> {
	serial: Register_beforeEach_serial_todo<T>;
	failing: Register_beforeEach_failing_todo<T>;
	cb: Register_beforeEach_cb_todo<T>;
}
interface Register_beforeEach_failing<T> {
	serial: RegisterBase<T> & Register_beforeEach_failing_serial<T>;
	skip: RegisterBase<T> & Register_beforeEach_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_beforeEach_cb_failing<T>;
}
interface Register_beforeEach_failing_serial<T> {
	skip: RegisterBase<T> & Register_beforeEach_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_beforeEach_cb_failing_serial<T>;
}
interface Register_beforeEach_failing_serial_skip<T> {
	cb: Register_beforeEach_cb_failing_serial<T>['skip'];
}
interface Register_beforeEach_failing_serial_todo<T> {
	cb: Register_beforeEach_cb_failing_serial<T>['todo'];
}
interface Register_beforeEach_failing_skip<T> {
	serial: Register_beforeEach_failing_serial_skip<T>;
	cb: Register_beforeEach_cb_failing_skip<T>;
}
interface Register_beforeEach_failing_todo<T> {
	serial: Register_beforeEach_failing_serial_todo<T>;
	cb: Register_beforeEach_cb_failing_todo<T>;
}
interface Register_beforeEach_cb<T> {
	serial: CallbackRegisterBase<T> & Register_beforeEach_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_beforeEach_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_beforeEach_cb_failing<T>;
}
interface Register_beforeEach_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_beforeEach_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_beforeEach_cb_failing_serial<T>;
}
interface Register_beforeEach_cb_serial_skip<T> {
	failing: Register_beforeEach_cb_failing_serial<T>['skip'];
}
interface Register_beforeEach_cb_serial_todo<T> {
	failing: Register_beforeEach_cb_failing_serial<T>['todo'];
}
interface Register_beforeEach_cb_skip<T> {
	serial: Register_beforeEach_cb_serial_skip<T>;
	failing: Register_beforeEach_cb_failing_skip<T>;
}
interface Register_beforeEach_cb_todo<T> {
	serial: Register_beforeEach_cb_serial_todo<T>;
	failing: Register_beforeEach_cb_failing_todo<T>;
}
interface Register_beforeEach_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_beforeEach_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_beforeEach_cb_failing_skip<T>;
	todo: (name: string) => void;
}
interface Register_beforeEach_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T>;
	todo: (name: string) => void;
}
interface Register_beforeEach_cb_failing_skip<T> {
	serial: Register_beforeEach_cb_failing_serial<T>['skip'];
}
interface Register_beforeEach_cb_failing_todo<T> {
	serial: Register_beforeEach_cb_failing_serial<T>['todo'];
}
interface Register_afterEach<T> {
	serial: RegisterBase<T> & Register_afterEach_serial<T>;
	skip: RegisterBase<T> & Register_afterEach_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_afterEach_failing<T>;
	cb: CallbackRegisterBase<T> & Register_afterEach_cb<T>;
	always: RegisterBase<T> & Register_afterEach_always<T>;
}
interface Register_afterEach_serial<T> {
	skip: RegisterBase<T> & Register_afterEach_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_afterEach_failing_serial<T>;
	cb: Register_afterEach_cb_serial<T>;
	always: Register_afterEach_always_serial<T>;
}
interface Register_afterEach_serial_skip<T> {
	failing: Register_afterEach_failing_serial_skip<T>;
	cb: Register_afterEach_cb_serial_skip<T>;
	always: Register_afterEach_always_serial_skip<T>;
}
interface Register_afterEach_serial_todo<T> {
	failing: Register_afterEach_failing_serial_todo<T>;
	cb: Register_afterEach_cb_serial_todo<T>;
	always: Register_afterEach_always_serial_todo<T>;
}
interface Register_afterEach_skip<T> {
	serial: Register_afterEach_serial_skip<T>;
	failing: Register_afterEach_failing_skip<T>;
	cb: Register_afterEach_cb_skip<T>;
	always: Register_afterEach_always_skip<T>;
}
interface Register_afterEach_todo<T> {
	serial: Register_afterEach_serial_todo<T>;
	failing: Register_afterEach_failing_todo<T>;
	cb: Register_afterEach_cb_todo<T>;
	always: Register_afterEach_always_todo<T>;
}
interface Register_afterEach_failing<T> {
	serial: RegisterBase<T> & Register_afterEach_failing_serial<T>;
	skip: RegisterBase<T> & Register_afterEach_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_afterEach_cb_failing<T>;
	always: Register_afterEach_always_failing<T>;
}
interface Register_afterEach_failing_serial<T> {
	skip: RegisterBase<T> & Register_afterEach_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_afterEach_cb_failing_serial<T>;
	always: Register_afterEach_always_failing_serial<T>;
}
interface Register_afterEach_failing_serial_skip<T> {
	cb: Register_afterEach_cb_failing_serial_skip<T>;
	always: Register_afterEach_always_failing_serial_skip<T>;
}
interface Register_afterEach_failing_serial_todo<T> {
	cb: Register_afterEach_cb_failing_serial_todo<T>;
	always: Register_afterEach_always_failing_serial_todo<T>;
}
interface Register_afterEach_failing_skip<T> {
	serial: Register_afterEach_failing_serial_skip<T>;
	cb: Register_afterEach_cb_failing_skip<T>;
	always: Register_afterEach_always_failing_skip<T>;
}
interface Register_afterEach_failing_todo<T> {
	serial: Register_afterEach_failing_serial_todo<T>;
	cb: Register_afterEach_cb_failing_todo<T>;
	always: Register_afterEach_always_failing_todo<T>;
}
interface Register_afterEach_cb<T> {
	serial: CallbackRegisterBase<T> & Register_afterEach_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_afterEach_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_afterEach_cb_failing<T>;
	always: Register_afterEach_always_cb<T>;
}
interface Register_afterEach_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_afterEach_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_afterEach_cb_failing_serial<T>;
	always: Register_afterEach_always_cb_serial<T>;
}
interface Register_afterEach_cb_serial_skip<T> {
	failing: Register_afterEach_cb_failing_serial_skip<T>;
	always: Register_afterEach_always_cb_serial_skip<T>;
}
interface Register_afterEach_cb_serial_todo<T> {
	failing: Register_afterEach_cb_failing_serial_todo<T>;
	always: Register_afterEach_always_cb_serial_todo<T>;
}
interface Register_afterEach_cb_skip<T> {
	serial: Register_afterEach_cb_serial_skip<T>;
	failing: Register_afterEach_cb_failing_skip<T>;
	always: Register_afterEach_always_cb_skip<T>;
}
interface Register_afterEach_cb_todo<T> {
	serial: Register_afterEach_cb_serial_todo<T>;
	failing: Register_afterEach_cb_failing_todo<T>;
	always: Register_afterEach_always_cb_todo<T>;
}
interface Register_afterEach_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_afterEach_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_afterEach_cb_failing_skip<T>;
	todo: (name: string) => void;
	always: Register_afterEach_always_cb_failing<T>;
}
interface Register_afterEach_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T> & Register_afterEach_cb_failing_serial_skip<T>;
	todo: (name: string) => void;
	always: Register_afterEach_always_cb_failing_serial<T>;
}
interface Register_afterEach_cb_failing_serial_skip<T> {
	always: Register_afterEach_always_cb_failing_serial<T>['skip'];
}
interface Register_afterEach_cb_failing_serial_todo<T> {
	always: Register_afterEach_always_cb_failing_serial<T>['todo'];
}
interface Register_afterEach_cb_failing_skip<T> {
	serial: Register_afterEach_cb_failing_serial_skip<T>;
	always: Register_afterEach_always_cb_failing_skip<T>;
}
interface Register_afterEach_cb_failing_todo<T> {
	serial: Register_afterEach_cb_failing_serial_todo<T>;
	always: Register_afterEach_always_cb_failing_todo<T>;
}
interface Register_afterEach_always<T> {
	serial: RegisterBase<T> & Register_afterEach_always_serial<T>;
	skip: RegisterBase<T> & Register_afterEach_always_skip<T>;
	todo: (name: string) => void;
	failing: RegisterBase<T> & Register_afterEach_always_failing<T>;
	cb: CallbackRegisterBase<T> & Register_afterEach_always_cb<T>;
}
interface Register_afterEach_always_serial<T> {
	skip: RegisterBase<T> & Register_afterEach_always_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_afterEach_always_failing_serial<T>;
	cb: Register_afterEach_always_cb_serial<T>;
}
interface Register_afterEach_always_serial_skip<T> {
	failing: Register_afterEach_always_failing_serial_skip<T>;
	cb: Register_afterEach_always_cb_serial_skip<T>;
}
interface Register_afterEach_always_serial_todo<T> {
	failing: Register_afterEach_always_failing_serial_todo<T>;
	cb: Register_afterEach_always_cb_serial_todo<T>;
}
interface Register_afterEach_always_skip<T> {
	serial: Register_afterEach_always_serial_skip<T>;
	failing: Register_afterEach_always_failing_skip<T>;
	cb: Register_afterEach_always_cb_skip<T>;
}
interface Register_afterEach_always_todo<T> {
	serial: Register_afterEach_always_serial_todo<T>;
	failing: Register_afterEach_always_failing_todo<T>;
	cb: Register_afterEach_always_cb_todo<T>;
}
interface Register_afterEach_always_failing<T> {
	serial: RegisterBase<T> & Register_afterEach_always_failing_serial<T>;
	skip: RegisterBase<T> & Register_afterEach_always_failing_skip<T>;
	todo: (name: string) => void;
	cb: Register_afterEach_always_cb_failing<T>;
}
interface Register_afterEach_always_failing_serial<T> {
	skip: RegisterBase<T> & Register_afterEach_always_failing_serial_skip<T>;
	todo: (name: string) => void;
	cb: Register_afterEach_always_cb_failing_serial<T>;
}
interface Register_afterEach_always_failing_serial_skip<T> {
	cb: Register_afterEach_always_cb_failing_serial<T>['skip'];
}
interface Register_afterEach_always_failing_serial_todo<T> {
	cb: Register_afterEach_always_cb_failing_serial<T>['todo'];
}
interface Register_afterEach_always_failing_skip<T> {
	serial: Register_afterEach_always_failing_serial_skip<T>;
	cb: Register_afterEach_always_cb_failing_skip<T>;
}
interface Register_afterEach_always_failing_todo<T> {
	serial: Register_afterEach_always_failing_serial_todo<T>;
	cb: Register_afterEach_always_cb_failing_todo<T>;
}
interface Register_afterEach_always_cb<T> {
	serial: CallbackRegisterBase<T> & Register_afterEach_always_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_afterEach_always_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_afterEach_always_cb_failing<T>;
}
interface Register_afterEach_always_cb_serial<T> {
	skip: CallbackRegisterBase<T> & Register_afterEach_always_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_afterEach_always_cb_failing_serial<T>;
}
interface Register_afterEach_always_cb_serial_skip<T> {
	failing: Register_afterEach_always_cb_failing_serial<T>['skip'];
}
interface Register_afterEach_always_cb_serial_todo<T> {
	failing: Register_afterEach_always_cb_failing_serial<T>['todo'];
}
interface Register_afterEach_always_cb_skip<T> {
	serial: Register_afterEach_always_cb_serial_skip<T>;
	failing: Register_afterEach_always_cb_failing_skip<T>;
}
interface Register_afterEach_always_cb_todo<T> {
	serial: Register_afterEach_always_cb_serial_todo<T>;
	failing: Register_afterEach_always_cb_failing_todo<T>;
}
interface Register_afterEach_always_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_afterEach_always_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_afterEach_always_cb_failing_skip<T>;
	todo: (name: string) => void;
}
interface Register_afterEach_always_cb_failing_serial<T> {
	skip: CallbackRegisterBase<T>;
	todo: (name: string) => void;
}
interface Register_afterEach_always_cb_failing_skip<T> {
	serial: Register_afterEach_always_cb_failing_serial<T>['skip'];
}
interface Register_afterEach_always_cb_failing_todo<T> {
	serial: Register_afterEach_always_cb_failing_serial<T>['todo'];
}
interface Register_cb<T> {
	serial: CallbackRegisterBase<T> & Register_cb_serial<T>;
	before: Register_before_cb<T>;
	after: Register_after_cb<T>;
	skip: CallbackRegisterBase<T> & Register_cb_skip<T>;
	todo: (name: string) => void;
	failing: CallbackRegisterBase<T> & Register_cb_failing<T>;
	only: CallbackRegisterBase<T> & Register_cb_only<T>;
	beforeEach: Register_beforeEach_cb<T>;
	afterEach: Register_afterEach_cb<T>;
	always: Register_always_cb<T>;
}
interface Register_cb_serial<T> {
	before: Register_before_cb_serial<T>;
	after: Register_after_cb_serial<T>;
	skip: CallbackRegisterBase<T> & Register_cb_serial_skip<T>;
	todo: (name: string) => void;
	failing: Register_cb_failing_serial<T>;
	only: Register_cb_only_serial<T>;
	beforeEach: Register_beforeEach_cb_serial<T>;
	afterEach: Register_afterEach_cb_serial<T>;
	always: Register_always_cb_serial<T>;
}
interface Register_cb_serial_skip<T> {
	before: Register_before_cb_serial_skip<T>;
	after: Register_after_cb_serial_skip<T>;
	failing: Register_cb_failing_serial_skip<T>;
	beforeEach: Register_beforeEach_cb_serial_skip<T>;
	afterEach: Register_afterEach_cb_serial_skip<T>;
	always: Register_always_cb_serial_skip<T>;
}
interface Register_cb_serial_todo<T> {
	before: Register_before_cb_serial_todo<T>;
	after: Register_after_cb_serial_todo<T>;
	failing: Register_cb_failing_serial_todo<T>;
	beforeEach: Register_beforeEach_cb_serial_todo<T>;
	afterEach: Register_afterEach_cb_serial_todo<T>;
	always: Register_always_cb_serial_todo<T>;
}
interface Register_cb_skip<T> {
	serial: Register_cb_serial_skip<T>;
	before: Register_before_cb_skip<T>;
	after: Register_after_cb_skip<T>;
	failing: Register_cb_failing_skip<T>;
	beforeEach: Register_beforeEach_cb_skip<T>;
	afterEach: Register_afterEach_cb_skip<T>;
	always: Register_always_cb_skip<T>;
}
interface Register_cb_todo<T> {
	serial: Register_cb_serial_todo<T>;
	before: Register_before_cb_todo<T>;
	after: Register_after_cb_todo<T>;
	failing: Register_cb_failing_todo<T>;
	beforeEach: Register_beforeEach_cb_todo<T>;
	afterEach: Register_afterEach_cb_todo<T>;
	always: Register_always_cb_todo<T>;
}
interface Register_cb_failing<T> {
	serial: CallbackRegisterBase<T> & Register_cb_failing_serial<T>;
	before: Register_before_cb_failing<T>;
	after: Register_after_cb_failing<T>;
	skip: CallbackRegisterBase<T> & Register_cb_failing_skip<T>;
	todo: (name: string) => void;
	only: CallbackRegisterBase<T> & Register_cb_failing_only<T>;
	beforeEach: Register_beforeEach_cb_failing<T>;
	afterEach: Register_afterEach_cb_failing<T>;
	always: Register_always_cb_failing<T>;
}
interface Register_cb_failing_serial<T> {
	before: Register_before_cb_failing_serial<T>;
	after: Register_after_cb_failing_serial<T>;
	skip: CallbackRegisterBase<T> & Register_cb_failing_serial_skip<T>;
	todo: (name: string) => void;
	only: Register_cb_failing_only<T>['serial'];
	beforeEach: Register_beforeEach_cb_failing_serial<T>;
	afterEach: Register_afterEach_cb_failing_serial<T>;
	always: Register_always_cb_failing_serial<T>;
}
interface Register_cb_failing_serial_skip<T> {
	before: Register_before_cb_failing_serial<T>['skip'];
	after: Register_after_cb_failing_serial_skip<T>;
	beforeEach: Register_beforeEach_cb_failing_serial<T>['skip'];
	afterEach: Register_afterEach_cb_failing_serial_skip<T>;
	always: Register_always_cb_failing_serial_skip<T>;
}
interface Register_cb_failing_serial_todo<T> {
	before: Register_before_cb_failing_serial<T>['todo'];
	after: Register_after_cb_failing_serial_todo<T>;
	beforeEach: Register_beforeEach_cb_failing_serial<T>['todo'];
	afterEach: Register_afterEach_cb_failing_serial_todo<T>;
	always: Register_always_cb_failing_serial_todo<T>;
}
interface Register_cb_failing_skip<T> {
	serial: Register_cb_failing_serial_skip<T>;
	before: Register_before_cb_failing_skip<T>;
	after: Register_after_cb_failing_skip<T>;
	beforeEach: Register_beforeEach_cb_failing_skip<T>;
	afterEach: Register_afterEach_cb_failing_skip<T>;
	always: Register_always_cb_failing_skip<T>;
}
interface Register_cb_failing_todo<T> {
	serial: Register_cb_failing_serial_todo<T>;
	before: Register_before_cb_failing_todo<T>;
	after: Register_after_cb_failing_todo<T>;
	beforeEach: Register_beforeEach_cb_failing_todo<T>;
	afterEach: Register_afterEach_cb_failing_todo<T>;
	always: Register_always_cb_failing_todo<T>;
}
interface Register_cb_failing_only<T> {
	serial: CallbackRegisterBase<T>;
}
interface Register_cb_only<T> {
	serial: CallbackRegisterBase<T> & Register_cb_only_serial<T>;
	failing: Register_cb_failing_only<T>;
}
interface Register_cb_only_serial<T> {
	failing: Register_cb_failing_only<T>['serial'];
}
interface Register_always<T> {
	after: Register_after_always<T>;
	afterEach: Register_afterEach_always<T>;
}
interface Register_always_serial<T> {
	after: Register_after_always_serial<T>;
	failing: Register_always_failing_serial<T>;
	afterEach: Register_afterEach_always_serial<T>;
	cb: Register_always_cb_serial<T>;
}
interface Register_always_serial_skip<T> {
	after: Register_after_always_serial_skip<T>;
	failing: Register_always_failing_serial_skip<T>;
	afterEach: Register_afterEach_always_serial_skip<T>;
	cb: Register_always_cb_serial_skip<T>;
}
interface Register_always_serial_todo<T> {
	after: Register_after_always_serial_todo<T>;
	failing: Register_always_failing_serial_todo<T>;
	afterEach: Register_afterEach_always_serial_todo<T>;
	cb: Register_always_cb_serial_todo<T>;
}
interface Register_always_skip<T> {
	serial: Register_always_serial_skip<T>;
	after: Register_after_always_skip<T>;
	failing: Register_always_failing_skip<T>;
	afterEach: Register_afterEach_always_skip<T>;
	cb: Register_always_cb_skip<T>;
}
interface Register_always_todo<T> {
	serial: Register_always_serial_todo<T>;
	after: Register_after_always_todo<T>;
	failing: Register_always_failing_todo<T>;
	afterEach: Register_afterEach_always_todo<T>;
	cb: Register_always_cb_todo<T>;
}
interface Register_always_failing<T> {
	after: Register_after_always_failing<T>;
	afterEach: Register_afterEach_always_failing<T>;
	cb: Register_always_cb_failing<T>;
}
interface Register_always_failing_serial<T> {
	after: Register_after_always_failing_serial<T>;
	afterEach: Register_afterEach_always_failing_serial<T>;
	cb: Register_always_cb_failing_serial<T>;
}
interface Register_always_failing_serial_skip<T> {
	after: Register_after_always_failing_serial_skip<T>;
	afterEach: Register_afterEach_always_failing_serial_skip<T>;
	cb: Register_always_cb_failing_serial_skip<T>;
}
interface Register_always_failing_serial_todo<T> {
	after: Register_after_always_failing_serial_todo<T>;
	afterEach: Register_afterEach_always_failing_serial_todo<T>;
	cb: Register_always_cb_failing_serial_todo<T>;
}
interface Register_always_failing_skip<T> {
	serial: Register_always_failing_serial_skip<T>;
	after: Register_after_always_failing_skip<T>;
	afterEach: Register_afterEach_always_failing_skip<T>;
	cb: Register_always_cb_failing_skip<T>;
}
interface Register_always_failing_todo<T> {
	serial: Register_always_failing_serial_todo<T>;
	after: Register_after_always_failing_todo<T>;
	afterEach: Register_afterEach_always_failing_todo<T>;
	cb: Register_always_cb_failing_todo<T>;
}
interface Register_always_cb<T> {
	after: Register_after_always_cb<T>;
	afterEach: Register_afterEach_always_cb<T>;
}
interface Register_always_cb_serial<T> {
	after: Register_after_always_cb_serial<T>;
	failing: Register_always_cb_failing_serial<T>;
	afterEach: Register_afterEach_always_cb_serial<T>;
}
interface Register_always_cb_serial_skip<T> {
	after: Register_after_always_cb_serial_skip<T>;
	failing: Register_always_cb_failing_serial_skip<T>;
	afterEach: Register_afterEach_always_cb_serial_skip<T>;
}
interface Register_always_cb_serial_todo<T> {
	after: Register_after_always_cb_serial_todo<T>;
	failing: Register_always_cb_failing_serial_todo<T>;
	afterEach: Register_afterEach_always_cb_serial_todo<T>;
}
interface Register_always_cb_skip<T> {
	serial: Register_always_cb_serial_skip<T>;
	after: Register_after_always_cb_skip<T>;
	failing: Register_always_cb_failing_skip<T>;
	afterEach: Register_afterEach_always_cb_skip<T>;
}
interface Register_always_cb_todo<T> {
	serial: Register_always_cb_serial_todo<T>;
	after: Register_after_always_cb_todo<T>;
	failing: Register_always_cb_failing_todo<T>;
	afterEach: Register_afterEach_always_cb_todo<T>;
}
interface Register_always_cb_failing<T> {
	after: Register_after_always_cb_failing<T>;
	afterEach: Register_afterEach_always_cb_failing<T>;
}
interface Register_always_cb_failing_serial<T> {
	after: Register_after_always_cb_failing_serial<T>;
	afterEach: Register_afterEach_always_cb_failing_serial<T>;
}
interface Register_always_cb_failing_serial_skip<T> {
	after: Register_after_always_cb_failing_serial<T>['skip'];
	afterEach: Register_afterEach_always_cb_failing_serial<T>['skip'];
}
interface Register_always_cb_failing_serial_todo<T> {
	after: Register_after_always_cb_failing_serial<T>['todo'];
	afterEach: Register_afterEach_always_cb_failing_serial<T>['todo'];
}
interface Register_always_cb_failing_skip<T> {
	serial: Register_always_cb_failing_serial_skip<T>;
	after: Register_after_always_cb_failing_skip<T>;
	afterEach: Register_afterEach_always_cb_failing_skip<T>;
}
interface Register_always_cb_failing_todo<T> {
	serial: Register_always_cb_failing_serial_todo<T>;
	after: Register_after_always_cb_failing_todo<T>;
	afterEach: Register_afterEach_always_cb_failing_todo<T>;
}
