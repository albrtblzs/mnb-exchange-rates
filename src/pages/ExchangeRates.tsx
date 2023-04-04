import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { AnimatePresence, motion } from "framer-motion";
import * as convert from 'xml-js';
import { getExchangeRatesAPI } from "./mnb";
import { ExchangeRateERP } from "../interface/exchange-rate";

export interface Driver {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  country: string;
  team: string;
  imageUrl: string;
  place: number;
}

const PageBackground = styled.div`
background-repeat: no-repeat;
background-size: cover;
`
const CardsContainer = styled.div`
display: flex;
flex-direction: row;
padding-top: 20px;
padding-bottom: 20px;
`;

const Card = styled(motion.div)`
  height: auto;
  width: 50%;
  // box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F5F5F5;
  text-align: center
`;

const OverTakeButton = styled.button`
  width: auto;
  height: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Image = styled.img`
  width: auto;
  height: 30px;
  border-radius: 2rem;
`;

const Header = styled.h2`
  font-size: 1.2rem;
`;

const NoDriversContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

// const Content = styled.p``;

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateERP[]>([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const response = await getExchangeRatesAPI()
    setExchangeRates(response);
  };

  // const dispatch = useDispatch();

  // const {overTake} = bindActionCreators(actionCreators, dispatch);

  // const driversState = useSelector((state: State) => state.drivers);
  // console.log(driversState);

  // const buttonDisplay = (place: number, id: number) => {
  //   if(place > 0) {
  //     return (
  //       <OverTakeButton
  //       onClick={async () => overTake(id)}
  //     >
  //       <p style={{margin: 0}}>Overtake</p>
  //     </OverTakeButton>
  //     )
  //   } 
  // }

  return (
    <PageBackground>      
    <Container>
      {exchangeRates.length ? (
        <CardsContainer>
          <AnimatePresence>
            {
              exchangeRates.map((exchangeRate, index) => {
                return (
                  <Card
                  whileHover={{ scale: 1.2 }}
                  layout
                >
                  <Header>{exchangeRate.currency}</Header>
                  {/* <Header>
                    {String(exchangeRate.date)}
                  </Header> */}
                  <Header>{exchangeRate.exchangeRate}</Header>
                </Card>
                )
              })
            }
          {/* {drivers.map((driver, index) => {
            const marginLeft = index % 2 !== 0 ? 648 : 0;
            return (
              <Card style={{marginLeft: marginLeft}}
                whileHover={{ scale: 1.2 }}
                layout
                key={driver.id}
              >
                <Header>{driver.place}</Header>
                <Image src={`http://192.168.43.237:8080${driver.imageUrl}`} />
                <Header>
                  {driver.firstname} {driver.lastname}
                </Header>
                <Header>{driver.country}</Header>
                <Header>{driver.team}</Header>
                
              {buttonDisplay(index, driver.id)}
              </Card>
            );
          })} */}
          </AnimatePresence>
        </CardsContainer>
      ) : (
        <NoDriversContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
        </NoDriversContainer>
      )}
    </Container>
    </PageBackground>
  );
};

export default ExchangeRates;
