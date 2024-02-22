import { useAccount, usePublicClient } from "wagmi"
import { getContract } from "viem";

import raffleAbi from "@/config/abi/raffle";

const useRounds = () => {
    const { chain } = useAccount();

    const publicClient = usePublicClient({
        chainId: chain?.id,
    });

    const raffleContract = getContract({
        address: chain?.contracts?.raffle?.address,
        abi: raffleAbi,
        client: {
            public: publicClient,
        }
    });

    const getRoundsEpoch = async() => {
        try {
            const quickplay = await raffleContract.read.quickplay_epoch();
            const whalex2 = await raffleContract.read.whalex2_epoch();
            const fomo = await raffleContract.read.currentEpoch();

            return {
                quickplay,
                whalex2,
                fomo
            }
        } catch (e) {
            console.log("buyQuickplayTicket error: ", e)
        }
    }

    return {
        getRoundsEpoch
    }
}

export default useRounds;
