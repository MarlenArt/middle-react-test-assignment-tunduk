import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
Object.assign(global, { TextEncoder, TextDecoder });
