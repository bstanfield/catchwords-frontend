const { scale } = require('../style/scale');

const body = scale({
  width: '90%',
  maxWidth: ['90%', '90%', '90%', '1020px'],
  margin: 'auto',
  minHeight: '80vh'
});

const wideBody = scale({
  width: ['85%', '85%', '70%', '100%'],
  maxWidth: '1035px',
  margin: 'auto',
  marginBottom: ['55px', 'inherit', 'inherit']
});

const contentContainer = scale({
  maxWidth: '900px',
  margin: 'auto',
  marginBottom: '30px'
});

const mediumContainer = scale({
  maxWidth: '800px',
  margin: 'auto'
});

const textContainer = scale({
  maxWidth: '700px',
  margin: 'auto'
});

const smallColumn = scale({
  width: '100%',
  maxWidth: ['100%', '500px', '300px', '350px'],
  margin: 'auto',
  marginTop: ['20px', '20px', 0, 0]
});

const largeColumn = scale({
  width: '100%',
  maxWidth: ['100%', '500px', '600px', '500px'],
  margin: 'auto',
  marginTop: ['20px', '20px', 0, 0]
});

const relative = scale({
  position: 'relative'
});

const inlineBlock = scale({
  display: 'inline-block',
  position: 'relative'
});

const messageCard = scale({
  width: ['100%', '90%', '90%', '80%'],
  marginTop: ['120px', '120px', '130px', '140px'],
  margin: 'auto',
  textAlign: 'center'
});

const centerForm = scale({
  margin: 'auto',
  marginTop: ['80px', '120px', '150px'],
  width: '100%',
  textAlign: 'center',
  maxWidth: '300px'
});

const overflowHidden = scale({
  overflow: 'hidden'
});

const hideOnSmall = scale({
  display: ['none', 'none', 'block']
});

const showOnSmall = scale({
  display: ['block', 'block', 'none']
});

const hideOnMedium = scale({
  display: ['none', 'none', 'none', 'block']
});

const showOnMedium = scale({
  display: ['block', 'block', 'block', 'none']
});

const modalStyle = scale({
  position: 'fixed',
  borderRadius: '5px',
  zIndex: 99999,
  margin: 'auto',
  top: '5%',
  bottom: '80px',
  left: '5%',
  right: '5%',
  overflowY: 'auto',
  overflowX: 'hidden',
  maxWidth: '750px',
  backgroundColor: 'white',
  padding: '20px'
});

const darkener = scale({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: '9999'
});

const headerImage = imageUrl =>
  scale({
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    borderRadius: '2px',
    border: '1px solid #666666',
    height: ['200px', '300px', '400px', '480px']
  });

module.exports = {
  body,
  smallColumn,
  largeColumn,
  wideBody,
  hideOnSmall,
  showOnSmall,
  hideOnMedium,
  showOnMedium,
  relative,
  contentContainer,
  textContainer,
  mediumContainer,
  inlineBlock,
  messageCard,
  centerForm,
  overflowHidden,
  modalStyle,
  darkener,
  headerImage
};
