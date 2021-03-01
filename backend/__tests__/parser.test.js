const dataService = require('../services/dataService');

const findVariable = (data, name) => data.find((d) => d.name === name);

describe('Parser', () => {
  const data = dataService.getAll();
  test('should return data', () => {
    expect(data.data).toHaveLength(48);
    expect(findVariable(data.data, 'Velocity')).toBeDefined();
  });
  test('should parse LONG correctly', () => {
    // 9:23
    // 10:0
    // Lower byte first
    expect(findVariable(data.data, 'Positive accumulator').value).toBe(23);
  });
  test('should parse REAL4 correctly', () => {
    // 5: 19407 = 4BCF
    // 6: 15737 = 3D79
    // 0x3D794BCF => https://www.h-schmidt.net/FloatConverter/IEEE754.html
    expect(findVariable(data.data, 'Velocity').value).toBeCloseTo(0.0608633123338);
  });
  test('should parse Signal Quality correctly', () => {
    // 92: 829 = 0x033D
    // Lower byte 0x3D is Signal quality, should be 61
    expect(findVariable(data.data, 'Signal Quality').value).toBe(61);
  });
});
