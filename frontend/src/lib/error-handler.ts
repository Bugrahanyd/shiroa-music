export class ErrorHandler {
  static handle(error: unknown, context?: string): string {
    console.error(`[${context || 'Error'}]:`, error);

    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return 'Network error. Please check your connection.';
      }
      if (error.message.includes('401')) {
        return 'Session expired. Please login again.';
      }
      if (error.message.includes('403')) {
        return 'Access denied.';
      }
      if (error.message.includes('404')) {
        return 'Resource not found.';
      }
      if (error.message.includes('500')) {
        return 'Server error. Please try again later.';
      }
      return error.message;
    }

    return 'An unexpected error occurred.';
  }

  static async withRetry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.withRetry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  static isNetworkError(error: unknown): boolean {
    return error instanceof Error && 
      (error.message.includes('fetch') || 
       error.message.includes('network') ||
       error.message.includes('ECONNREFUSED'));
  }

  static isAuthError(error: unknown): boolean {
    return error instanceof Error && 
      (error.message.includes('401') || 
       error.message.includes('unauthorized') ||
       error.message.includes('token'));
  }
}
