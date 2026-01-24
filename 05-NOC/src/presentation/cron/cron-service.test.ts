import { CronService } from "./cron-service";

describe('cron-service.test.ts', () => {

  const mockTick = jest.fn()

  test('should create a job', (done) => {
    const job = CronService.createJob("* * * * * *", mockTick)

    const timesToBeCalled = 2
    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(timesToBeCalled)
      job.stop()
      done()
    }, timesToBeCalled * 1000);
  })
})
