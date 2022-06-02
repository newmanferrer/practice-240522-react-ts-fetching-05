//* ///////////////////////////////////////////////////////////////////////////
//* SearchStyled
//* ///////////////////////////////////////////////////////////////////////////
//* ===========================================================================
//* 1.- Imports
//* ===========================================================================
import styled from 'styled-components';
import { COLORS } from '../../colors';
//* ===========================================================================

//* ===========================================================================
//* 2.- Models / Interfaces
//* ===========================================================================
//* ===========================================================================

//* ===========================================================================
//* 3.- Reusable Components
//* ===========================================================================
//* ---------------------------------------------------------------------------
//* 3.1.-
//* ---------------------------------------------------------------------------
//* ---------------------------------------------------------------------------
//* ===========================================================================

//* ===========================================================================
//* 4.- Used components
//* ===========================================================================
//* ---------------------------------------------------------------------------
//* 4.1.- FormStyled
//* ---------------------------------------------------------------------------
const FormStyled = styled.form`
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border: 2px solid ${COLORS.white};
  border-radius: 5px;
  background-color: ${COLORS.backgroundSecondary};
`;
//* ---------------------------------------------------------------------------

//* ---------------------------------------------------------------------------
//* 4.1.- FormStyled
//* ---------------------------------------------------------------------------
const InputStyled = styled.input`
  width: 50%;
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  color: ${COLORS.backgroundPrimary};
  outline: none;
  border: none;
  border-radius: 2px;
`;
//* ---------------------------------------------------------------------------
//* ===========================================================================

//* ===========================================================================
//* 5.- Exported components
//* ===========================================================================
export { FormStyled, InputStyled };
//* ===========================================================================
//* ///////////////////////////////////////////////////////////////////////////