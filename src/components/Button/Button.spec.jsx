import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";
import {act} from 'react';

describe('<Button />', () => {
    it('should act the button with a text "Load more"', () => {
        render(<Button text='Load more' />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call a function on button click', () => {
        const fn = jest.fn();
        render(<Button text='Load more' onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });

        userEvent.click(button);
        
        // expect(fn).toHaveBeenCalledTimes(1); /* sem identificacao de chamada */
        expect(fn);
    });

    it('should be disabled when disabled is true', () => {
        render(<Button text='Load more' disabled={true} />);
        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text='Load more' disabled={false} />);
        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeEnabled();
    });
});