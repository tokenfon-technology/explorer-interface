import { Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import LinkInternal from 'ui/shared/links/LinkInternal';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import ArbitrumL2TxnBatchStatus from 'ui/shared/statusTag/ArbitrumL2TxnBatchStatus';

const rollupFeature = config.features.rollup;

type Props = { item: ArbitrumL2TxnBatchesItem; isLoading?: boolean };

const ArbitrumL2TxnBatchesListItem = ({ item, isLoading }: Props) => {
  const timeAgo = item.commitment_transaction.timestamp ? dayjs(item.commitment_transaction.timestamp).fromNow() : 'Undefined';

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'arbitrum') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container gridTemplateColumns="110px auto">

      <ListItemMobileGrid.Label isLoading={ isLoading }>Batch #</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BatchEntityL2
          isLoading={ isLoading }
          number={ item.number }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 status</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <ArbitrumL2TxnBatchStatus status={ item.commitment_transaction.status } isLoading={ isLoading }/>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 block</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BlockEntityL1
          number={ item.commitment_transaction.block_number }
          isLoading={ isLoading }
          fontSize="sm"
          lineHeight={ 5 }
        />
      </ListItemMobileGrid.Value>

      { item.block_count && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>L2 block txn count</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Skeleton isLoaded={ !isLoading } display="inline-block">{ item.block_count }</Skeleton>
          </ListItemMobileGrid.Value>
        </>
      ) }

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 transaction</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntityL1
          hash={ item.commitment_transaction.hash }
          isLoading={ isLoading }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Age</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ timeAgo }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Txn count</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <LinkInternal
          href={ route({ pathname: '/batches/[number]', query: { number: item.number.toString(), tab: 'txs' } }) }
          isLoading={ isLoading }
          fontWeight={ 600 }
        >
          <Skeleton isLoaded={ !isLoading } minW="40px">
            { item.transactions_count }
          </Skeleton>
        </LinkInternal>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default ArbitrumL2TxnBatchesListItem;
