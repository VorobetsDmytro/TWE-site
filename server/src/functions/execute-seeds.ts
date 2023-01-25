import { userSeed } from "../user/user.seed";
import { roleSeed } from "../role/role.seed";
import { activationLinkSeed } from "../activation-link/activation-link.seed";
import { globalRegionSeed } from "../global-region/global-region.seed";
import { newsCardSeed } from "../news-card/news-card.seed";
import { newsBlockSeed } from "../news-block/news-block.seed";
import { newsTextSeed } from "../news-text/news-text.seed";
import { newsBlockRateSeed } from "../news-block-rate/news-block-rate.seed";

const start = async () => {
    await globalRegionSeed();
    await roleSeed();
    await userSeed();
    await activationLinkSeed();
    await newsCardSeed();
    await newsBlockSeed();
    await newsTextSeed();
    await newsBlockRateSeed();
};

start();