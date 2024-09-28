import React from "react";
import CaloriesCalcComp from "../components/CaloriesCalcComp";
import styled from "styled-components";
import { Row } from "react-bootstrap";

const Container = styled.div`
  color: ${({ theme }) => theme.text_primary};
`;

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;

  h4:first-of-type {
    opacity: 0.9;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const TextSection = styled.div`
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
`;

const CaloriesCalc = () => {
  return (
    <Container>
      <Wrapper>
        <h4 className="mt-4 fs-6">
          The Calorie Calculator can be used to estimate the number of calories
          a person needs to consume each day. This calculator can also provide
          some simple guidelines for gaining or losing weight.
        </h4>
        <CaloriesCalcComp />
        <TextSection>
          <p>
            This Calorie Calculator is based on several equations, and the
            results of the calculator are based on an estimated average. The
            Harris-Benedict Equation was one of the earliest equations used to
            calculate basal metabolic rate (BMR), which is the amount of energy
            expended per day at rest. It was revised in 1984 to be more accurate
            and was used up until 1990, when the Mifflin-St Jeor Equation was
            introduced. The Mifflin-St Jeor Equation also calculates BMR, and
            has been shown to be more accurate than the revised Harris-Benedict
            Equation. The Katch-McArdle Formula is slightly different in that it
            calculates resting daily energy expenditure (RDEE), which takes lean
            body mass into account, something that neither the Mifflin-St Jeor
            nor the Harris-Benedict Equation do. Of these equations, the
            Mifflin-St Jeor Equation is considered the most accurate equation
            for calculating BMR with the exception that the Katch-McArdle
            Formula can be more accurate for people who are leaner and know
            their body fat percentage. The three equations used by the
            calculator are listed below:
          </p>
          <p className="fw-bold">Mifflin-St Jeor Equation:</p>
          <p>For men: BMR = 10W + 6.25H - 5A + 5</p>
          <p>For women: BMR = 10W + 6.25H - 5A - 161</p>
          <p className="fw-bold">Revised Harris-Benedict Equation:</p>
          <p>For men: BMR = 13.397W + 4.799H - 5.677A + 88.362 </p>
          <p>For women: BMR = 9.247W + 3.098H - 4.330A + 447.593</p>
          <p className="fw-bold">Katch-McArdle Formula:</p>
          <p>BMR = 370 + 21.6(1 - F)W</p>
          <p>
            <span className="fw-bold">Where:</span>
            <br /> W is body weight in kg.
            <br /> H is body height in cm. <br />A is age.
            <br /> F is body fat in percentage.
          </p>
        </TextSection>
      </Wrapper>
    </Container>
  );
};

export default CaloriesCalc;
