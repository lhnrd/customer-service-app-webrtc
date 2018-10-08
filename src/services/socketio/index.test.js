import http from 'http'
import ioclient from 'socket.io-client'

import socketio from './'

let server
let addr
let io

beforeAll(done => {
  server = http.createServer()
  addr = server.listen().address()
  io = socketio()({ server }).io
  done()
})

afterAll(done => {
  io.close()
  server.close()
  done()
})

describe('[service] socket.io', () => {
  test('connects client to the server', done => {
    const mock = jest.fn()
    io.on('connection', mock)
    const socketclient = ioclient.connect(`http://[${addr.address}]:${addr.port}`)

    socketclient
      .on('connect', () => {
        expect(mock).toHaveBeenCalled()
        socketclient.disconnect()
        done()
      })
  })

  describe('communicate', () => {
    let socketclient

    beforeEach(done => {
      socketclient = ioclient.connect(`http://[${addr.address}]:${addr.port}`)
      socketclient.on('connect', () => {
        done()
      })
    })

    afterEach((done) => {
      if (socketclient.connected) {
        socketclient.disconnect()
      }
      done()
    })

    test('sends ACK', done => {
      io.emit('handshake', 'ACK')

      socketclient.on('handshake', (message, answer) => {
        expect(message).toEqual('ACK')
        done()
      })
    })
  })
})
