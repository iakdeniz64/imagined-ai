/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, within, } from '@testing-library/react'
import TvShows from "../TvShows"

const gotPath = "/src/assets/got.jpg";
const theofficePath = "/src/assets/theoffice.jpg";
const breakingbadPath = "/src/assets/breakingbad.png";

render(<TvShows/>)
const currentPage = window.location.href;
const tvshowLinks = await screen.findAllByRole('link', {hidden: false});

test('"Tv Shows" text is in page', async () => {
    const tvshowsTextElements = await screen.findAllByText("Tv Shows");
    expect(tvshowsTextElements).to.have.lengthOf.above(0);
    tvshowsTextElements.forEach(element => {
      expect(element.textContent).to.equal("Tv Shows");
    });
})

test('Choices text is in page', async () => {
    const choicesTextElements = await screen.findAllByText("Out of the 3 choices below, pick one!");
    expect(choicesTextElements).to.have.lengthOf.above(0);
    choicesTextElements.forEach(element => {
      expect(element.textContent).to.equal("Out of the 3 choices below, pick one!");
    });
})

test('Total of 1 button is in page', async () => {
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal).to.have.lengthOf(1);
})

test('Button has text "Back To Home!"', async () => {
    const homeButtonText = await screen.findAllByText("Back To Home!");
    const buttonTotal = await screen.findAllByRole('button', {hidden: false});
    expect(buttonTotal[0]).to.be.equals(homeButtonText[0]);
})

test('Button links to "Homepage"', async() => {
    const homeLink = await screen.findAllByRole('link', {hidden: false});
    expect((homeLink[3] as HTMLAnchorElement).href).toBe(currentPage)
})

test('There are 4 total links (Button before counts too)', async() => {
    const tvshowsLinks = await screen.findAllByRole('link', {hidden: false});
    expect(tvshowsLinks).to.have.lengthOf(4);
})

test('First choice is "Game of Thrones" and has corresponding picture', async () => {
    const gotText = within(tvshowLinks[0]).getByRole('heading', {level: 3});
    expect (gotText.textContent).to.be.equals('Game of Thrones')
    const gotImgElement = within(tvshowLinks[0]).getByRole('img', { name: /picture 1/i });
    expect(gotImgElement.getAttribute('src')).toBe(gotPath);
})

test('First choice links to the correct tv show page', async () => {
    expect((tvshowLinks[0] as HTMLAnchorElement).href).toBe(`${currentPage}tvshowchosen/gameofthrones`)
})

test('Second choice is "The Office" and has corresponding picture', async () => {
    const theofficeText = within(tvshowLinks[1]).getByRole('heading', {level: 3});
    expect (theofficeText.textContent).to.be.equals('The Office')
    const theofficeImgElement = within(tvshowLinks[1]).getByRole('img', { name: /picture 2/i });
    expect(theofficeImgElement.getAttribute('src')).toBe(theofficePath);
})

test('Second choice links to the correct tv show page', async () => {
    expect((tvshowLinks[1] as HTMLAnchorElement).href).toBe(`${currentPage}tvshowchosen/theoffice`)
})

test('Third choice is "Breaking Bad" and has corresponding picture', async () => {
    const breakingbadText = within(tvshowLinks[2]).getByRole('heading', {level: 3});
    expect (breakingbadText.textContent).to.be.equals('Breaking Bad')
    const breakingbadImgElement = within(tvshowLinks[2]).getByRole('img', { name: /picture 3/i });
    expect(breakingbadImgElement.getAttribute('src')).toBe(breakingbadPath);
})

test('Third choice links to the correct tv show page', async () => {
    expect((tvshowLinks[2] as HTMLAnchorElement).href).toBe(`${currentPage}tvshowchosen/breakingbad`)
})
