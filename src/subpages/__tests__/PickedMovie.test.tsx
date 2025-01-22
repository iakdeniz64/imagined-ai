/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, } from '@testing-library/react'
import PickedMovie from "../PickedMovie"
import { BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <PickedMovie/>
    </BrowserRouter>
)
const currentPage = window.location.href;
const movieImage = await screen.findAllByRole('img', {hidden: false});

test('"You chose" text is in page', async () => {
    const moviesTextElements = await screen.findAllByText("You chose");
    expect(moviesTextElements).to.have.lengthOf.above(0);
    moviesTextElements.forEach(element => {
      expect(element.textContent).to.equal("You chose");
    });
})

test('Total of 3 buttons are in page', async () => {
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal).to.have.lengthOf(3);
})

test('Button 1 has text "Get a generated picture based on this title!"', async () => {
    const homeButtonText = await screen.findAllByText("Get a generated picture based on this title!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[0]).to.be.equals(homeButtonText[0]);
})

test('PLACEHOLDER for "Generating Image" button', async () => {

})

test('Button 2 has text "Back to Movies!"', async () => {
    const homeButtonText = await screen.findAllByText("Back To Movies!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[1]).to.be.equals(homeButtonText[0]);
})

test('Button 2 links to "Movies"', async() => {
    const homeLink = await screen.findAllByRole('link', {hidden: false});
    expect((homeLink[0] as HTMLAnchorElement).href).toBe(`${currentPage}movies`)
})

test('Button 3 has text "Back To Home!"', async () => {
    const homeButtonText = await screen.findAllByText("Back To Home!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[2]).to.be.equals(homeButtonText[0]);
})

test('Button 3 links to "Homepage"', async() => {
    const homeLink = await screen.findAllByRole('link', {hidden: false});
    expect((homeLink[1] as HTMLAnchorElement).href).toBe(currentPage)
})

test('There are 2 total links (Button for "generating an image" doesn\'t count)', async() => {
    const moviesLinks = await screen.findAllByRole('link', {hidden: false});
    expect(moviesLinks).to.have.lengthOf(2);
})

test('A picture and text is displayed for the chosen movie', async () => {
    const movieSubtext = await screen.getAllByRole('heading', {level: 3})[0];
    expect (movieImage).to.exist
    expect (movieImage).to.have.lengthOf(1)
    expect (movieSubtext).to.exist
    expect (movieSubtext.classList.contains('subtitle')).to.be.true
})
