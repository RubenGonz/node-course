import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("email.service.test.ts", () => {

  const mockSendMail = jest.fn();

  beforeEach(() => {
    jest.spyOn(nodemailer, "createTransport").mockReturnValue({
      sendMail: mockSendMail,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should send email", async () => {
    const emailService = new EmailService();

    const options: SendEmailOptions = {
      to: "ruben40404040@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test content</h1>",
    };

    const result = await emailService.sendEmail(options);

    expect(result).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: "ruben40404040@gmail.com",
      subject: "Test",
      html: "<h1>Test content</h1>",
      attachments: [],
    });
  });

  test("should send email with filesystem logs attached", async () => {
    const emailService = new EmailService();

    const result = await emailService.sendEmailWithFileSystemLogs(
      "ruben40404040@gmail.com"
    );

    expect(result).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: "ruben40404040@gmail.com",
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: [
        { fileName: "logs-all.log", path: "./logs/logs-all.log" },
        { fileName: "logs-high.log", path: "./logs/logs-high.log" },
        { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
      ],
    });
  });

  test("should return false if email sending fails", async () => {
    mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

    const emailService = new EmailService();

    const result = await emailService.sendEmail({
      to: "fail@test.com",
      subject: "Fail",
      htmlBody: "<p>Fail</p>",
    });

    expect(result).toBe(false);
  });
});
