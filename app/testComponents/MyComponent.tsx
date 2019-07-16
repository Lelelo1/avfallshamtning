import * as React from "react";
import { Page, Frame, Color } from "tns-core-modules/ui/frame/frame";
import { $Frame, $Page, $StackLayout, $Label } from "react-nativescript";


export default class MyComponent extends React.Component<{forwardedRef: React.RefObject<Frame>}> {
    private readonly pageRef = React.createRef<Page>();

    state = {
        time: 10
    }

    componentDidMount() {
        console.log("component did mount!");
        this.props.forwardedRef.current.navigate({
            create: () => {
                return this.pageRef.current;
            }
        })
    }
    
    render() {
        console.log("render " + this.state.time);
        const displayString = "yo im react " + this.state.time;
        return (
            <$Frame ref={this.props.forwardedRef}>
                <$Page ref={this.pageRef} backgroundColor={"blue"}>
                    <$StackLayout onTap={() => {
                        console.log("tap on stackLayout");
                        this.setState({ time: 20 });
                    }}
                    >
                        <$Label text={this.state.time}/>
                    </$StackLayout>
                </$Page>
            </$Frame>
        )
    }
}