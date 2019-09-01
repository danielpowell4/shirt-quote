export const garments = [
  {
    name: "Tri Blend",
    description:
      "Lorem ipsum dolor amet polaroid cray ethical, yr esse typewriter hoodie vinyl qui. DIY nulla salvia, gluten-free venmo franzen cloud bread beard bicycle rights humblebrag put a bird on it.",
    imageUrl:
      "https://mms-images-prod.imgix.net/mms/images/catalog/ab9f30d4a3d2ebd8cae5ee163c55e5e5/colors/169902/views/alt/front_large_extended.png?ixlib=rails-2.1.4&w=412&h=470&fit=fill&dpr=1&bg=ffffff&fm=pjpg&trim=auto&trimmd=0&q=39&auto=compress",
    basePrice: 4.0
  },
  {
    name: "100% Cotton",
    description:
      "Lorem ipsum dolor nulla aute YOLO readymade consectetur incididunt. Tempor viral williamsburg, quinoa you probably haven't heard of them messenger bag selvage enim twee hexagon woke knausgaard cardigan.",
    imageUrl:
      "https://mms-images-prod.imgix.net/mms/images/catalog/4d2bd9d40fe640846663390c8f518cb1/colors/297300/views/alt/front_large_extended.png?ixlib=rails-2.1.4&w=412&h=470&fit=fill&dpr=1&bg=ffffff&fm=pjpg&trim=auto&trimmd=0&q=39&auto=compress",
    basePrice: 3.55
  }
];

const breaksAsList = [12, 24, 48, 72, 144, 288, 576, 1000];

const priceBreaks = {
  12: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 2.61,
    color2PerSide: 3.77,
    color3PerSide: 4.36,
    color4PerSide: 4.93,
    color5PerSide: 6.09,
    color6PerSide: 7.25
  },
  24: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 1.68,
    color2PerSide: 2.55,
    color3PerSide: 3.42,
    color4PerSide: 4.25,
    color5PerSide: 5.12,
    color6PerSide: 5.95
  },
  48: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 1.35,
    color2PerSide: 1.91,
    color3PerSide: 2.46,
    color4PerSide: 3.04,
    color5PerSide: 3.59,
    color6PerSide: 4.15
  },
  72: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 1.05,
    color2PerSide: 1.49,
    color3PerSide: 1.95,
    color4PerSide: 2.38,
    color5PerSide: 2.82,
    color6PerSide: 3.26
  },
  144: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 0.79,
    color2PerSide: 1.12,
    color3PerSide: 1.45,
    color4PerSide: 1.78,
    color5PerSide: 2.12,
    color6PerSide: 2.44
  },
  288: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 0.61,
    color2PerSide: 0.78,
    color3PerSide: 1.11,
    color4PerSide: 1.33,
    color5PerSide: 1.56,
    color6PerSide: 1.77
  },
  576: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 0.49,
    color2PerSide: 0.61,
    color3PerSide: 0.94,
    color4PerSide: 1.11,
    color5PerSide: 1.27,
    color6PerSide: 1.44
  },
  1000: {
    color1: 15.0,
    color2: 30.0,
    color3: 45.0,
    color4: 60.0,
    color5: 75.0,
    color6: 90.0,
    color1PerSide: 0.47,
    color2PerSide: 0.59,
    color3PerSide: 0.72,
    color4PerSide: 0.83,
    color5PerSide: 0.94,
    color6PerSide: 1.05
  }
};

const getLowerBreak = num => {
  return Math.max(...breaksAsList.filter(opt => opt <= num));
};

const getUpperBreak = num => {
  return Math.min(...breaksAsList.filter(opt => opt >= num));
};

const buildPriceBreak = numShirts => {
  const lowerBreak = getLowerBreak(numShirts);
  const upperBreak = getUpperBreak(numShirts);
  const defaultBreak = priceBreaks[upperBreak];

  if (lowerBreak === upperBreak) {
    return defaultBreak;
  }

  let priceBreak = {};
  Object.keys(defaultBreak).forEach(attribute => {
    const lowerBreakPrice = priceBreaks[lowerBreak][attribute];
    const upperBreakPrice = priceBreaks[upperBreak][attribute];

    const slope =
      (upperBreakPrice - lowerBreakPrice) / (upperBreak - lowerBreak);

    priceBreak[attribute] = slope * (numShirts - lowerBreak) + lowerBreakPrice;
  });

  return priceBreak;
};

const getBaseColorPrice = (priceBreak, numColors) => {
  return priceBreak[`color${numColors}`];
};

const getPerSideColorPrice = (priceBreak, numColors) => {
  return priceBreak[`color${numColors}PerSide`];
};

const getGarmetPrice = nameString => {
  return garments.find(g => g.name === nameString).basePrice;
};

export const calculateQuote = (garmentName, numShirts, numColors, numSides) => {
  const activeBreak = buildPriceBreak(numShirts);
  const baseColorPrice = getBaseColorPrice(activeBreak, numColors);
  const perGarmetPrice = getGarmetPrice(garmentName);
  const perSideColorPrice = getPerSideColorPrice(activeBreak, numColors);

  return (
    baseColorPrice +
    perGarmetPrice * numShirts +
    perSideColorPrice * numSides * numShirts
  ).toFixed(2);
};
