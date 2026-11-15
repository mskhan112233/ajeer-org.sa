import { db } from './firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export const DEFAULT_ASSETS = {
  ajeerLogo: '/dist/img/ajeer-logo.png',
  mlsdLogo: '/dist/img/mlsd-logo.png',
  takamolLogo: '/dist/img/takamol-logo.png',
  tamkeenLogo: '/dist/img/tamkeen-logo-1.svg',
  digitalStamp: '/dist/img/digital-govt-auth-logo.svg',
  xTwitterLogo: '/dist/img/x-twitter.svg'
};

const ASSETS_DOC_ID = 'main_assets';
const ASSETS_COLLECTION = 'app_assets';

/**
 * Fetch all icons and images directly from Firebase Firestore
 */
export async function getAssetsFromFirestore() {
  try {
    const docRef = doc(db, ASSETS_COLLECTION, ASSETS_DOC_ID);
    const snap = await getDoc(docRef);

    if (snap && snap.exists && snap.exists()) {
      const data = snap.data();
      return {
        ajeerLogo: data.ajeerLogo || DEFAULT_ASSETS.ajeerLogo,
        mlsdLogo: data.mlsdLogo || DEFAULT_ASSETS.mlsdLogo,
        takamolLogo: data.takamolLogo || DEFAULT_ASSETS.takamolLogo,
        tamkeenLogo: data.tamkeenLogo || DEFAULT_ASSETS.tamkeenLogo,
        digitalStamp: data.digitalStamp || DEFAULT_ASSETS.digitalStamp,
        xTwitterLogo: data.xTwitterLogo || DEFAULT_ASSETS.xTwitterLogo
      };
    }
  } catch (error) {
    console.warn('Firestore assets fetch warning:', error.message);
  }
  return DEFAULT_ASSETS;
}
