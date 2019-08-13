import * as React from "react";
import { $SegmentedBar, $StackLayout, $Label } from "react-nativescript";
import { StackLayout, FlexboxLayout, SegmentedBar } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "nativescript-cardview";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar/segmented-bar";

export default class Selection extends React.Component {

    private containerRef = React.createRef<StackLayout>(); 
    
    selections: SegmentedBarItem[] = [];

    constructor(props) {
        super(props);
        
        const mindreHämtning = new SegmentedBarItem();
        mindreHämtning.title = "Mindre hämtning";
        
        const halvBil = new SegmentedBarItem();
        halvBil.title = "Halv bil";

        const helBil = new SegmentedBarItem();
        helBil.title = "Hei bil";
        
        this.selections.push(mindreHämtning, halvBil, helBil);

    }

    componentDidMount() {
        
        const segmentedBar = new SegmentedBar();
        segmentedBar.items = this.selections;
        segmentedBar.selectedIndex = -1;

        this.containerRef.current.insertChild(segmentedBar, 0);
        
        
    }

    build(parent: FlexboxLayout) {
        const container = this.containerRef.current;
        const index = parent.getChildIndex(container);
        parent.removeChild(container);

        const cardView = new CardView();
        cardView.content = container;
        
        parent.insertChild(cardView, index);

    }

    render() {
        return (
            <$StackLayout ref={this.containerRef}>
                <$Label text={"info area"}/>
            </$StackLayout>
        )
    }
}