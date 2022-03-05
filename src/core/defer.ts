/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Defer {
  promise: Promise<void>;
  resolve: (value: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}
class Defer {
  /**
   * Initialize deferred promise
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default Defer;
