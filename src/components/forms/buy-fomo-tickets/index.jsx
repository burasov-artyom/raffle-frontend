import {useState} from "react";
import {Button, Flex, Input} from '@chakra-ui/react'

import useBuyTickets from "@/hooks/useBuyTickets";

const BuyFomoTicketsForm = () => {
    const { buyFomoTickets } = useBuyTickets();

    const [fomoCount, setFomoCount] = useState(null);

    return (
        <Flex alignItems="center" justifyContent="center" gap={ 2 }>
            <Input
                value={fomoCount}
                onChange={(e) => setFomoCount(e.target.value)}
                placeholder='FOMO count'
            />
            <Button colorScheme='blue' onClick={() => buyFomoTickets(fomoCount)}>Buy</Button>
        </Flex>
    )
}

export default BuyFomoTicketsForm;
