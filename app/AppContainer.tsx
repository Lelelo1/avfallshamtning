
import * as React from "react";
import { $Frame, $Page, $StackLayout, $Button, $ScrollView, $ActionBar } from "react-nativescript";

// import * as Platform from "tns-core-modules/platform";
// export const rootRef: React.RefObject<Frame> = React.createRef<Frame>(); // ReactNativeScript.start needs a ref
// See the testComponents directory for many examples of components (and ref-forwarding).
//where p is props s is state


import Record from "./Form/Record";
import Title from "./Title/Title";
import { reaction, autorun, toJS } from "mobx";
import viewModel, { Region } from "./ViewModels/ViewModel";
import ServiceSelection from "./Selections/ServiceSelection/ServiceSelection";
import "./Extensions";
import * as email from "nativescript-email";
import { device } from "tns-core-modules/platform/platform";
import ManagementSelection from "./Selections/OtherSelections/ManagementSelection";
import HomeSelection from "./Selections/HomeSelection/HomeSelection";
import GarbageTypeSelection from "./Selections/OtherSelections/GarbageTypeSelection";
import TimeSelection from "./Selections/TimeSelection/TimeSelection";
import FormViewModel from "./ViewModels/FormViewModel";
import SelectionsViewModel from "./ViewModels/SelectionsViewModel";
import { postModel } from "./Models/Post";
import * as application from "tns-core-modules/application/application"
import { setString } from "tns-core-modules/application-settings";
import { observer } from "mobx-react";
import * as utils from "tns-core-modules/utils/utils";
import { Toasty, ToastDuration, ToastPosition } from 'nativescript-toasty';
import { config, Configuration } from "./app";
import { ActionBar } from "@nativescript/core/ui/action-bar/action-bar";
import { Page, Color } from "@nativescript/core/ui/page/page";
import { ScrollView } from "@nativescript/core/ui/scroll-view/scroll-view";
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";

// hide keyboard when tap outsode textfield
if (device.os == "iOS") {
    const manager = IQKeyboardManager.sharedManager()
    manager.shouldResignOnTouchOutside = true;
    manager.enableAutoToolbar = false;
    manager.shouldShowTextFieldPlaceholder = false;
}

class Mail {
    subject: string;
    mail: string;
    constructor(subject: string, mail: string) {
        this.subject = subject;
        this.mail = mail;
    }
}


const getMail = (): Mail => {
    if(config == Configuration.debug) {
        return new Mail("appbokning TEST", "leo.w.se@hotmail.com");
    } else if (config == Configuration.release) {
        return new Mail("Begäran om avfallshämtning", "jorgen.avfallshamtning@gmail.com");
    }
}

export const rootRef: React.RefObject<any> = React.createRef<any>();
@observer
class AppContainer extends React.Component {
    actionBarRef = React.createRef<ActionBar>();
    pageRef = React.createRef<Page>();

    scrollViewRef = React.createRef<ScrollView>();
    stackLayoutRef = React.createRef<StackLayout>();
    recordRef = React.createRef<Record>();
    serviceSelectionRef = React.createRef<ServiceSelection>();
    private titleRef = React.createRef<Title>();

    constructor(props) {
        super(props);
        console.log("initing viewmodel");
        viewModel.get();
    }

