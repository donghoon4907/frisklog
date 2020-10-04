const BOX_BORDER = '1px solid #e6e6e6'
const BORDER_RADIUS = '4px'

const customMediaQuery = (maxWidth) =>
    `@media only screen and (max-width: ${maxWidth}px)`

const media = {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576)
}

export default {
    bgColor: '#FAFAFA',
    blackColor: '#262626',
    darkGrayColor: '#999',
    lightGrayColor: '#c7c7c7',
    successColor: '#3D8939',
    infoColor: '#358597',
    redColor: '#ED4956',
    blueColor: '#2E6BD8',
    darkBlueColor: '#003569',
    boxBorder: BOX_BORDER,
    borderRadius: BORDER_RADIUS,
    whiteBox: `
    border:${BOX_BORDER};
    border-radius:${BORDER_RADIUS};
    background: white;
  `,
    maxWidth: '730px',
    headerShadow: '0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1)',
    headerActiveColor: '#468999',
    media
}
