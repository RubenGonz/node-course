import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('check.service.test.ts', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckService(
    mockRepository as any,
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

    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )

    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
  })

  test('should call errorCallback when fetch returns ok=false', async () => {
    mockFetch(false)

    const wasOk = await checkService.execute('http://fake-url.com')

    expect(wasOk).toBe(false)

    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )

    expect(errorCallback).toHaveBeenCalled()
    expect(successCallback).not.toHaveBeenCalled()
  })

  test('should call errorCallback when fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(
      new Error('network error')
    )

    const wasOk = await checkService.execute('http://error.com')

    expect(wasOk).toBe(false)

    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )

    expect(errorCallback).toHaveBeenCalled()
    expect(successCallback).not.toHaveBeenCalled()
  })
})
