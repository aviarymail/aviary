export interface SendFnTransport {
  /**
   * Get all of the messages from the account. After all the templates
   * are downloaded each one is turned into types for the `send` function.
   */
  getMessages(): string | Promise<string>;

  /**
   * Get the actual template string.
   */
  getMessageContent(): string | Promise<string>;

  /**
   * Get the name of the template.
   */
  getMessageName(): string | Promise<string>;
}
