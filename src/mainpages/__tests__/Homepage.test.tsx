/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import {render, screen, } from '@testing-library/react'
import Homepage from "../Homepage"

render(<Homepage/>)
const currentPage = window.location.href;

test('"Imagined" text is in page', async () => {
  const imagineTextElements = await screen.findAllByText("Imagined");
  expect(imagineTextElements).to.have.lengthOf.above(0);
  imagineTextElements.forEach(element => {
    expect(element.textContent).to.equal("Imagined");
  });
});

test('Total of 3 buttons are in page', async () => {
  const buttonTotal = await screen.findAllByRole('button', {hidden: false});
  expect(buttonTotal).to.have.lengthOf(3);
})

test('First button is "Movies"', async () => {
  const moviesButtonText = await screen.findAllByText("Movies");
  const buttonTotal = await screen.findAllByRole('button', {hidden: false});
  expect(buttonTotal[0]).to.be.equals(moviesButtonText[0]);
})

test('First button links to "Movies" page', async() => {
  const moviesLink = await screen.findAllByRole('link', {hidden: false});
  expect((moviesLink[0] as HTMLAnchorElement).href).toBe(`${currentPage}movies`)
})

test('Second button is "TV Shows"', async () => {
  const tvshowsButtonText = await screen.findAllByText("TV Shows");
  const buttonTotal = await screen.findAllByRole('button', {hidden: false});
  expect(buttonTotal[1]).to.be.equals(tvshowsButtonText[0]);
})

test('Second button links to "TV Shows" page', async() => {
  const tvshowsLink = await screen.findAllByRole('link', {hidden: false});
  expect((tvshowsLink[1] as HTMLAnchorElement).href).toBe(`${currentPage}tvshows`)
})

test('Third button is "Anime"', async () => {
  const animeButtonText = await screen.findAllByText("Anime");
  const buttonTotal = await screen.findAllByRole('button', {hidden: false});
  expect(buttonTotal[2]).to.be.equals(animeButtonText[0]);
})

test('Third button links to "Anime page"', async() => {
  const animeLink = await screen.findAllByRole('link', {hidden: false});
  expect((animeLink[2] as HTMLAnchorElement).href).toBe(`${currentPage}anime`)
})
