import styled from 'styled-components'
import bgImage from '../assets/img/bg.png'
import pixel from '../assets/font/Pixel-LCD-7.woff'

export const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: url(${bgImage}) #000;
	background-size: cover;
	overflow: hidden;
	cursor: auto;
	@font-face {
		font-family: 'Pixel';
		src: url(${pixel}) format('woff');
	}
`

export const StyledTetris = styled.div`
  display: flex;
  aligh-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
  width: 100%;
  max-width: 200px
  display: block;
  padding: 0 20px;
  }

`
