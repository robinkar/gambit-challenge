const path = require('path');
const { readFileSync } = require('fs');

const definitions = require('../data/definitions');

const readData = () => {
  const fileData = readFileSync(path.join(__dirname, '../data/feed.txt'), 'utf-8');
  const lines = fileData.split(/\r?\n/);

  const registerLines = lines.slice(1);
  const registers = Array(lines.length);

  registerLines.forEach((line) => {
    const [reg, value] = line.split(':');
    registers[parseInt(reg, 10)] = parseInt(value, 10);
  });
  return registers;
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

const fileData = readData();
const parsed = parseData(fileData);

const getAll = () => JSON.parse(JSON.stringify(parsed));

module.exports = {
  getAll,
};
