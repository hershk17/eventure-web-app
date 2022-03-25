import { Review } from './review.module';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class poiDetail {
    constructor(
        public description: string = null,
        public rating: any = null,
        public priceRange: any = null,
        public photos: Array<any> = null,
        public reviews: Array<Review> = null
    ) {  }
}