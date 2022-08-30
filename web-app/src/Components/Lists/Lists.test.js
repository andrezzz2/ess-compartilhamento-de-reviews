import {render, screen} from '@testing-library/react';
const Lists = require('./');


test('adds 1 + 2 to equal 3', () => {

    render(<Lists/>);

    expect(1+2).toBe(3);
    
});

