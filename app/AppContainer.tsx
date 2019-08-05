import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $StackLayout, $Label, $TextField, $Switch, $Button, $FlexboxLayout, $Slider, $ScrollView, $ActionBar } from "react-nativescript";
import { hot } from 'react-nativescript-hot-loader/root';
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { Button } from "tns-core-modules/ui/button/button";
import ComponentExample from "./ComponentExample";
// import * as Platform from "tns-core-modules/platform";
// export const rootRef: React.RefObject<Frame> = React.createRef<Frame>(); // ReactNativeScript.start needs a ref
// See the testComponents directory for many examples of components (and ref-forwarding).
//where p is props s is state

// when added -> save -> wait -> restart app it crash with: file:///app/vendor.js:37591:79: JS ERROR Error: Failed to create Page with entry.create() function.
import InputArea from "./InputArea";
import { FlexboxLayout } from "react-nativescript/dist/client/ElementRegistry";

export const rootRef: React.RefObject<any> = React.createRef<any>();

class AppContainer extends React.Component { 
    pageRef = React.createRef<Page>();
    componentDidMount() {
        console.log("didmount");
        rootRef.current.navigate({
            create:() => {
                return this.pageRef.current;
            }
        });
    }
    render() {
        return (
            <$Frame ref={rootRef}>
                
                <$Page
                    ref={this.pageRef}
                >
                    <$ActionBar title="Avfallshamtning" className="action-bar"/>
                    <$ScrollView>
                    <$FlexboxLayout iosOverflowSafeArea={false} flexDirection={'column'}>
                        <InputArea />
                        <$FlexboxLayout height={200}  backgroundColor={new Color('orange')} flexDirection={'column'} />
                    </$FlexboxLayout>
                    </$ScrollView>
                </$Page>
            </$Frame>
        )
    }
}
export default AppContainer;

// export default hot(() => <AppContainer />); hotmodule not supported

// style={{ width: PercentLength.parse('100%'), height: PercentLength.parse('20%') , backgroundColor: new Color('green') }}
// style={{ width: PercentLength.parse('100%'), height: PercentLength.parse('20%') , backgroundColor: new Color('blue') }}
/* Frame and Page ios is initialized */
        /*
       const frame = rootRef.current as Frame;
       console.log("rootRef ios: " + frame.ios.controller);
       */
       // console.log("page current: " + this.pageRef.current.ios);
       
        // needed oterwise blank screen

{/*<ComponentExample />*/}
// probelm with $FlexboxLayout. can't contain $Label

/*
// https://github.com/shirakaba/react-nativescript/issues/31
In `ref={(r) => { // log }}` of the `$Button` - it prints `Button(1)` a first time and a second time `null`. The same happens with `$Page` and `$Frame` - and then crash.

It can also be noted that the crash (...`undefined is not an object (evaluating 'node.on')`) occurs prior to other errors
*/

// can't assign here ref={(ref) => { this.flatList = ref;
/*
<$StackLayout >
                        <$Label text="im label!"/>
                        <$TextField>

                        </$TextField>

                        <$Button ref={this.buttonRef}
                        />

                        <$Switch 
                        />
                    </$StackLayout>
                    */

// const app = () => <AppContainer />



// can arguments be passed to HotApp hot()

// can on/addEventHandler be done in the jsx/tsx instead of using ref?
// https://docs.nativescript.org/core-concepts/events

// test mobx! / how does reactivity work?