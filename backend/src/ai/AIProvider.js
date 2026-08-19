/**
 * Shape every AI provider adapter must implement (see providers/*.js).
 * Documented as a JSDoc typedef rather than a class since adapters are
 * plain objects — this keeps them trivially swappable and easy to mock in
 * tests.
 *
 * @typedef {Object} AIProviderAdapter
 * @property {string} name
 * @property {(args: { system: string, prompt: string }) => Promise<string>} complete
 */
export {}
