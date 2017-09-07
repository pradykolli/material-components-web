/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCFoundation from './foundation';
import MDCComponent from './component';

export {MDCFoundation, MDCComponent};

if (!document.documentElement.dataset &&
  (
    !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset') ||
    !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset').get
  )
) {
  var descriptor = {}

  descriptor.enumerable = true

  descriptor.get = function get () {
    var element = this
    var map = {}
    var attributes = this.attributes

    function toUpperCase (n0) {
      return n0.charAt(1).toUpperCase()
    }

    function getter () {
      return this.value
    }

    function setter (name, value) {
      if (typeof value !== 'undefined') {
        this.setAttribute(name, value)
      } else {
        this.removeAttribute(name)
      }
    }

    for (var i = 0; i < attributes.length; i += 1) {
      var attribute = attributes[i]

      // This test really should allow any XML Name without
      // colons (and non-uppercase for XHTML)

      if (attribute && attribute.name && (/^data-\w[\w-]*$/).test(attribute.name)) {
        var name = attribute.name
        var value = attribute.value

        // Change to CamelCase

        var propName = name.substr(5).replace(/-./g, toUpperCase)

        Object.defineProperty(map, propName, {
          enumerable: descriptor.enumerable,
          get: getter.bind({ value: value || '' }),
          set: setter.bind(element, name)
        })
      }
    }
    return map
  }

  Object.defineProperty(HTMLElement.prototype, 'dataset', descriptor)
}
