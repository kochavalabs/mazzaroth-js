/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'

import NodeClient from '../../src/client/node-client.js'

describe('node client test', () => {
  describe('construction', () => {
    it('should pass values', () => {
      const client = new NodeClient('http://localhost:8081', 'ff01')
      expect(client.host).to.equal('http://localhost:8081')
      expect(client.privateKey).to.deep.equal(Buffer.from([255, 1]))
    })
    it('clean up host with slash', () => {
      let client = new NodeClient('http://localhost:8081/', '00')
      expect(client.host).to.equal('http://localhost:8081')
      client = new NodeClient('http://localhost/', '00')
      expect(client.host).to.equal('http://localhost')
    })
    it('accept buffer for key', () => {
      const client = new NodeClient('http://localhost:8081/', Buffer.from([1, 3, 4]))
      expect(client.privateKey).to.deep.equal(Buffer.from([1, 3, 4]))
    })
  })
})
