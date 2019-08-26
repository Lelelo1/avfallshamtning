
import * as React from "react";
import { $FlexboxLayout, $Label, $TextView } from "react-nativescript";
import { Size } from "./size";
import { FlexboxLayout, StackLayout, TextView } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "nativescript-cardview";
import ViewModel,{ Region } from "../ViewModel";
import { observer } from "mobx-react";
import { PercentLength } from "tns-core-modules/ui/page/page";
import { observable } from "mobx";
import "../Extensions";
import { device } from "tns-core-modules/platform/platform";
@observer
export default class Description extends React.Component <{ size: Size }> {
    
    private containerRef = React.createRef<FlexboxLayout>();

    build(parent: StackLayout) {
        const container = this.containerRef.current;
        const index = parent.getChildIndex(container);
        parent.removeChild(container);
        const cardView = new CardView();
        cardView.width = PercentLength.parse('auto');
        cardView.height = PercentLength.parse('auto');
        cardView.content = container;
        parent.addChild(cardView);

    }

    render() {
        return (
            <$FlexboxLayout
                ref={this.containerRef}
                justifyContent={"center"}
                alignContent={"center"}    
            >
                <$TextView
                    margin={20}
                    text={this._displayDescription()}
                    textAlignment={"center"}
                    fontSize={14}
                    editable={false}
                    onLoaded={(ev) => {
                        const textView = ev.object as TextView;
                        textView.scrollEnabled(false);
                        if(device.os == "Android") {
                            const editText = textView.android as android.widget.EditText;
                            // removes line under text
                            editText.setBackground(null);
                        }
                    }}
                    />
            </$FlexboxLayout>
        );
    }
    _displayDescription() {
        const viewModel = ViewModel.get();
        if(viewModel.region == Region.västraGötaland) {
            const selection = viewModel.getSelection(this.props.size);
            return selection ? selection.description : null;
        } else if (viewModel.region == Region.blekinge) {
            const selection = viewModel.getSelection2(this.props.size);
            return selection ? selection.description : null;
        }
    }
}