    componentDidMount() {
        console.log("didmount");
        rootRef.current.navigate({
            create: () => {
                return this.pageRef.current;
            }
        });

        /* on application exit store viewModels */
        application.on(application.suspendEvent, () => { // can no longer use application.suspendEvent
            console.log("suspendedEvent");
            setString("formViewModel", JSON.stringify(toJS(FormViewModel.get())));
        });
        autorun(() => {
            // scroll to top show toast 
            const trigger = SelectionsViewModel.get().showToast;
            if (trigger) {
                SelectionsViewModel.get().showToast = false;

                const formViewModel = FormViewModel.get();

                // might not need this after fixing so that form is conditionaly rendered. It should also solve problem with textfield onTextChanged not firing close -> open form
                if (!formViewModel.isHidden) {
                    console.log("was open");
                    setTimeout(() => {
                        formViewModel.isHidden = true;
                        setTimeout(() => {
                            this._scroll();
                            setTimeout(() => {
                                formViewModel.isHidden = false;
                            }, 0.0000000001);
                        }, 0.000000000001)

                    }, 0.000000000001)

                } else {
                    this._scroll();
                }
                const toast = new Toasty({ text: "Var god ange en tjänst" });
                toast.setToastDuration(ToastDuration.SHORT);
                toast.setToastPosition(ToastPosition.CENTER);
                toast.show();
            }
        });
        /* when tapping record button or tapped ok - scroll to  */
        reaction(() => FormViewModel.get().isHidden, () => {
            const isHidden = FormViewModel.get().isHidden;
            console.log("isHidden fired: " + isHidden);
            const scrollUp = this.scrollViewRef.current.scrollableHeight;
            let scrollDown = this.titleRef.current.container.current.getActualSize().height +
                this.serviceSelectionRef.current.containerRef.current.getActualSize().height;

            // due to overflow safe area remove appbar and status bar
            if (device.os == "iOS") {
                const statusBarHeight = UIApplication.sharedApplication.statusBarFrame.size.height;
                const actionBarHeight = this.actionBarRef.current.getActualSize().height;
                scrollDown -= statusBarHeight + actionBarHeight;
            }
            console.log("scrollTo: " + scrollDown);
            const animate = !isHidden;
            this.scrollViewRef.current.scrollToVerticalOffset(scrollDown, animate);
        })

    }
    _scroll = () => {

        const scrollUp = this.scrollViewRef.current.scrollableHeight;
        const scrollTo = this.titleRef.current.container.current.getActualSize().height;
        console.log("scroll: " + scrollUp + " and " + scrollTo);
        this.scrollViewRef.current.scrollToVerticalOffset(-scrollUp + scrollTo, true);
    }
    render() {
        return (
            <$Frame ref={rootRef}>

                <$Page
                    ref={this.pageRef}
                    backgroundColor={new Color('#f0f0f0')}

                >
                    <$ActionBar ref={this.actionBarRef} title="Avfallshämtning" className="action-bar" />
                    <$ScrollView
                        ref={this.scrollViewRef}
                        onLoaded={(ev) => {
                            const scrollView = ev.object as ScrollView;
                            if (device.os == "iOS") {
                                // scrollView.addMissingTouchEffectiOS(); // can't be set simulatiously with  enableScrollOverControls: https://stackoverflow.com/questions/57872731/unable-to-scroll-over-some-components-like-buttons-and-textfield-in-nativescript 
                                scrollView.enableScrollOverControlsiOS();
                            }
                        }}

                    >
                        <$StackLayout ref={this.stackLayoutRef} onTap={() => {
                            if (device.os === "Android") {
                                utils.ad.dismissSoftInput();
                            }
                        }}
                        >
                            <Title ref={this.titleRef} />
                            <ServiceSelection ref={this.serviceSelectionRef} />
                            <Record ref={this.recordRef}
                            />
                            <HomeSelection />
                            <ManagementSelection />
                            <GarbageTypeSelection />
                            <TimeSelection />
                            <$Button
                                text={"skicka begäran"}
                                onTap={(ev) => {

                                    if (!FormViewModel.get().formIsValid() || !SelectionsViewModel.get().selectionsIsValid()) {
                                        // show a toast "uppgifter saknas" or something like it

                                        if (!SelectionsViewModel.get().selectionsIsValid()) {
                                            SelectionsViewModel.get().shouldDisplayTextFieldsStatus = true;
                                            console.log("selectionsViewModel was not valid");
                                            if (SelectionsViewModel.get().serviceNotSelected()) {
                                                SelectionsViewModel.get().showToast = true;
                                                return;
                                            }

                                            // check anvisning and personnummer no filled.
                                        }
                                        if (!FormViewModel.get().formIsValid()) {
                                            // scroll to form button open form 
                                            FormViewModel.get().shouldDisplayTextFieldsStatus = true;
                                            console.log("form was not valid");
                                        }
                                        return;
                                    }

                                    const formModel = FormViewModel.get().formModel;
                                    const selectionsModel = SelectionsViewModel.get().selectionsModel;

                                    email.available().then((available) => {
                                        if (available) {
                                            console.log("email was available");
                                            email.compose(
                                                {
                                                    subject: getMail().subject,
                                                    body: postModel(formModel, selectionsModel),
                                                    to: [getMail().mail]

                                                }
                                            )

                                        } else {
                                            console.log("email was not available");
                                        }
                                    })

                                }}
                            />
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

{/*<ComponentExample />*/ }
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