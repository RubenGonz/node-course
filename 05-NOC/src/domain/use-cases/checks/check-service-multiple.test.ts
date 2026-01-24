import { LogEntity } from '../../entities/log.entity'
import { CheckServiceMultiple } from './check-service-multiple'

describe('check-service-multiple.test.ts', () => {

  const mockRepo1 = { saveLog: jest.fn(), getLogs: jest.fn() }
  const mockRepo2 = { saveLog: jest.fn(), getLogs: jest.fn() }

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2],
    successCallback,
    errorCallback
  )

  const mockFetch = (ok: boolean) => {
    global.fetch = jest.fn().mockResolvedValue({ ok } as Response)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call successCallback when fetch returns ok=true', async () => {
    mockFetch(true)

    const wasOk = await checkService.execute('http://google.com')

    expect(wasOk).toBe(true)

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
  })

  test('should call errorCallback when fetch returns ok=false', async () => {
    mockFetch(false)

    const wasOk = await checkService.execute('http://fake-url.com')

    expect(wasOk).toBe(false)

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    expect(errorCallback).toHaveBeenCalled()
    expect(successCallback).not.toHaveBeenCalled()
  })

  test('should call errorCallback when fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error'))

    const wasOk = await checkService.execute('http://error.com')

    expect(wasOk).toBe(false)

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    expect(errorCallback).toHaveBeenCalled()
    expect(successCallback).not.toHaveBeenCalled()
  })
})
