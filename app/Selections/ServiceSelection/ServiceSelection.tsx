import * as React from "react";
import { $SegmentedBar, $SegmentedBarItem ,$StackLayout, $Label,  } from "react-nativescript";
import { StackLayout, FlexboxLayout, SegmentedBar } from "react-nativescript/dist/client/ElementRegistry";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar/segmented-bar";
import Description from "./Description";
import { Size } from "../../Models/SelectionsModel"
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export default class ServiceSelection extends React.Component {

    private containerRef = React.createRef<StackLayout>(); 
    private carInfoRef = React.createRef<Description>();
    @observable
    selectedIndex = 0;
    componentDidMount() {
        this.carInfoRef.current.build(this.containerRef.current);
    }

    getSize(): Size {
        console.log("getSize");
        switch(this.selectedIndex) {
            case 0: { return Size.little; }
            case 1: { return Size.half; }
            case 2: { return Size.full; }
        }
    }

    render() {
        return (
            <$StackLayout ref={this.containerRef}>
                <$SegmentedBar
                    onSelectedIndexChanged={(i) => {
                        this.selectedIndex = i.newIndex;
                    }}
                >
                    <$SegmentedBarItem title={"Mindre hämtning"} />
                    <$SegmentedBarItem title={"Halv bil"} />
                    <$SegmentedBarItem title={"Hel bil"} />
                </$SegmentedBar>
                <Description ref={this.carInfoRef} size={this.getSize()}/>
            </$StackLayout>
        )
    }

}
