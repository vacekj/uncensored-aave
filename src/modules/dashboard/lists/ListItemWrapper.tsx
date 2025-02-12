import { Tooltip, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { CustomMarket } from 'src/ui-config/marketsConfig';
import { AMPLWarning } from '../../../components/infoTooltips/AMPLWarning';
import { FrozenTooltip } from '../../../components/infoTooltips/FrozenTooltip';
import { ListColumn } from '../../../components/lists/ListColumn';
import { ListItem } from '../../../components/lists/ListItem';
import { Link, ROUTES } from '../../../components/primitives/Link';
import { TokenIcon } from '../../../components/primitives/TokenIcon';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { ETHBorrowWarning } from 'src/components/transactions/Warnings/ETHBorrowWarning';

interface ListItemWrapperProps {
  symbol: string;
  iconSymbol: string;
  name: string;
  detailsAddress: string;
  children: ReactNode;
  currentMarket: CustomMarket;
  frozen?: boolean;
  showSupplyCapTooltips?: boolean;
  showBorrowCapTooltips?: boolean;
  showDebtCeilingTooltips?: boolean;
  showETHBorrowWarning?: boolean;
}

export const ListItemWrapper = ({
  symbol,
  iconSymbol,
  children,
  name,
  detailsAddress,
  currentMarket,
  frozen,
  showSupplyCapTooltips = false,
  showBorrowCapTooltips = false,
  showDebtCeilingTooltips = false,
  showETHBorrowWarning = false,
  ...rest
}: ListItemWrapperProps) => {
  const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();

  return (
    <ListItem {...rest}>
      <ListColumn maxWidth={160} isRow>
        <Link
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
          noWrap
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <TokenIcon symbol={iconSymbol} fontSize="large" />
          <Tooltip title={`${name} (${symbol})`} arrow placement="top">
            <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {symbol}
            </Typography>
          </Tooltip>
        </Link>
        {showETHBorrowWarning ? (
          <ETHBorrowWarning />
        ) : (
          <>
            {frozen && <FrozenTooltip symbol={symbol} currentMarket={currentMarket} />}
            {!frozen && symbol === 'AMPL' && <AMPLWarning />}
            {showSupplyCapTooltips && supplyCap.displayMaxedTooltip({ supplyCap })}
            {showBorrowCapTooltips && borrowCap.displayMaxedTooltip({ borrowCap })}
            {showDebtCeilingTooltips && debtCeiling.displayMaxedTooltip({ debtCeiling })}
          </>
        )}
      </ListColumn>
      {children}
    </ListItem>
  );
};
