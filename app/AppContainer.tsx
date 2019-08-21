import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $StackLayout, $Label, $TextField, $Switch, $Button, $FlexboxLayout, $Slider, $ScrollView, $ActionBar } from "react-nativescript";
import { hot } from 'react-nativescript-hot-loader/root';
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { Button } from "tns-core-modules/ui/button/button";
// import * as Platform from "tns-core-modules/platform";
// export const rootRef: React.RefObject<Frame> = React.createRef<Frame>(); // ReactNativeScript.start needs a ref
// See the testComponents directory for many examples of components (and ref-forwarding).
//where p is props s is state

import Selection from "./Selection/Selection";
import Record from "./Form/Record";
import { FlexboxLayout, ScrollView } from "react-nativescript/dist/client/ElementRegistry";
import Title from "./Title/Title";
import { reaction } from "mobx";

import viewModel, { Region } from "./ViewModel";

export const rootRef: React.RefObject<any> = React.createRef<any>();

class AppContainer extends React.Component { 
    pageRef = React.createRef<Page>();

    scrollViewRef = React.createRef<ScrollView>();
    stackLayoutRef = React.createRef<StackLayout>();
    recordRef = React.createRef<Record>();

    componentDidMount() {
        console.log("didmount");
        rootRef.current.navigate({
            create:() => {
                return this.pageRef.current;
            }
        });
        // Need to remove form, add it into cradview then add cardview
        // console.log("flexlayy: " + this.flexboxLayoutRef.current);
        // this.formRef.current.build(this.flexboxLayoutRef.current);
        
        reaction(() => viewModel.get().region, (reg, dis) => {
            const scrollView = this.scrollViewRef.current;
            if(reg == Region.västraGötaland) {
                console.log("reaction");

                /*
                setTimeout(() => {
                    const uiScrollView = scrollView.ios as UIScrollView;
                    // uiScrollView.setContentOffsetAnimated(CGPointMake(0, 100), true);
                }, 800);
                */
            } else {
                /*
                setTimeout(() => {
                    this.scrollViewRef.current.scrollToVerticalOffset(-200, false);
                }, 800);
                */
               // this.scrollViewRef.current.scrollToVerticalOffset(0, false);
            }
            //dis.
        })

        
    }

    render() {
        return (
            <$Frame ref={rootRef}>
                
                <$Page
                    ref={this.pageRef}
                    backgroundColor={new Color('#f0f0f0')}
                >
                    <$ActionBar title="Avfallshamtning" className="action-bar"/>
                    <$ScrollView ref={this.scrollViewRef}>
                        <$StackLayout ref={this.stackLayoutRef}>
                            <Title />
                            <Selection />
                            <Record ref={this.recordRef} />
                            <$FlexboxLayout height={400}  backgroundColor={new Color('orange')} flexDirection={'column'} />
                        </$StackLayout>
                    </$ScrollView>
                </$Page>
            </$Frame>
        )
    }
}
export default AppContainer;


// https://github.com/NativeScript/NativeScript/issues/6114 issue with FlexboxLayout (local) Image and ScrollView

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

// can on/addEventHantnsdler be done in the jsx/tsx instead of using ref?
// https://docs.nativescript.org/core-concepts/events

// test mobx! / how does reactivity work?