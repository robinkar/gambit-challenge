const path = require('path');
const { readFileSync } = require('fs');

const definitions = require('../data/definitions');

const readData = () => {
  const fileData = readFileSync(path.join(__dirname, '../data/feed.txt'), 'utf-8');
  const lines = fileData.split(/\r?\n/);
  const timestamp = lines[0];
  const registerLines = lines.slice(1);
  const registers = Array(lines.length);

  registerLines.forEach((line) => {
    const [reg, value] = line.split(':');
    registers[parseInt(reg, 10)] = parseInt(value, 10);
  });
  return { timestamp, registers };
};

const parseData = (registerData) => {
  const result = [];
  let i = 0;

  definitions.forEach((def) => {
    const registers = Uint16Array.from(registerData.slice(def.register, def.register + def.len));
    const buf = Buffer.from(registers.buffer);
    switch (def.format) {
      case 'LONG': {
        const val = buf.readInt32LE();
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'REAL4': {
        const val = buf.readFloatLE();
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'INTEGER': {
        const val = buf.readInt16LE();
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'INTEGER_SPEC1': {
        // eslint-disable-next-line no-bitwise
        const val = (buf.readInt16LE() & 0xff00) >>> 8;
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'INTEGER_SPEC2': {
        // eslint-disable-next-line no-bitwise
        const val = buf.readInt16LE() & 0xff;
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'BCD': {
        const val = buf.readInt16LE();
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      case 'BIT': {
        const val = buf.readInt16LE();
        result.push({ name: def.name, value: val, id: i });
        break;
      }
      default:
        break;
    }
    i++;
  });
  return result;
};

const { timestamp, registers } = readData();

const parsed = parseData(registers);

const getAll = () => JSON.parse(JSON.stringify({ timestamp, data: parsed }));

module.exports = {
  getAll,
};
