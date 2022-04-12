const { start, stop } = require('../src/app');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
//TODO: process errors handling

start(3000);
