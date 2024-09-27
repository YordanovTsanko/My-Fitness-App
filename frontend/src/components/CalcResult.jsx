import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";

const CalcResult = ({ result, setResult }) => {
  useEffect(() => {
    console.log(result);
  }, [result]);

  const Wrapper = styled(Row)`
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);

    h3 {
      color: ${({ theme }) => theme.text_primary};
    }
  `;

  const ResultDiv = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);

    h2 {
      border-bottom: 2px solid #000;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      background: inherit;
      transition: all 0.4s ease;
      font-weight: 600;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);

      &:hover {
        background: ${({ theme }) => theme.text_primary};
      }
    }
  `;

  const ResultMapChild = styled.div`
    background: white;
    padding: 20px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
    border-radius:8px;
  `;

  return (
    <Wrapper className="mt-2 mb-2">
      <h3>Result:</h3>
      <p>
        The results show a number of daily calorie estimates that can be used as
        a guideline for how many calories to consume each day to maintain, lose,
        or gain weight at a chosen rate.
      </p>
      <ResultDiv>
        <ResultMapChild>
          {Object.keys(result).length > 0 && (
            <div>
              {Object.keys(result).map((key) => (
                <div key={key}>
                  <h4>{result[key].label}</h4>
                  <p>
                    <span className="fs-5 fw-bolder">{result[key].calories}</span> Calories/day (
                    {result[key].percentage})
                  </p>
                </div>
              ))}
            </div>
          )}
        </ResultMapChild>
        <button onClick={() => setResult({})}>Check New</button>
      </ResultDiv>
      <p>
        Please consult with a doctor when losing 1 kg or more per week since it
        requires that you consume less than the minimum recommendation of 1,500
        calories a day.
      </p>
    </Wrapper>
  );
};

export default CalcResult;
