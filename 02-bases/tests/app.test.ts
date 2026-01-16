describe("Test in the App File", () => {
  test("should true", () => {

    // Arrange
    const nunm1 = 10;
    const num2 = 20;

    // Act
    const result = nunm1 + num2;

    // Assert
    expect(result).toBe(30);
  });
});