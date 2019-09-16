// use ios reflection
import { ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";

class MyScrollView extends ScrollView {
    constructor() {
        super();
        const ios = this.ios as UIScrollView;
        ios.touchesShouldCancelInContentView = (view) => {
            return false;
        }
    }
}
UIScrollView.prototype.touchesShouldCancelInContentView = function(view) {
    return false;
}