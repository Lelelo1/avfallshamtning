
import * as React from "react";
import { $SegmentedBar, $SegmentedBarItem ,$StackLayout } from "react-nativescript";
import Description from "./Description";
import { Size } from "../../Models/SelectionsModel"
import { observable } from "mobx";
import { observer } from "mobx-react";
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";
import { Color } from "@nativescript/core/color/color";

@observer
export default class ServiceSelection extends React.Component {

    containerRef = React.createRef<StackLayout>(); 
    private carInfoRef = React.createRef<Description>();
    @observable
    selectedIndex = 0;
    componentDidMount() {
        this.carInfoRef.current.build(this.containerRef.current);
    }

    getSize(): Size {
        let size = Size.unselected;
        /*
        switch(this.selectedIndex) {
            case 0: { size = Size.little; }
            case 1: { size = Size.half; }
            case 2: { size = Size.full; }
        }
        */
        if(this.selectedIndex === 0) {
            size = Size.little;
        } else if (this.selectedIndex === 1) {
            size = Size.half;
        } else if (this.selectedIndex === 2) {
            size = Size.full;
        }
        console.log("selectedIndex: " + this.selectedIndex);
        console.log("getSize: " + size);
        return size;
    }

    render() {
        return (
            <$StackLayout
                ref={this.containerRef}
                backgroundColor={new Color("#e8e8e8")}
                >
                <$SegmentedBar
                    onSelectedIndexChanged={(i) => {
                        this.selectedIndex = i.newIndex;
                    }}
                    margin={10}
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
