/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, } from '@testing-library/react'
import PickedTvShow from "../PickedTvShow"
import { BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <PickedTvShow/>
    </BrowserRouter>
)
const currentPage = window.location.href;
const tvshowImage = await screen.findAllByRole('img', {hidden: false});

test('"You chose" text is in page', async () => {
    const tvshowTextElements = await screen.findAllByText("You chose");
    expect(tvshowTextElements).to.have.lengthOf.above(0);
    tvshowTextElements.forEach(element => {
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

test('PLACEHOLDER for "Generating Image" button sending a request', async () => {

})

test('PLACEHOLDER for a new image being in the page', async () => {

})

test('Button 2 has text "Back to TV Shows!"', async () => {
    const homeButtonText = await screen.findAllByText("Back To TV Shows!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[1]).to.be.equals(homeButtonText[0]);
})

test('Button 2 links to "Tv Shows"', async() => {
    const homeLink = await screen.findAllByRole('link', {hidden: false});
    expect((homeLink[0] as HTMLAnchorElement).href).toBe(`${currentPage}tvshows`)
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
    const tvshowsLinks = await screen.findAllByRole('link', {hidden: false});
    expect(tvshowsLinks).to.have.lengthOf(2);
})

test('A picture and text is displayed for the chosen tv show', async () => {
    const tvshowSubtext = await screen.getAllByRole('heading', {level: 3})[0];
    expect (tvshowImage).to.exist
    expect (tvshowImage).to.have.lengthOf(1)
    expect (tvshowSubtext).to.exist
    expect (tvshowSubtext.classList.contains('subtitle')).to.be.true
})
