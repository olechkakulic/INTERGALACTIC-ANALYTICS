import '@testing-library/jest-dom';
import React from 'react';

global.React = React;  // На всякий случай делаем React глобальным
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;