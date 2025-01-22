/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, } from '@testing-library/react'
import PickedAnime from "../PickedAnime"
import { BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <PickedAnime/>
    </BrowserRouter>
)
const currentPage = window.location.href;
const animeImage = await screen.findAllByRole('img', {hidden: false});

test('"You chose" text is in page', async () => {
    const animeTextElements = await screen.findAllByText("You chose");
    expect(animeTextElements).to.have.lengthOf.above(0);
    animeTextElements.forEach(element => {
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

test('Button 2 has text "Back to Anime!"', async () => {
    const homeButtonText = await screen.findAllByText("Back To Anime!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[1]).to.be.equals(homeButtonText[0]);
})

test('Button 2 links to "Anime"', async() => {
    const homeLink = await screen.findAllByRole('link', {hidden: false});
    expect((homeLink[0] as HTMLAnchorElement).href).toBe(`${currentPage}anime`)
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
    const animeLinks = await screen.findAllByRole('link', {hidden: false});
    expect(animeLinks).to.have.lengthOf(2);
})

test('A picture and text is displayed for the chosen anime', async () => {
    const animeSubtext = await screen.getAllByRole('heading', {level: 3})[0];
    expect (animeImage).to.exist
    expect (animeImage).to.have.lengthOf(1)
    expect (animeSubtext).to.exist
    expect (animeSubtext.classList.contains('subtitle')).to.be.true
})
