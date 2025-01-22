/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, within, } from '@testing-library/react'
import Anime from "../Anime"

const onepiecePath = "/src/assets/onepiece.jpg";
const myheroacademiaPath = "/src/assets/mha.jpg";
const narutoPath = "/src/assets/naruto.jpg";

render(<Anime/>)
const currentPage = window.location.href;
const animeLinks = await screen.findAllByRole('link', {hidden: false});

test('"Anime" text is in page', async () => {
    const animeTextElements = await screen.findAllByText("Anime");
    expect(animeTextElements).to.have.lengthOf.above(0);
    animeTextElements.forEach(element => {
      expect(element.textContent).to.equal("Anime");
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
    const animetotalLinks = await screen.findAllByRole('link', {hidden: false});
    expect(animetotalLinks).to.have.lengthOf(4);
})

test('First choice is "One Piece" and has corresponding picture', async () => {
    const onepieceText = within(animeLinks[0]).getByRole('heading', {level: 3});
    expect (onepieceText.textContent).to.be.equals('One Piece')
    const onepieceImgElement = within(animeLinks[0]).getByRole('img', { name: /picture 1/i });
    expect(onepieceImgElement.getAttribute('src')).toBe(onepiecePath);
})

test('First choice links to the correct anime page', async () => {
    expect((animeLinks[0] as HTMLAnchorElement).href).toBe(`${currentPage}animechosen/onepiece`)
})

test('Second choice is "My Hero Academia" and has corresponding picture', async () => {
    const myheroacademiaText = within(animeLinks[1]).getByRole('heading', {level: 3});
    expect (myheroacademiaText.textContent).to.be.equals('My Hero Academia')
    const myheroacademiaImgElement = within(animeLinks[1]).getByRole('img', { name: /picture 2/i });
    expect(myheroacademiaImgElement.getAttribute('src')).toBe(myheroacademiaPath);
})

test('Second choice links to the correct anime page', async () => {
    expect((animeLinks[1] as HTMLAnchorElement).href).toBe(`${currentPage}animechosen/myheroacademia`)
})

test('Third choice is "Naruto" and has corresponding picture', async () => {
    const narutoText = within(animeLinks[2]).getByRole('heading', {level: 3});
    expect (narutoText.textContent).to.be.equals('Naruto')
    const narutoImgElement = within(animeLinks[2]).getByRole('img', { name: /picture 3/i });
    expect(narutoImgElement.getAttribute('src')).toBe(narutoPath);
})

test('Third choice links to the correct anime page', async () => {
    expect((animeLinks[2] as HTMLAnchorElement).href).toBe(`${currentPage}animechosen/naruto`)
})
