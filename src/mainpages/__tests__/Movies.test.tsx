/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, within, } from '@testing-library/react'
import Movies from "../Movies"

const titanicPath = "/src/assets/titanic.jpg";
const theshiningPath = "/src/assets/theshining.png";
const bladerunnerPath = "/src/assets/bladerunner.png";

render(<Movies/>)
const currentPage = window.location.href;
const movieLinks = await screen.findAllByRole('link', {hidden: false});

test('"Movies" text is in page', async () => {
    const moviesTextElements = await screen.findAllByText("Movies");
    expect(moviesTextElements).to.have.lengthOf.above(0);
    moviesTextElements.forEach(element => {
      expect(element.textContent).to.equal("Movies");
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
    const moviesLinks = await screen.findAllByRole('link', {hidden: false});
    expect(moviesLinks).to.have.lengthOf(4);
})

test('First choice is "Titanic" and has corresponding picture', async () => {
    const titanicText = within(movieLinks[0]).getByRole('heading', {level: 3});
    expect (titanicText.textContent).to.be.equals('Titanic')
    const titanicImgElement = within(movieLinks[0]).getByRole('img', { name: /picture 1/i });
    expect(titanicImgElement.getAttribute('src')).toBe(titanicPath);
})

test('First choice links to the correct movie page', async () => {
    expect((movieLinks[0] as HTMLAnchorElement).href).toBe(`${currentPage}moviechosen/titanic`)
})

test('Second choice is "The Shining" and has corresponding picture', async () => {
    const shiningText = within(movieLinks[1]).getByRole('heading', {level: 3});
    expect (shiningText.textContent).to.be.equals('The Shining')
    const shiningImgElement = within(movieLinks[1]).getByRole('img', { name: /picture 2/i });
    expect(shiningImgElement.getAttribute('src')).toBe(theshiningPath);
})

test('Second choice links to the correct movie page', async () => {
    expect((movieLinks[1] as HTMLAnchorElement).href).toBe(`${currentPage}moviechosen/theshining`)
})

test('Third choice is "Bladerunner" and has corresponding picture', async () => {
    const bladerunnerText = within(movieLinks[2]).getByRole('heading', {level: 3});
    expect (bladerunnerText.textContent).to.be.equals('Bladerunner')
    const bladerunnerImgElement = within(movieLinks[2]).getByRole('img', { name: /picture 3/i });
    expect(bladerunnerImgElement.getAttribute('src')).toBe(bladerunnerPath);
})

test('Third choice links to the correct movie page', async () => {
    expect((movieLinks[2] as HTMLAnchorElement).href).toBe(`${currentPage}moviechosen/bladerunner`)
})
