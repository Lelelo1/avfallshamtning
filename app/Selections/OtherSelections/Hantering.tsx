import * as React from "react";
import { $StackLayout, $FlexboxLayout, $Label, $Switch } from "react-nativescript";

export default class Hantering extends React.Component {
    

    render() {
        return (
            <$FlexboxLayout>
                <$Label text={"Hantering: "} />
                <$FlexboxLayout>
                    <$Label text={""}/>
                    <$Switch />
                </$FlexboxLayout>
            </$FlexboxLayout>
        )
    }
}