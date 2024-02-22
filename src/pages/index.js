import { Inter } from "next/font/google";
import { useAccount } from "wagmi";
import { Button, Box, Heading, Divider, Container } from '@chakra-ui/react'

import useBuyTickets from "@/hooks/useBuyTickets";
import useRounds from "@/hooks/useRounds";

import { useGetPokemonByNameQuery, useGetPakemonWithIntervalQuery } from "@/services/api/raffle";

import BuyFomoTicketsForm from "@/components/forms/buy-fomo-tickets";
import {useEffect} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address } = useAccount();
  const { buyQuickplayTicket, buyWhalex2Ticket } = useBuyTickets();
  const { getRoundsEpoch } = useRounds();

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  const { data: intervalData } = useGetPakemonWithIntervalQuery({
    pollingInterval: 5000
  });

  useEffect(() => {
    async function fetchData() {
      const rounds = await getRoundsEpoch();

      console.log("rounds: ", rounds)
    }

    fetchData();
  }, [])

  console.log("api intervalData: ", intervalData)

  return (
    <main
      className={`flex min-h-screen flex-col p-24 bg-white ${inter.className}`}
    >
      <w3m-button />

      { address ? (
          <Container mx={0}>
            <Box py={ 2 }>
              <Heading>Buy quickplay ticket</Heading>
              <Button colorScheme='blue' onClick={buyQuickplayTicket} mt={ 2 }>Buy</Button>
            </Box>
            <Divider />

            <Box py={ 2 }>
              <Heading>Buy whalex2 ticket</Heading>
              <Button colorScheme='blue' onClick={buyWhalex2Ticket} mt={ 2 }>Buy</Button>
            </Box>
            <Divider />

            <Box py={ 2 }>
              <Heading>Buy FOMO tickets</Heading>
              <BuyFomoTicketsForm />
            </Box>
            <Divider />
          </Container>
      ) : null}
    </main>
  );
}
