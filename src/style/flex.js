const { scale } = require('../style/scale');

const genericFlex = scale({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'flex-start'
});

const flexReverseOnSmall = scale({
  flexDirection: ['column-reverse', 'column-reverse', 'row', 'row']
});

const justifyContentStart = scale({
  justifyContent: 'flex-start'
});

const justifyContentEnd = scale({
  justifyContent: 'flex-end'
});

const justifyContentSpaceBetween = scale({
  justifyContent: 'space-between'
});

const justifyContentCenter = scale({
  justifyContent: 'center'
});

const flexUntilMobile = scale({
  display: ['block', 'flex']
});

const flexUntilSmall = scale({
  display: ['block', 'block', 'flex']
});

const flexOnMedium = scale({
  display: ['block', 'block', 'flex', 'block']
});

const flexCenter = scale({
  alignItems: 'center',
  textAlign: 'center'
});

const alignCenter = scale({
  alignItems: 'center'
});

const alignStretch = scale({
  alignItems: 'stretch'
});

const noWrapFlex = scale({
  display: 'flex',
  flexWrap: 'nowrap',
  width: 'fit-content',
  maxWidth: '100%',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const flexText = scale({
  display: 'flex',
  justifyContent: ['center', 'center', 'flex-start'],
  flexWrap: 'wrap',
  alignItems: 'baseline'
});

const flexGrid = scale({
  display: 'flex',
  justifyContent: ['center', 'center', 'flex-start'],
  flexWrap: 'wrap',
  margin: '-10px'
});

const twoColumnFlex = scale({
  display: ['block', 'block', 'flex'],
  flexBasis: '45%',
  flexWrap: ['wrap', 'nowrap'],
  justifyContent: 'space-between'
});

const twoColumnFlexItem = scale({
  position: 'relative',
  width: ['100%', '100%', '48%', '48%']
});

const flexGrow = scale({
  flexGrow: 1
});

const rowReverse = scale({
  display: ['block', 'block', 'flex', 'flex'],
  flexWrap: 'wrap',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start'
});

const alignItemsStart = scale({
  alignItems: 'flex-start'
});

const alignItemsBaseline = scale({
  alignItems: 'baseline'
});

const threeColumnGrid = scale({
  display: 'flex',
  flexBasis: '33%',
  flexWrap: 'wrap',
  margin: [0, '0 -10px']
});

const threeColumnGridItem = scale({
  position: 'relative',
  minWidth: '200px',
  width: ['100%', '100%', '45%', '30%'],
  margin: ['10px auto', '10px']
});

module.exports = {
  genericFlex,
  flexGrow,
  flexUntilMobile,
  flexUntilSmall,
  flexGrid,
  flexText,
  twoColumnFlex,
  twoColumnFlexItem,
  threeColumnGrid,
  threeColumnGridItem,
  justifyContentStart,
  justifyContentEnd,
  justifyContentSpaceBetween,
  justifyContentCenter,
  noWrapFlex,
  flexCenter,
  alignCenter,
  alignStretch,
  alignItemsStart,
  alignItemsBaseline,
  rowReverse,
  flexReverseOnSmall,
  flexOnMedium
};
