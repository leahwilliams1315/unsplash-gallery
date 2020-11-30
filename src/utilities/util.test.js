import {
  MOCK_RESPONSE_LONG_DESCRIPTION,
  MOCK_RESPONSE_SIMPLE,
  MOCK_RESPONSE_WITH_SPONSORSHIP_DATA
} from '../../testingUtils/testingData';
import { convertSelectedImgObj } from './util';

test('The convertSelectedImgObj function creates a simple object', () => {
  const convertedImgObj = convertSelectedImgObj(MOCK_RESPONSE_SIMPLE);
  expect(convertedImgObj).toEqual({
    color: MOCK_RESPONSE_SIMPLE.color,
    createdAt: MOCK_RESPONSE_SIMPLE.created_at,
    description: MOCK_RESPONSE_SIMPLE.description,
    altDescription: MOCK_RESPONSE_SIMPLE.alt_description,
    downloadLink: `${MOCK_RESPONSE_SIMPLE.urls.raw}.jpg`,
    regularImgLink: MOCK_RESPONSE_SIMPLE.urls.regular,
    id: MOCK_RESPONSE_SIMPLE.id
  });
});

test('The convertSelectedImgObj function, if no sponsorship exists, gets the shorter of the descriptions', () => {
  const convertedImgObj = convertSelectedImgObj(MOCK_RESPONSE_LONG_DESCRIPTION);
  expect(convertedImgObj.description).toEqual(MOCK_RESPONSE_LONG_DESCRIPTION.alt_description);
});

test('convertSelectImgObj should pull information from Sponsorship Data if it exists', () => {
  const convertedImgObj = convertSelectedImgObj(MOCK_RESPONSE_WITH_SPONSORSHIP_DATA);
  expect(convertedImgObj.description).toEqual(MOCK_RESPONSE_WITH_SPONSORSHIP_DATA.sponsorship.tagline);
});

