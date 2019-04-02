/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'

import NodeClient from '../../src/client/node-client.js'

describe('node client test', () => {
  describe('construction', () => {
    it('should pass values', () => {
      const client = new NodeClient('http://localhost:8081', '00')
      expect(client.host).to.equal('http://localhost:8081')
      expect(client.privateKey).to.equal('00')
    })
  })
})
